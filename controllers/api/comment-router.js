const router = require("express").Router();
const { Comment, User } = require("../../models");
const withAuth = require("../../util/withAuth");

// getting all comments in a post
router.get('/post/:id/', async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ["username"]
        },
      ],
     });
    const comment = commentData.get({ plain: true });
    res.render("comment", {
      title: "Comment Page",
      isLoggedIn: req.session.isLoggedIn,
      comment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("⛔ Uh oh! An unexpected error occurred.");
  }
});

// commenting on a post
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
// alternative route below???
// router.post("/post/:id/comment", withAuth, async (req, res) => {
//   try {
//     const commentData = await Comment.create({
//       content: req.body.content,
//       created_at: req.body.created_at,
//       userId: req.session.userId,
//       post_id: req.session.postId,
//     });
//     return res.status(200).json(commentData);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("⛔ Uh oh! An unexpected error occurred.");
//   }
// });

// MAYBE WE WILL ADD REACTIONS TO COMMENTS :D
// router.get("/comment/:id", withAuth, async (req, res) => {
//   try {
//     const commentData = await Comment.findByPk({
//       where: {
//         id: req.params.id,
//         userId: req.session.userId,
//       },
//     });
//     const comment = commentData.get({ plain: true });
//     res.render("comment", {
//       title: "Comment Page",
//       isLoggedIn: req.session.isLoggedIn,
//       comment,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("⛔ Uh oh! An unexpected error occurred.");
//   }
// });

// deleting a comment made by user
router.delete("/post/:id/comment/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        userId: req.session.userId,
      },
    });
    if (!commentData) {
      res.status(404).json({ message: "No comment found with this id!" });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;