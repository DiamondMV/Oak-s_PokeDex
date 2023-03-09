require('dotenv').config('.env');
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { auth } = require("express-openid-connect");

const { User, Pokemon } = require("./db");

const {
  AUTH0_SECRET,
  AUTH0_AUDIENCE,
  AUTH0_CLIENT_ID,
  AUTH0_BASE_URL,
  JWT_SECRET,
} = process.env;

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: AUTH0_SECRET,
  baseURL: AUTH0_AUDIENCE,
  clientID: AUTH0_CLIENT_ID,
  issuerBaseURL: AUTH0_BASE_URL
};

// middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

app.use(async (req, res, next) => {
  try {
    const auth = req.header('Authorization')
    if (!auth) {
      next();
    }
    else {
      const [, token] = auth.split(' ');
      const user = jwt.verify(token, JWT_SECRET);
      req.user = user;
      next();
    }
  }
  catch ({ message }) {
    res.sendStatus(401)
    next({ message })
  }
})

app.use(async (req, res, next) => {
  if (req.oidc.user) {
    const [user] = await User.findOrCreate({
      where: {
        username: req.oidc.user.nickname,
        name: req.oidc.user.name,
        email: req.oidc.user.email,
      }
    });
  }
  next();
});

app.get("/pokemons", async (req, res, next) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    const pokemons = await Pokemon.findAll({
      limit,
      offset: limit * (page - 1)
    });
    res.send(pokemons);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

app.get("/pokemons/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const pokemon = await Pokemon.findByPk(id, {
      include: [
        {
          model: User,
          attributes: { exclude: ["password", "isAdmin"] },
        },
      ],
    });
    res.send(pokemon);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

app.post("/pokemons", async (req, res, next) => {
  try {
    if (!req.user) {
      res.sendStatus(404);
    } else {
      const userId = req.user.id;
      const { name, type } = req.body;
      const newPokemon = await Pokemon.create({ name, type, userId });
      res.send({ name: newPokemon.name, type: newPokemon.type, userId});
    }
  } catch (error) {
    next(error);
  }
});

app.put("/pokemons/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatePokemon = await Pokemon.findByPk(id);
    if (!updatePokemon) {
      res.status(404).send(`Pokemon with id ${id} not found`);
      return;
    }
    const userId = req.user.id;
    const { name, type } = req.body;
    await updatePokemon.update({ name: name, type: type});
    res.send(updatePokemon);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

app.delete("/pokemons/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletePokemon = await Pokemon.findByPk(id);
    if (!deletePokemon) {
      res.status(404).send(`Pokemon with id ${id} not found`);
      return;
    }
    await Pokemon.destroy({ where: { id } });
    res.send(deletePokemon);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// bcrypt login
app.get('/', async (req, res, next) => {
  res.send(req.oidc.isAuthenticated() ? `
    <h2 style="text-align: center;">Welcome to Professor Oak's PokeDex!</h2>
    <h2>Welcome, ${req.oidc.user.name}</h2>
    <p><b>Username: ${req.oidc.user.email}</b></p>
    <p><b>Email: ${req.oidc.user.email}</b></p>
    <img src="${req.oidc.user.picture}" alt="${req.oidc.user.name}">
    <p><b>Go to /pokemons for a paginated list of pokemon</b></p>
    <p><b>Go to /pokemons/:id to see the pokemon and associated users</b></p>
    <p><b>Go to /me to see a profile of yourself</b></p>
    <p><b>Go to /users for a list of users</b></p>
    <p><b>Go to /users/:id to see the user and a list of associated pokemon</b></p>
    ` : 'Logged out');
});

app.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username: username,
      password: hashedPass,
    });
    const token = jwt.sign(newUser.username, newUser.password);
    res.send({ message: "success", token });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

app.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const foundUser = await User.findOne({ where: { username } });
    console.log("foundUser: ", foundUser);
    const isMatch = await bcrypt.compare(password, foundUser.password);
    console.log(isMatch);
    if (isMatch) {
      const token = jwt.sign(foundUser.username, foundUser.password);
      res.send({ message: "success", token });
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
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
      const token = jwt.sign(user, JWT_SECRET, {expiresIn : '1w'});

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

app.get("/users/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id, {
      include: [
        {
          model: Pokemon,
          where : { ownerid : id }
        },
      ],
      attributes: { exclude: ["password", "isAdmin"] },
    });
    res.send(user);
  } catch (error) {
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
