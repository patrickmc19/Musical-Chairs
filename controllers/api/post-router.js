const router = require('express').Router();
const { Post, Comment, User } = require('../../models');
const withAuth = require('../../util/withAuth');


// Create a post

router.post("/post", withAuth, async (req, res) => {
  try {
    const postData = await Post.create({
      title: req.body.title,
      content: req.body.content,
      created_at: req.body.created_at,
      userId: req.session.userId,
    });
    return res.status(200).json(postData);
  } catch (error) {
    console.error(error);
    res.status(500).send("⛔ Uh oh! An unexpected error occurred.");
  }
});

// Comment on a post

router.post('/post/:id/comment', async (req, res) => {
  try {
    const postId = req.params.id;
    const { comment } = req.body;
    const userId = req.session.userId;

    if (!comment || !userId) {
      return res.status(400).json({ message: 'Comment text and user ID are required' });
    }

    const newComment = await Comment.create({
      comment,
      user_id: userId,
      post_id: postId,
    });

    // Fetch the user who created the comment
    const user = await User.findByPk(userId, { attributes: ['name'] });

    // Send the new comment as a response
    res.status(201).json({
      id: newComment.id,
      comment: newComment.comment,
      user: user.name,
      createdAt: newComment.createdAt,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Get all posts

router.get('/post', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    const post = postData.get({ plain: true });
    res.render("post", {
      title: "Post Page",
      isLoggedIn: req.session.isLoggedIn,
      post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("⛔ Uh oh! An unexpected error occurred.");
  }
});


// Get an individual post

router.get("/post/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk({
      where: {
        id: req.params.id,
        userId: req.session.userId,
      },
    });
    const post = postData.get({ plain: true });
    res.render("post", {
      title: "Post Page",
      isLoggedIn: req.session.isLoggedIn,
      post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("⛔ Uh oh! An unexpected error occurred.");
  }
});


// Update a post
router.put('/:id', async (req, res) => {
  try {
    const postData = await Post.update({
      name: req.body.name,
      description: req.body.description
    }, {
      where: {
        id: req.params.id,
        user_id: req.session.userId,
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
})



// Delete a post

router.delete("/post/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        userId: req.session.userId,
      },
    });
    if (!postData) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }
    res.status(200).json(postData);
  } catch (error) {
    console.error(error);
    res.status(500).send("⛔ Uh oh! An unexpected error occurred.");
  }
});

module.exports = router;