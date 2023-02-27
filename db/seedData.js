const pokemons = [
  {
    name: "Bulbasaur",
    type: "Grass",
  },
  {
    name: "Ivysaur",
    type: "Grass",
  },
  {
    name: "Venosaur",
    type: "Grass",
  },
  {
    name: "Charmander",
    type: "Fire",
  },
  {
    name: "Charmeleon",
    type: "Fire",
  },
  {
    name: "Charizard",
    type: "Fire",
  },
  {
    name: "Squirtle",
    type: "Water",
  },
  {
    name: "Wartortle",
    type: "Water",
  },
  {
    name: "Blastoise",
    type: "Water",
  },
  {
    name: "Caterpie",
    type: "Bug",
  },
  {
    name: "Metapod",
    type: "Bug",
  },
  {
    name: "Butterfree",
    type: "Bug",
  },
  {
    name: "Weedle",
    type: "Bug",
  },
  {
    name: "Kakuna",
    type: "Bug",
  },
  {
    name: "Beedrill",
    type: "Bug",
  },
  {
    name: "Pidgey",
    type: "Normal",
  },
  {
    name: "Pidgeotto",
    type: "Normal",
  },
  {
    name: "Pidgeot",
    type: "Normal",
  },
  {
    name: "Rattata",
    type: "Normal",
  },
  {
    name: "Raticate",
    type: "Normal",
  },
  {
    name: "Spearow",
    type: "Normal",
  },
  {
    name: "Fearow",
    type: "Normal",
  },
  {
    name: "Ekans",
    type: "Poison",
  },
  {
    name: "Arbok",
    type: "Poison",
  },
  {
    name: "Pikachu",
    type: "Electric",
  },
  {
    name: "Raichu",
    type: "Electric",
  },
  {
    name: "Sandshrew",
    type: "Ground",
  },
  {
    name: "Sandslash",
    type: "Ground",
  },
  {
    name: "Nidoran",
    type: "Poison",
  },
  {
    name: "Nidorina",
    type: "Poison",
  },
  {
    name: "Nidoqueen",
    type: "Poison",
  },
  {
    name: "Nidoran",
    type: "Poison",
  },
  {
    name: "Nidorino",
    type: "Poison",
  },

  {
    name: "Nidoking",
    type: "Poison",
  },
  {
    name: "Clefairy",
    type: "Fairy",
  },
  {
    name: "Clefable",
    type: "Fairy",
  },
  {
    name: "Vulpix",
    type: "Fire",
  },
  {
    name: "Ninetales",
    type: "Fire",
  },
  {
    name: "Jigglypuff",
    type: "Normal",
  },
  {
    name: "Wigglytuff",
    type: "Normal",
  },
  {
    name: "Zubat",
    type: "Poison",
  },
  {
    name: "Golbat",
    type: "Poison",
  },
  {
    name: "Oddish",
    type: "Poison",
  },
  {
    name: "Gloom",
    type: "Poison",
  },
  {
    name: "Vileplume",
    type: "Poison",
  },
  {
    name: "Paras",
    type: "Bug",
  },
  {
    name: "Parasect",
    type: "Bug",
  },
  {
    name: "Venonat",
    type: "Bug",
  },
  {
    name: "Venomoth",
    type: "Bug",
  },
  {
    name: "Diglett",
    type: "Ground",
  },
  {
    name: "Dugtrio",
    type: "Ground",
  },
  {
    name: "Meowth",
    type: "Normal",
  },
  {
    name: "Persian",
    type: "Normal",
  },
  {
    name: "Psyduck",
    type: "Water",
  },
  {
    name: "Golduck",
    type: "Water",
  },
  {
    name: "Mankey",
    type: "Fighting",
  },
  {
    name: "Primeape",
    type: "Fighting",
  },
  {
    name: "Growlithe",
    type: "Fire",
  },
  {
    name: "Arcanine",
    type: "Fire",
  },
  {
    name: "Poliwag",
    type: "Water",
  },
  {
    name: "Poliwhirl",
    type: "Water",
  },
  {
    name: "Poliwrath",
    type: "Water",
  },
  {
    name: "Abra",
    type: "Psychic",
  },
  {
    name: "Kadabra",
    type: "Psychic",
  },
  {
    name: "Alakazam",
    type: "Psychic",
  },
  {
    name: "Machop",
    type: "Fighting",
  },
  {
    name: "Machoke",
    type: "Fighting",
  },
  {
    name: "Machamp",
    type: "Fighting",
  },
  {
    name: "Bellsprout",
    type: "Grass",
  },
  {
    name: "Weepinbell",
    type: "Grass",
  },
  {
    name: "Victreebel",
    type: "Grass",
  },
  {
    name: "Tentacool",
    type: "Water",
  },
  {
    name: "Tentacruel",
    type: "Water",
  },
  {
    name: "Geodude",
    type: "Rock",
  },
  {
    name: "Graveler",
    type: "Rock",
  },
  {
    name: "Golem",
    type: "Rock",
  },
  {
    name: "Ponyta",
    type: "Fire",
  },
  {
    name: "Rapidash",
    type: "Fire",
  },
  {
    name: "Slowpoke",
    type: "Ground",
  },

  {
    name: "Slowbro",
    type: "Ground",
  },
  {
    name: "Magnemite",
    type: "Electric",
  },
  {
    name: "Magneton",
    type: "Electric",
  },
  {
    name: "Farfetch'd",
    type: "Normal",
  },
  {
    name: "Doduo",
    type: "Normal",
  },
  {
    name: "Dodrio",
    type: "Normal",
  },
  {
    name: "Seel",
    type: "Water",
  },
  {
    name: "Dewgong",
    type: "Water",
  },
  {
    name: "Grimer",
    type: "Poison",
  },
  {
    name: "Muk",
    type: "Poison",
  },
  {
    name: "Shellder",
    type: "Water",
  },
  {
    name: "Cloyster",
    type: "Water",
  },
  {
    name: "Gastly",
    type: "Ghost",
  },
  {
    name: "Haunter",
    type: "Ghost",
  },
  {
    name: "Gengar",
    type: "Ghost",
  },
  {
    name: "Onix",
    type: "Rock",
  },
  {
    name: "Drowzee",
    type: "Psychic",
  },
  {
    name: "Hypno",
    type: "Psychic",
  },
  {
    name: "Krabby",
    type: "Water",
  },
  {
    name: "Kingler",
    type: "Water",
  },
  {
    name: "Voltorb",
    type: "Electric",
  },
  {
    name: "Electrode",
    type: "Electric",
  },
  {
    name: "Exeggcute",
    type: "Grass",
  },
  {
    name: "Exeggutor",
    type: "Grass",
  },
  {
    name: "Cubone",
    type: "Ground",
  },
  {
    name: "Marowak",
    type: "Ground",
  },
  {
    name: "Hitmonlee",
    type: "Fighting",
  },
  {
    name: "Hitmonchan",
    type: "Fighting",
  },
  {
    name: "Lickitung",
    type: "Normal",
  },
  {
    name: "Koffing",
    type: "Poison",
  },
  {
    name: "Weezing",
    type: "Poison",
  },
  {
    name: "Rhyhorn",
    type: "Ground",
  },
  {
    name: "Rhydon",
    type: "Ground",
  },
  {
    name: "Chansey",
    type: "Normal",
  },
  {
    name: "Tangela",
    type: "Grass",
  },
  {
    name: "Kangaskhan",
    type: "Normal",
  },
  {
    name: "Horsea",
    type: "Water",
  },
  {
    name: "Seadra",
    type: "Water",
  },
  {
    name: "Goldeen",
    type: "Water",
  },
  {
    name: "Seaking",
    type: "Water",
  },
  {
    name: "Staryu",
    type: "Water",
  },
  {
    name: "Starmie",
    type: "Water",
  },
  {
    name: "Mr. Mime",
    type: "Psychic",
  },
  {
    name: "Scyther",
    type: "Bug",
  },
  {
    name: "Jynx",
    type: "Ice",
  },
  {
    name: "Electabuzz",
    type: "Electric",
  },
  {
    name: "Magmar",
    type: "Fire",
  },
  {
    name: "Pinsir",
    type: "Bug",
  },
  {
    name: "Tauros",
    type: "Normal",
  },
  {
    name: "Magikarp",
    type: "Water",
  },
  {
    name: "Gyarados",
    type: "Water",
  },
  {
    name: "Lapras",
    type: "Water",
  },
  {
    name: "Ditto",
    type: "Normal",
  },
  {
    name: "Eevee",
    type: "Normal",
  },
  {
    name: "Vaporeon",
    type: "Water",
  },
  {
    name: "Jolteon",
    type: "Electric",
  },
  {
    name: "Flareon",
    type: "Fire",
  },
  {
    name: "Porygon",
    type: "Normal",
  },
  {
    name: "Omanyte",
    type: "Rock",
  },
  {
    name: "Omastar",
    type: "Rock",
  },
  {
    name: "Kabuto",
    type: "Rock",
  },
  {
    name: "Kabutops",
    type: "Rock",
  },
  {
    name: "Aerodactyl",
    type: "Rock",
  },
  {
    name: "Snorlax",
    type: "Normal",
  },
  {
    name: "Articuno",
    type: "Ice",
  },
  {
    name: "Zapdos",
    type: "Electric",
  },
  {
    name: "Moltres",
    type: "Fire",
  },
  {
    name: "Dratini",
    type: "Dragon",
  },
  {
    name: "Dragonair",
    type: "Dragon",
  },
  {
    name: "Dragonite",
    type: "Dragon",
  },
  {
    name: "Mewtwo",
    type: "Psychic",
  },
  {
    name: "Mew",
    type: "Psychic",
  },
];

const users = [
  {
    username: "brett",
    name: "Brett BePassed",
    password: "brettpass",
    email: "brett@example.com",
    isAdmin : false
  },
  {
    username: "antonette",
    name: "Antonette Marie",
    password: "headfirst",
    email: "keepyourheadonstraight@example.com",
    isAdmin : false
  },
  {
    username: "karianne",
    name: "Karianne Krum",
    password: "scarykary",
    email: "dontbefrightened@example.com",
    isAdmin : false
  },
  {
    username: "dantestAdmin",
    name: "Daniel Wen",
    password: "AdminTest",
    email: "admindan@example.com",
    isAdmin : true
  },
];

module.exports = {
  pokemons,
  users,
};
