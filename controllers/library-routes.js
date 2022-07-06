const router = require('express').Router();
const sequelize = require('../config/connection');
const { Book, Review, User } = require('../models');

router.get('/', (req, res) => {
  Book.findAll({
    attributes: [
      'id',
      'title',
      'author',
      'has_read',
      'favorite',
      'user_id',
      'genre_id',
      'review_id',
    ],
    include: [
      {
        model: Review,
        attributes: ['id', 'rating', 'text', 'user_id', 'book_id'],
        include: {
          model: User,
          attributes: ['username'],
        },
      },
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
    .then((dbBookData) => {
      const books = dbBookData.map((book) =>
        book.get({
          plain: true,
        })
      );

      res.render('home', {
        books,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('*', (req, res) => {
  res.status(404).send('Can\'t go there!');
});
module.exports = router;

//need a single-book handlebars
//extra comment
