const { Genre } = require('../models');

const genreData = [
  {
    name: 'Mystery',
  },
  {
    name: 'Romance',
  },
  {
    name: 'Horror',
  },
  {
    name: 'Fantasy',
  },
  {
    name: 'Sci-fi',
  },
];

const seedGenre = () => Genre.bulkCreate(genreData);

module.exports = seedGenre;
