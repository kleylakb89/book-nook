const { Book } = require('../models');

const bookData = [
  // mystery | id: 1
  {
    title: 'Our Crooked Hearts',
    author: 'Melissa Albert',
    has_read: true,
    favorite: true,
    cover: 'https://covers.openlibrary.org/b/isbn/9781250826367-M.jpg',
    user_id: 1,
    genre_id: 1,
  },
  {
    title: 'One By One',
    author: 'Ruth Ware',
    has_read: false,
    favorite: false,
    cover: 'https://covers.openlibrary.org/b/isbn/9781432882839-M.jpg',
    user_id: 1,
    genre_id: 1,
  },
  // romance | id: 2
  {
    title: 'People We Meet On Vacation',
    author: 'Emily Henry',
    has_read: true,
    favorite: false,
    cover: 'https://covers.openlibrary.org/b/isbn/9781984806758-M.jpg',
    user_id: 1,
    genre_id: 2,
  },
  {
    title: 'Soulless',
    author: 'Gail Carriger',
    has_read: true,
    favorite: true,
    cover: 'https://covers.openlibrary.org/b/isbn/9780316056632-M.jpg',
    user_id: 1,
    genre_id: 2,
  },
  // horror | id: 3
  {
    title: 'Bag Of Bones',
    author: 'Steven King',
    has_read: true,
    favorite: true,
    cover: 'https://covers.openlibrary.org/b/isbn/9780684853505-M.jpg',
    user_id: 1,
    genre_id: 3,
  },
  {
    title: 'My Best Friend\'s Exorcism',
    author: 'Grady Hendrix',
    has_read: true,
    favorite: true,
    cover: 'https://covers.openlibrary.org/b/isbn/9781594749766-M.jpg',
    user_id: 1,
    genre_id: 3,
  },
  // fantasy | id: 4
  {
    title: 'Mistborn',
    author: 'Brandon Sanderson',
    has_read: true,
    favorite: true,
    cover: 'https://covers.openlibrary.org/b/isbn/9780765311788-M.jpg',
    user_id: 1,
    genre_id: 4,
  },
  {
    title: 'American Gods',
    author: 'Neil Gaiman',
    has_read: true,
    favorite: true,
    cover: 'https://covers.openlibrary.org/b/isbn/9780060558123-M.jpg',
    user_id: 1,
    genre_id: 4,
  },
  // sci-fi | id: 5
  {
    title: 'The Andromeda Strain',
    author: 'Michael Chrichton',
    has_read: true,
    favorite: true,
    cover: 'https://covers.openlibrary.org/b/isbn/9780060541811-M.jpg',
    user_id: 1,
    genre_id: 5,
  },
  {
    title: 'Dune',
    author: 'Frank Herbert',
    has_read: true,
    favorite: true,
    cover: 'https://covers.openlibrary.org/b/isbn/9780575068568-M.jpg',
    user_id: 1,
    genre_id: 5,
  },
];

const seedBook = () => Book.bulkCreate(bookData);

module.exports = seedBook;
