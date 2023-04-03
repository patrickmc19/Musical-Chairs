const router = require('express').Router();
const usersRouter = require('./users-router');
const spotifyRouter = require('./spotify-router');
const commentRouter = require('./comment-router');
const postRouter = require('./post-router');
const profileRouter = require('./profile-router');

router.use('spotify', spotifyRouter)
router.use('/users', usersRouter);
router.use('/comment', commentRouter);
router.use('/post', postRouter);
router.use('/profile', profileRouter);

module.exports = router;
