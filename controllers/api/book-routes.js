const router = require('express').Router();
const { Book, Genre, Review, User } = require('../../models');
const withAuth = require('../../utils/auth');
//add a book

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

//view all books

//view a single book 

//update a book






module.exports = router;