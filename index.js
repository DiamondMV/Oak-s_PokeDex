const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { auth } = require("express-openid-connect");

const { User, Pokemon } = require("./db");

// middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/pokemons", async (req, res, next) => {
  try {
    const pokemons = await Pokemon.findAll();
    res.send(pokemons);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

app.get("/pokemons/:id/user", async (req, res, next) => {
  try {
    const id = req.params.id;
    const pokemons = await Pokemon.findByPk(id, {
      include: [
        {
          model: User,
        },
      ],
    });
    res.send(pokemons);
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
      res.send({ name: newPokemon.name, type: newPokemon.type });
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
    const { name, type } = req.body;
    await updatePokemon.update({ name: name, type: type });
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
app.get("/", async (req, res, next) => {
  try {
    res.send(
      "<h1>Welcome to Oaks PokeDex!</h1><p>Log in via POST /login or register via POST /register</p>"
    );
  } catch (error) {
    console.error(error);
    next(error);
  }
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

// error handling middleware
app.use((error, req, res, next) => {
  console.error("SERVER ERROR: ", error);
  if (res.statusCode < 400) res.status(500);
  res.send({ error: error.message, name: error.name, message: error.message });
});

module.exports = app;
