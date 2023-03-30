const router = require("express").Router();
const { User, Post, Profile } = require("../models");
const withAuth = require("../util/withAuth");

router.get("/", withAuth, async (req, res) => {
  try {
    let user;
    if (req.session.isLoggedIn) {
      user = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
      });
    }
    res.render("home", {
      title: "Home Page",
      isLoggedIn: req.session.isLoggedIn,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("⛔ Uh oh! An unexpected error occurred.");
  }
});

router.post("/", withAuth, async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    req.session.save(() => {
      req.session.loggedIn = true;
      res.status(200).json(userData);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("⛔ Uh oh! An unexpected error occurred.");
  }
});

router.get("/user", withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
    });
    const user = userData.get({ plain: true });
    res.render("user", {
      title: "User Page",
      isLoggedIn: req.session.isLoggedIn,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("⛔ Uh oh! An unexpected error occurred.");
  }
});

router.get("/user/:id", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
    });
    const user = userData.get({ plain: true });
    res.render("user", {
      title: "User Page",
      isLoggedIn: req.session.isLoggedIn,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("⛔ Uh oh! An unexpected error occurred.");
  }
});

router.get("/post", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      raw: true,
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
      user_id: req.session.userId,
    });
    const post = postData.get({ plain: true });
    res.render("posts", {
      title: "Posts Page",
      isLoggedIn: req.session.isLoggedIn,
      postData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("⛔ Uh oh! An unexpected error occurred.");
  }
});

router.get("/post/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      raw: true,
    });
    const post = postData.get({ plain: true });
    res.render("post", {
      title: "Post Page",
      isLoggedIn: req.session.isLoggedIn,
      postData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("⛔ Uh oh! An unexpected error occurred.");
  }
});

router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });
    const user = userData.get({ plain: true });
    res.render('profile', {
      title: 'Profile Page',
      isLoggedIn: req.session.isLoggedIn,
      user,
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
