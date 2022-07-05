const router = require('express').Router();
const { Book, Genre, Review, User } = require('../../models');
const withAuth = require('../../utils/auth');

//create a review

//update a review

//delete a review
router.delete('/:id', withAuth, (req, res) => {
    Review.destroy({
        where: {
            id: req.params.id,
        },
    })
    .then((dbReviewData) => {
        if (!dbReviewData) {
            res.status(404).json({
                message: 'No review found with this id'
            });
            return;
        }
        res.json(dbReviewData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

//get all reviews

//get a single review





module.exports = router;