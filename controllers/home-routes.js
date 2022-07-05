const router = require('express').Router();

router.get('/', (req, res) => {
    // res.render('home')
  if (!req.session.loggedIn) {
    res.redirect('login');
  } else {
    res.render('home');
  }
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/')
        return
    }
    res.render('login')
});

module.exports = router