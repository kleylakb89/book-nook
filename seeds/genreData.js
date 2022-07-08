// genre seed data
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
  {
    name: 'Non-Fiction',
  },
  {
    name: 'Literary Fiction',
  },
];

const seedGenre = () => Genre.bulkCreate(genreData);

module.exports = seedGenre;
