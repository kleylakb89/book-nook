const router = require('express').Router();
const { Book, Genre, Review, User } = require('../../models');

//create a user and log in

router.post('/', (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((userData) => {
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.username = userData.username;
        req.session.email = userData.email;
        req.session.password = userData.password;
        req.session.loggedIn = true;

        res.json(userData);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// router.post('/login' ,(req, res) => {

// })

// router.post('/login', async (req, res) => {
//   User.findOne({
//     where: {
//       email: req.body.email
//     }
//   })
//     .then(userData => {
//       if (!userData) {
//         res.status(400).json({
//           message: 'Cannot find that email!'
//         });
//         return;
//       }

//       const validPassword = await userData.checkPassword(req.body.password);

//       if (!validPassword) {
//         res.status(400).json({
//           message: 'Incorrect password!'
//         });
//         return;
//       }

//       req.session.save(() => {
//         req.session.user_id = userData.id;
//         req.session.username = userData.username;
//         req.session.email = dbEmailData.email;
//         req.session.password= dbPasswordData.password;
//         req.session.loggedIn = true;

//         res.json({
//           user: userData,
//           message: 'Login successful!'
//         });
//       });
//     });
// });

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!userData) {
      res.status(400).json({ message: 'Incorrect email. Please try again.' });
      return;
    }

    const validPass = await userData.checkPassword(req.body.password);

    if (!validPass) {
      res
        .status(400)
        .json({ message: 'Incorrect password. Please try again.' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = userData.id;

      res.status(200).json({ user: userData, message: 'Logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

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
      exclude: ['password'],
    },
  })
    .then((userData) => res.json(userData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
