const app = require('./index');
const { sequelize } = require('./db');

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
    console.log(`Pokemons are ready at http://localhost:${PORT}`);
});