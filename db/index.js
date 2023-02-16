const {Pokemon} = require('./Pokemon');
const {User} = require('./User');
const {sequelize, Sequelize} = require('./db');

Pokemon.belongsTo(User); // Pokemon table, there will be an ownerId <- FK
User.hasMany(Pokemon);

module.exports = {
    Pokemon,
    User,
    sequelize,
    Sequelize
};
