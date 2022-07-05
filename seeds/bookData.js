const { Book } = require('../models');

const bookData = [
  // mystery | id: 1
  {
    title: 'Our Crooked Hearts',
    author: 'Melissa Albert',
    has_read: true,
    favorite: true,
    user_id: 1,
    genre_id: 1,
  },
  {
    title: 'Blackout',
    author: 'Erin Flanagan',
    has_read: false,
    favorite: false,
    user_id: 1,
    genre_id: 1,
  },
  // romance | id: 2
  {
    title: 'Vision in White',
    author: 'Nora Roberts',
    has_read: true,
    favorite: false,
    user_id: 1,
    genre_id: 2,
  },
  {
    title: 'Acting on Impulse',
    author: 'Mia Sosa',
    has_read: true,
    favorite: true,
    user_id: 1,
    genre_id: 2,
  },
  // horror | id: 3
  {
    title: 'Desperation',
    author: 'Steven King',
    has_read: true,
    favorite: true,
    user_id: 1,
    genre_id: 3,
  },
  {
    title: 'My Best Friend\'s Exorcism',
    author: 'Grady Hendrix',
    has_read: true,
    favorite: true,
    user_id: 1,
    genre_id: 3,
  },
  // fantasy | id: 4
  {
    title: 'Mistborn',
    author: 'Brandon Sanderson',
    has_read: true,
    favorite: true,
    user_id: 1,
    genre_id: 4,
  },
  {
    title: 'American Gods',
    author: 'Neil Gaiman',
    has_read: true,
    favorite: true,
    user_id: 1,
    genre_id: 4,
  },
  // sci-fi | id: 5
  {
    title: 'The Last Question',
    author: 'Isaac Asimov',
    has_read: true,
    favorite: true,
    user_id: 1,
    genre_id: 5,
  },
  {
    title: 'Dune',
    author: 'Frank Herbert',
    has_read: true,
    favorite: true,
    user_id: 1,
    genre_id: 5,
  },
];

const seedBook = () => Book.bulkCreate(bookData);

module.exports = seedBook;
