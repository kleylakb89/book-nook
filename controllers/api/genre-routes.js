const router = require('express').Router();
const { Book, Genre, Review, User } = require('../../models');
const withAuth = require('../../utils/auth');

//create a genre
router.post('/', withAuth, (req, res) => {
  console.log('creating');
  Genre.create({
    name: req.body.name,
    book_id: req.body.body
  });
});

//get all books in a genre



//get all genres
router.get('/', withAuth, (req, res) => {
  Genre.findAll()
    .then((dbGenreData) => res.json(dbGenreData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});





module.exports = router;