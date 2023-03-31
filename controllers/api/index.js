const router = require('express').Router();
const usersRouter = require('./users-router');
const exampleRouter = require('./example-router');
const spotifyRouter = require('./spotify-router');

router.use('/users', usersRouter);
router.use('/example', exampleRouter);
router.use('spotify', spotifyRouter)

module.exports = router;
