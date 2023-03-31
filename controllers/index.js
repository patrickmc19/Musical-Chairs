const router = require('express').Router();
const homeRouter = require('./home-router');
const apiRouter = require('./api');
const dashboardRouter = require('./api/dashboard')
router.use('/', homeRouter);
router.use('/api', apiRouter);
router.use('/api/profile', dashboardRouter);
module.exports = router;
