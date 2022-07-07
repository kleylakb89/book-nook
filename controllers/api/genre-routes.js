const router = require('express').Router();
const { Book, Genre, Review, User } = require('../../models');
const withAuth = require('../../utils/auth');

//create a genre
router.post('/', withAuth, (req, res) => {
  console.log('creating');
  Genre.create({
    name: req.body.name,
    book_id: req.body.body,
  });
});

//get all books in a genre

router.get('/:genre_id', withAuth, (req, res) => {
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
        style: 'all-books.css',
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;
