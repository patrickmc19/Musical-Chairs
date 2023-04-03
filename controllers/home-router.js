const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../util/withAuth");
const axios = require('axios');
const accessToken = 'BQAvfe8rSwpLTDNjEVcMgisMbaTKlaAFbpVFfQU0ilem8vc8xATqHROWzQWIW7kWY8q-rNHdP7pSuUdDDKbKu7ExXarAzQEOOOAzdPvGXI60JFdUcbER';



// Get all posts 

router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    // console.log(postData)

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    console.log(posts)

    // Pass serialized data and session flag into template
    res.render("home", {
      title: "My Home Page",
      isLoggedIn: req.session.isLoggedIn,
      posts,
    });
  } catch (err) {
    res.status(500).json(err);
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


// post a comment

router.post('/:id/comments', async (req, res) => {
  try {
    const postId = req.params.id;
    const { comment } = req.body;
    const userId = req.session.user_id;

    if (!comment || !userId) {
      return res.status(400).json({ message: 'Comment text and user ID are required' });
    }

    const newComment = await Comment.create({
      comment,
      user_id: userId,
      post_id: postId,
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.put('/post/:id', async (req, res) => {
  try {
    const postData = await Post.update({
      name: req.body.name,
      description: req.body.description
    }, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },

    });
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile/:id', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  res.render("login", { title: "Log-In Page" });
});

router.get("/signup", (req, res) => {
  res.render("signup", { title: "Sign-Up Page" });
});

module.exports = router;












// search for a specific post? 
// router.get('/post', withAuth, async (req, res) => {
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