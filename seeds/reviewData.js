const { Review } = require('../models');

const reviewData = [
  {
    rating: 3,
    text: 'I think this book was okay',
    user_id: 1,
    book_id: 4,
  },
];

const seedReview = () => Review.bulkCreate(reviewData);

module.exports = seedReview;
