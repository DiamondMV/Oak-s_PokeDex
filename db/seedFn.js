const {sequelize} = require('./db');
const {User} = require('./');
const {Pokemon} = require('./');
const {users, pokemons} = require('./seedData');

const seed = async () => {
  try {
    await sequelize.sync({ force: true }); // recreate db
    const createdUsers = await User.bulkCreate(users);
    const createdPokemons = await Pokemon.bulkCreate(pokemons);
    for(let i=0; i<createdPokemons.length; ++i){
        let pokemon = createdPokemons[i];
        const userId = createdUsers[i % 3].id;
        await pokemon.setUser(userId);
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = seed;
