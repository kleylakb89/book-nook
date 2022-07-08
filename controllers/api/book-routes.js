// requiring dependencies
require('dotenv').config();
const router = require('express').Router();
const axios = require('axios');
const { Book } = require('../../models');
const withAuth = require('../../utils/auth');

//add a book
router.post('/', withAuth, (req, res) => {
  Book.create({
    title: req.body.title,
    author: req.body.author,
    has_read: req.body.has_read,
    favorite: req.body.favorite,
    cover: req.body.cover,
    user_id: req.session.user_id,
    genre_id: req.body.genre_id,
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
          message: 'No book found with this id',
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

// update if a book has been read
router.put('/:id', withAuth, (req, res) => {
  Book.update(
    {
      has_read: req.body.has_read,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbBookData) => {
      if (!dbBookData) {
        res.status(404).json({
          message: 'No book found with this id',
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

router.post('/isbn', async (req, res) => {
  try {
    const { title } = req.body;
    const requestURL = `https://api2.isbndb.com/books/${title}?page=1&pageSize=20&column=title`;
    
    // headers for the api fetch
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': process.env.AUTH
      }
    };

    // fetching the isbn to use for finding the book cover
    const { data } = await axios.get(requestURL, options);
    res.status(200).send(data.books[0].isbn13);
  } catch(err) {
    res.status(500).json(err);
  }

});

module.exports = router;
