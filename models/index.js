// import models
const User = require('./User');
const Book = require('./Book');
const Genre = require('./Genre');
const Review = require('./Review');

User.hasMany(Book, {
    foreignKey: 'user_id',
});

Book.belongsTo(User, {
    foreignKey: 'user_id',
});

Genre.hasMany(Book, {
    foreignKey: 'genre_id',
});

Book.belongsTo(Genre, {
    foreignKey: 'genre_id',
});

User.hasMany(Review, {
    foreignKey: 'user_id',
});

Review.belongsTo(User, {
    foreignKey: 'user_id',
});

Book.hasMany(Review, {
    foreignKey: 'review_id'
});

Review.belongsTo(Book, {
    foreignKey: 'book_id',
})


module.exports = {
    User,
    Book,
    Genre,
    Review,
}