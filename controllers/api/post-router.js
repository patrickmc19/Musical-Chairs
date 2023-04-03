const router = require('express').Router();
const { Post, User } = require('../../models');
const withAuth = require('../../util/withAuth');

router.get("/post", withAuth, async (req, res) => {
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