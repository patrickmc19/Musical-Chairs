const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../util/withAuth");

router.get("/comment", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.findAll({
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

router.post("/comment", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.create({
        content: req.body.content,
        user_id: req.session.userId,
        post_id: req.session.postId,
    });
    return res.status(200).json(commentData);
  } catch (error) {
    console.error(error);
    res.status(500).send("⛔ Uh oh! An unexpected error occurred.");
  }
});

router.get("/comment/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.findByPk({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
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

router.delete("/comment/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
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