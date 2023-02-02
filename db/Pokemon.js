const {Sequelize, sequelize} = require('./db');

const Pokemon = sequelize.define('pokemon', {
    name: Sequelize.STRING,
    type: Sequelize.STRING,
  });
  
  module.exports = { Pokemon };
  