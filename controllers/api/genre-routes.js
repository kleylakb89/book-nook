const router = require('express').Router();
const { Book, Genre, Review, User } = require('../../models');
const withAuth = require('../../utils/auth');

//get all books by genre

//update a books genre

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