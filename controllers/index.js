const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const libraryRoutes = require('./library-routes');

router.use('/api', apiRoutes);
router.use('/library', libraryRoutes);
router.use('/', homeRoutes);


module.exports = router;