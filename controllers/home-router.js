const router = require('express').Router();
const { User } = require('../models');
const withAuth = require("../util/withAuth");

router.get('/', withAuth, async (req, res) => {
  try {
    let user;
    if (req.session.isLoggedIn) {
      user = await User.findByPk(req.session.userId, {
        exclude: ['password'],
        raw: true,
      });
    }
    res.render('home', {
      title: 'Home Page',
      isLoggedIn: req.session.isLoggedIn,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('⛔ Uh oh! An unexpected error occurred.');
  }
});

router.get('/user', withAuth, async (req, res) => {
  try{

  } catch (error) {
    console.error(error);
    res.status(500).send('⛔ Uh oh! An unexpected error occurred.');
  }
});

router.get('/user/:id', withAuth, async (req, res) => {
  try{

  } catch (error) {
    console.error(error);
    res.status(500).send('⛔ Uh oh! An unexpected error occurred.');
  }
});

router.put('/post/:id', withAuth, async (req, res) => {
  try{

  } catch (error) {
    console.error(error);
    res.status(500).send('⛔ Uh oh! An unexpected error occurred.');
  }
});

router.get('/post', withAuth, async (req, res) => {
  try{

  } catch (error) {
    console.error(error);
    res.status(500).send('⛔ Uh oh! An unexpected error occurred.');
  }
});

router.post('/post', withAuth, async (req, res) => {
  try{

  } catch (error) {
    console.error(error);
    res.status(500).send('⛔ Uh oh! An unexpected error occurred.');
  }
});

router.get('/post/:id', withAuth, async (req, res) => {
  try{

  } catch (error) {
    console.error(error);
    res.status(500).send('⛔ Uh oh! An unexpected error occurred.');
  }
});

router.put('/post/:id', withAuth, async (req, res) => {
  try{

  } catch (error) {
    console.error(error);
    res.status(500).send('⛔ Uh oh! An unexpected error occurred.');
  }
});

router.get('/login', (req, res) => {
  res.render('login', { title: 'Log-In Page' });
});

router.get('/signup', (req, res) => {
  res.render('signup', { title: 'Sign-Up Page' });
});

module.exports = router;
