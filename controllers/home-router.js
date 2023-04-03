const router = require('express').Router();
const { User } = require('../models');
const withAuth = require("../util/withAuth");
const axios = require('axios');
const accessToken = 'BQAvfe8rSwpLTDNjEVcMgisMbaTKlaAFbpVFfQU0ilem8vc8xATqHROWzQWIW7kWY8q-rNHdP7pSuUdDDKbKu7ExXarAzQEOOOAzdPvGXI60JFdUcbER';


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
  try {
    // Get all users, sorted by name
    // create user.handlebars page to render when this route is hit.
  } catch (error) {
    console.error(error);
    res.status(500).send('⛔ Uh oh! An unexpected error occurred.');
  }
});

// creates the music route
router.get('/music', withAuth, async (req, res) => {
  res.render('music', { title: 'Music' })

});

// search route we're trying to hit in the front end 

router.get('/music/search', async (req, res) => {
  console.log('search request received');
  const query = req.query.q;
  const type = 'track';
  const url = `https://api.spotify.com/v1/search?q=${query}&type=${type}`;
  console.log('url:', url);

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const tracks = response.data.tracks.items;
    res.json(tracks);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});



// router.get('/user/:id', withAuth, async (req, res) => {
//   try {

//   } catch (error) {
//     console.error(error);
//     res.status(500).send('⛔ Uh oh! An unexpected error occurred.');
//   }
// });

// router.put('/post/:id', withAuth, async (req, res) => {
//   try {
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('⛔ Uh oh! An unexpected error occurred.');
//   }
// });

// router.get('/post', withAuth, async (req, res) => {
//   try {

//   } catch (error) {
//     console.error(error);
//     res.status(500).send('⛔ Uh oh! An unexpected error occurred.');
//   }
// });

// router.post('/post', withAuth, async (req, res) => {
//   try {

//   } catch (error) {
//     console.error(error);
//     res.status(500).send('⛔ Uh oh! An unexpected error occurred.');
//   }
// });

// router.get('/post/:id', withAuth, async (req, res) => {
//   try {

//   } catch (error) {
//     console.error(error);
//     res.status(500).send('⛔ Uh oh! An unexpected error occurred.');
//   }
// });

// router.put('/post/:id', withAuth, async (req, res) => {
//   try {

//   } catch (error) {
//     console.error(error);
//     res.status(500).send('⛔ Uh oh! An unexpected error occurred.');
//   }
// });

router.get('/login', (req, res) => {
  res.render('login', { title: 'Log-In Page' });
});

router.get('/signup', (req, res) => {
  res.render('signup', { title: 'Sign-Up Page' });
});

module.exports = router;
