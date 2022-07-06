const router = require('express').Router();
const { Book, Genre, Review, User } = require('../../models');

//create a user and log in

router.post('/', (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
    .then(dbUserData => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.email = dbUserData.email;
        req.session.password= dbUserData.password;
        req.session.loggedIn = true;

        res.json(dbUserData);
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// router.post('/login' ,(req, res) => {

// })

// router.post('/login', (req, res) => {
//   console.log('------------------------------------------------------------------------------------', req.body)
//   User.findOne({
//     where: {
//       username: req.body.username
//     }
//   })
//     .then(dbUserData => {
//       if (!dbUserData) {
//         res.status(400).json({
//           message: 'Cannot find that username!'
//         });
//         return;
//       }

//       req.session.save(() => {
//         req.session.user_id = dbUserData.id;
//         req.session.username = dbUserData.username;
//         req.session.email = dbEmailData.email;
//         req.session.password= dbPasswordData.password;
//         req.session.loggedIn = true;

//         res.json({
//           user: dbUserData,
//           message: 'Login successful!'
//         });
//       });

//       const validPassword = dbUserData.checkPassword(req.body.password);

//       if (!validPassword) {
//         res.status(400).json({
//           message: 'Incorrect password!'
//         });
//         return;
//       }

//       req.session.save(() => {
//         req.session.user_id = dbUserData.id;
//         req.session.username = dbUserData.username;
//         req.session.email = dbEmailData.email;
//         req.session.password= dbPasswordData.password;
//         req.session.loggedIn = true;

//         res.json({
//           user: dbUserData,
//           message: 'Login successful!'
//         });
//       });
//     });
// });

//log out
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }

});
//get all users?

router.get('/', (req, res) => {
  User.findAll({
    attributes: {
      exclude: ['password']
    }
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});





module.exports = router;