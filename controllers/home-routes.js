const router = require('express').Router();
const { Book, Review, User, Genre } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', (req, res) => {
  // res.render('home')
  if (!req.session.loggedIn) {
    res.redirect('login');
  } else {
    res.render('home', {
      style: 'login.css',
      loggedIn: req.session.loggedIn,
    });
  }
});


router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login',{
    style: 'login.css',
  });
});

// router.get('*', (req, res) => {
//   res.status(404).send('Can\'t go there!');
// });

//need a single-book handlebars
//extra comment

router.get('/genres', withAuth, (req, res) => {
  Genre.findAll()
    .then((dbGenreData) => res.json(dbGenreData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/genres/:genre_id', withAuth, (req, res) => {
  Book.findAll({
    where: {
      genre_id: req.params.genre_id,
    },
    include: [
      {
        model: Genre,
        attributes: ['name'],
      },
    ],
  })
    .then((dbBookData) => {
      const books = dbBookData.map((book) =>
        book.get({
          plain: true,
        })
      );

      res.render('genre', {
        books,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/books', (req, res) => {
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

      res.render('books', {
        books,
        style: 'all-books.css',
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//view a single book

router.get("/books/:id", (req, res) => {
  Book.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      "id",
      "title",
      "author",
      "has_read",
      "favorite",
      "user_id",
      "genre_id",
      "review_id",
    ],
    include: [
      {
        model: Review,
        attributes: ["id", "rating", "text", "user_id", "book_id"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbBookData) => {
      if (!dbBookData) {
        res.status(404).json({
          message: "No book found with this id",
        });
        return;
      }

      const book = dbBookData.get({
        plain: true,
      });

      res.render("single-book", {
        book,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
