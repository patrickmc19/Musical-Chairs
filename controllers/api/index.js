const router = require('express').Router();
const usersRouter = require('./users-router');
const commentRouter = require('./comment-router');
const postRouter = require('./post-router');

router.use('/users', usersRouter);
router.use('/comment', commentRouter);
router.use('/post', postRouter);

module.exports = router;
