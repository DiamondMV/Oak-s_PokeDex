const express = require('express');
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const PORT = 3000;


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

// error handling middleware
app.use((error, req, res, next) => {
    console.error("SERVER ERROR: ", error);
    if (res.statusCode < 400) res.status(500);
    res.send({ error: error.message, name: error.name, message: error.message });
  });
  
  app.listen(PORT, () => {
    console.log(`Pokemons are ready at http://localhost:${PORT}`);
  });