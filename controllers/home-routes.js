const router = require('express').Router();
const { Book, Review, User } = require('../models');

router.get('/', (req, res) => {
  // res.render('home')
  if (!req.session.loggedIn) {
    res.redirect('login');
  } else {
    res.render('home', {
      loggedIn: req.session.loggedIn,
    });
  }
});


router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// router.get('*', (req, res) => {
//   res.status(404).send('Can\'t go there!');
// });

//need a single-book handlebars
//extra comment


module.exports = router;
