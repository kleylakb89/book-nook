const router = require('express').Router();
const { Book, Genre, Review, User } = require('../../models');
const withAuth = require('../../utils/auth');

//create a review
router.post('/', withAuth, (req, res) => {
  console.log('creating');
  Review.create({
    rating: req.body.rating,
    text: req.body.text,
    user_id: req.session.user_id,
    book_id: req.body.book_id
  })
})
//update a review//
router.put('./:id', withAuth, (req, res) => {
  Review.update({
    rating: req.body.rating,
    text: req.body.text,
  }, {
    where: {
      id: req.params.id,
    },
  })
    .then((dbReviewData) => {
      if(!dbReviewData) {
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
router.get('/', withAuth, (req, res) => {
  Review.findAll()
    .then((dbReviewData) => res.json(dbReviewData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//get a single review
//mayeb include other models?





module.exports = router;