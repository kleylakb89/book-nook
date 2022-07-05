const router = require('express').Router();
const sequelize = require('../config/connection');
const { Review, Book } = require('../models');

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
              'review_id'
          ],
          include: [{
                  model: Review,
                  attributes: ['id', 'rating', 'text', 'user_id', 'book_id'],
                  include: {
                      model: User,
                      attributes: ['username']
                  }
              },
              {
                  model: User,
                  attributes: ['username']
              }
          ]
      })
      .then(dbBookData => {
          const books = dbBookData.map(book => book.get({
              plain: true
          }));

          res.render('main', {
              books,
              loggedIn: req.session.loggedIn
          });
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

router.get('/books/:id', (req, res) => {
  Book.findOne({
          where: {
              id: req.params.id
          },
          attributes: [
            'id',
            'title',
            'author',
            'has_read',
            'favorite',
            'user_id',
            'genre_id',
            'review_id'
          ],
          include: [{
                  model: Review,
                  attributes: ['id', 'rating', 'text', 'user_id', 'book_id'],          
                   include: {
                      model: User,
                      attributes: ['username']
                  }
              },
              {
                  model: User,
                  attributes: ['username']
              }
          ]
      })
      .then(dbBookData => {
          if (!dbBookData) {
              res.status(404).json({
                  message: 'No book found with this id'
              });
              return;
          }

          const book = dbBookData.get({
              plain: true
          });

          res.render('single-book', {
              book,
              loggedIn: req.session.loggedIn
          });
      })
      .catch(err => {
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
  res.status(404).send("Can't go there!");
})
module.exports = router;

//need a single-book handlebars
//extra comment