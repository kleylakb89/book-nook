const router = require('express').Router();
const { default: axios } = require('axios');
const { Book, Genre, Review, User } = require('../../models');
const withAuth = require('../../utils/auth');
//add a book
router.post('/', withAuth, (req, res) => {
  console.log(req.body.has_read, req.body.favorite, req.body.genre_id);
  Book.create({
    title: req.body.title,
    author: req.body.author,
    has_read: req.body.has_read,
    favorite: req.body.favorite,
    user_id: req.session.user_id,
    genre_id: req.body.genre_id
  })
  .then((dbBookData) => res.json(dbBookData))
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
          message: 'No book found with this id'
        });
        return;
      }
      res.redirect('/books');
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

//update a book

router.post('/search', (req, res) => {
  const title = req.body.title;
  axios({
    method: 'get',
    url: `https://openlibrary.org/api/books?bibkeys=title:${title}&jscmd=details&format=json`,
    responseType: 'json'
  })
  .then(({data}) => {
    const isbn = data[`title:${title}`].details.isbn_13[0];
    res.send(`https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`);
  });
});





module.exports = router;