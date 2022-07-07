const router = require('express').Router();
const { Book, Review, User, Genre } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
  // res.render('home')
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

router.get('/add', (req, res) => {
  // res.render('home')
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

// router.get('*', (req, res) => {
//   res.status(404).send('Can\'t go there!');
// });

//need a single-book handlebars
//extra comment

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

// get favorites
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

//view a single book

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
      // user_id
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
