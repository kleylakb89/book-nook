const router = require('express').Router();
const { Book, Genre, Review, User } = require('../../models');
const withAuth = require('../../utils/auth');
//add a book
router.post('/', withAuth, (req, res) => {
  console.log('creating');
  Book.create({
    title: req.body.title,
    author: req.body.author,
    has_read: req.body.has_read,
    favorite: req.body.favorite,
    user_id: req.session.user_id,
    genre_id: req.body.genre_id
  })
  .then((dbBookData) => req.json(dbBookData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

//delete a book
router.delete('/:id', withAuth, (req, res) => {
  Book.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbBookData) => {
      if (!dbBookData) {
        res.status(404).json({
          message: 'No review found with this id'
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

// view all books
// router.get('/', withAuth, (req, res) => {
//   Book.findAll()
//     .then((dbBookData) => res.json(dbBookData))
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

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

      res.render('books', {
        books,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//view a single book

router.get("/:id", (req, res) => {
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

//update a book







module.exports = router;