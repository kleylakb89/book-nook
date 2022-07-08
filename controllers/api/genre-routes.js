// requiring dependencies
const router = require('express').Router();
const { Book, Genre } = require('../../models');
const withAuth = require('../../utils/auth');

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