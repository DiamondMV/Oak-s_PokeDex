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
app.post("/pokemons", async (req, res, next) =>{
  try{
    const {name, type} = req.body;
    const newPokemon = await Pokemon.create({name, type});
    res.send(newPokemon);
  }
  catch(error){
    console.error(error);
    next(error);
  }
})

app.put("/pokemons/:id", async (req, res, next) =>{
  try{
    const {id} = req.body;
    const updatePokemon = await Pokemon.findByPk(id);
    if(!updatePokemon){
      res.status(404).send(`Pokemon with id ${id} not found`)
      return;
    }
    const {name, type} = req.body;
    await updatePokemon.update({name: name, type: type});
    res.send(updatePokemon);
  }
  catch(error){
    console.error(error);
    next(error);
  }
})

app.delete("/pokemons/:id", async (req, res, next) =>{
  try{
    const {id} = req.body;
    const deletePokemon = await Pokemon.findByPk(id);
    if(!updatePokemon){
      res.status(404).send(`Pokemon with id ${id} not found`)
      return;
    }
    await Pokemon.destroy({where: {id}});
    res.send(updatePokemon);
  }
  catch(error){
    console.error(error);
    next(error);
  }
})
// error handling middleware
app.use((error, req, res, next) => {
    console.error("SERVER ERROR: ", error);
    if (res.statusCode < 400) res.status(500);
    res.send({ error: error.message, name: error.name, message: error.message });
  });
  
  app.listen(PORT, () => {
    console.log(`Pokemons are ready at http://localhost:${PORT}`);
  });