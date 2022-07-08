// requiring dependencies
const router = require('express').Router();
const { Book, Review, User, Genre } = require('../models');
const withAuth = require('../utils/auth');

// redirects to login if not logged in, otherwise renders the home view
router.get('/', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('login');
  } else {
    res.render('home', {
      style: 'all-books.css',
      loggedIn: req.session.loggedIn,
      mainPage: true,
    });
  }
});

// renders the add-book view
router.get('/add', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('login');
  } else {
    res.render('add-book', {
      style: 'all-books.css',
      loggedIn: req.session.loggedIn,
      mainPage: false,
    });
  }
});

// if logged in, redirects to home, otherwise renders login view
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login', {
    style: 'login.css',
    mainPage: false,
  });
});

// renders all genres view
router.get('/genres', withAuth, (req, res) => {
  Genre.findAll()
    .then((dbGenreData) => {
      const genres = dbGenreData.map((genre) =>
        genre.get({
          plain: true,
        })
      );

      res.render('all-genres', {
        genres,
        style: 'all-books.css',
        loggedIn: req.session.loggedIn,
        mainPage: false,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// renders all books in a genre
router.get('/genres/:genre_id', withAuth, (req, res) => {
  Book.findAll({
    where: {
      genre_id: req.params.genre_id,
      user_id: req.session.user_id,
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
        style: 'all-books.css',
        loggedIn: req.session.loggedIn,
        mainPage: false,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// renders all books in a user's library
router.get('/books', (req, res) => {
  Book.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: [
      'id',
      'title',
      'author',
      'has_read',
      'favorite',
      'cover',
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

      res.render('books', {
        books,
        style: 'all-books.css',
        loggedIn: req.session.loggedIn,
        mainPage: true,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// renders all user's favorites
router.get('/favorites', (req, res) => {
  Book.findAll({
    where: {
      favorite: true,
      user_id: req.session.user_id,
    },
    attributes: ['id', 'title', 'author', 'cover', 'has_read', 'favorite'],
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
      console.log(books);
      res.render('favorites', {
        books,
        style: 'all-books.css',
        loggedIn: req.session.loggedIn,
        mainPage: false,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// renders a single book
router.get('/books/:id', (req, res) => {
  Book.findOne({
    where: {
      id: req.params.id,
      user_id: req.session.user_id,
    },
    attributes: [
      'id',
      'title',
      'author',
      'cover',
      'has_read',
      'favorite',
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
      {
        model: Genre,
        attributes: ['name'],
      },
    ],
  })
    .then((dbBookData) => {
      if (!dbBookData) {
        res.status(404).json({
          message: 'No book found with this id',
        });
        return;
      }

      const book = dbBookData.get({
        plain: true,
      });

      res.render('single-book', {
        book,
        style: 'all-books.css',
        loggedIn: req.session.loggedIn,
        mainPage: true,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// updates if a book is favorited
router.put('/books/:id', withAuth, (req, res) => {
  Book.update(
    {
      favorite: req.body.favorite,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbBookData) => {
      if (!dbBookData) {
        res.status(404).json({
          message: 'No book found with this id',
        });
        return;
      }
      res.json(dbBookData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;