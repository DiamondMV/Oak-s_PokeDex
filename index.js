require("dotenv").config(".env");
const express = require('express');
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { User, Pokemon } = require("./db");
const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');

const {
  AUTH0_SECRET,
  AUTH0_AUDIENCE,
  AUTH0_CLIENT_ID,
  AUTH0_BASE_URL,
} = process.env;

// middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const config = {
  authRequired: true,
  auth0Logout: true,
  secret: AUTH0_SECRET,
  baseURL: AUTH0_AUDIENCE,
  clientID: AUTH0_CLIENT_ID,
  issuerBaseURL: AUTH0_BASE_URL
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});
// app.use(async (req, res, next) => {
//   try {
//     const [user] = await User.findOrCreate({
//       where: {
//         username: `${req.oidc.user.nickname}`,
//         name: `${req.oidc.user.name}`,
//         email: `${req.oidc.user.email}`
//       }
//     });
//     console.log('user: ', req.oidc.user)
//     console.log('username: ', req.oidc.user.username)
//     console.log(user)
//     next();
//   }
//   catch (error) {
//     next(error);
//   }
// });

// authentication middleware
app.use(async (req, res, next) => {
  try {
    const auth = req.header('Authorization')
    if (!auth) {
      next();
    } else {
      const [, token] = auth.split(' ');
      const user = jwt.verify(token, JWT_SECRET);
      req.user = user;
      next();
    }
  } catch ({ message }) {
    res.sendStatus(401)
    next({ message })
  }
})


app.get('/', async (req, res, next) => {
  res.send(req.oidc.isAuthenticated() ? `
    <h2 style="text-align: center;">Welcome to Professor Oak's PokeDex!</h2>
    <h2>Welcome, ${req.oidc.user.name}</h2>
    <p><b>Username: ${req.oidc.user.email}</b></p>
    <p><b>Email: ${req.oidc.user.email}</p>
    <img src="${req.oidc.user.picture}" alt="${req.oidc.user.name}">
    ` : 'Logged out');
});

app.get("/me", async (req, res, next) => {
  try {
    // Find user with User.findOne
    const user = await User.findOne({
      where: {
        username: req.oidc.user.nickname
      },
      raw: true,
    });

    // If/else statement - Assign token with user. No user, no token
    if (user) {
      const token = jwt.sign(user, JWT_SECRET, { expiresIn: '1w' });

      // Send back the object {user, token}
      res.send({ user, token })

    } else {
      res.status(401).send("No user");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
})

app.post('/register', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username: username, password: hashedPass });
    const token = jwt.sign(newUser.username, newUser.password);
    res.send({ message: "success", token });
  }
  catch (error) {
    console.error(error);
    next(error);
  }
});

app.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const foundUser = await User.findOne({ where: { username } });
    console.log("foundUser: ", foundUser);
    const isMatch = await bcrypt.compare(password, foundUser.password);
    console.log(isMatch);
    if (isMatch) {
      const token = jwt.sign(foundUser.username, foundUser.password);
      res.send({ message: "success", token });
    }
    else {
      res.sendStatus(401);
    }
  }
  catch (error) {
    console.error(error);
    next(error);
  }
});

// user get
app.get("/users", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

app.get("/pokemons", async (req, res, next) => {
  try {
    const pokemons = await Pokemon.findAll();
    res.send(pokemons);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

app.get("/pokemons/:id", async (req, res, next) => {
  try {
    const pokemon = await Pokemon.findByPk(req.params.id);
    res.status(200).send({ name: pokemon.name, type: pokemon.type });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

app.post('/pokemons', async (req, res, next) => {
  try {
    if (!req.user) {
      res.sendStatus(401);
    }
    else {
      const ownerId = req.user.id;
      const { name, type } = req.body;
      const createPokemon = await Pokemon.create({ name, type, ownerId });
      res.status(201).send({ name: createPokemon.name, type: createPokemon.type });
    }

  } catch (error) {
    next(error)
  }
});

app.put("/pokemons/:id", async (req, res, next) => {
  try {
    const ownerId = req.user.id;
    const id = req.params.id;
    const updatePokemon = await Pokemon.findByPk(id);
    //check if we have pokemon to update and if it's associated with user
    if (!updatePokemon) {
      res.status(404).send(`Pokemon with id ${id} not found`)
      return;
    }
    const { name, type } = req.body;
    await updatePokemon.update({ name: name, type: type, ownerId });
    res.send({ name: updatePokemon.name, type: updatePokemon.type });
  }
  catch (error) {
    console.error(error);
    next(error);
  }
});

app.delete("/pokemons/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletePokemon = await Pokemon.findByPk(id);
    if (!deletePokemon) {
      res.status(404).send(`Pokemon with id ${id} not found`)
      return;
    }
    await Pokemon.destroy({ where: { id } });
    res.status(204).send({ name: deletePokemon.name, type: deletePokemon.type });
  }
  catch (error) {
    console.error(error);
    next(error);
  }
});

// error handling middleware
app.use((error, req, res, next) => {
  console.error("SERVER ERROR: ", error);
  if (res.statusCode < 400) res.status(500);
  res.send({ error: error.message, name: error.name, message: error.message });
});

module.exports = app;