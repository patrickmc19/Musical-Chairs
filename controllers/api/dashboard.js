const router = require("express").Router();
const { Post, User, Profile } = require("../../models");
const withAuth = require("../../util/withAuth");

router.get('/', withAuth, async (req, res) => {
    try{
        const postHistory = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ["username"],
                },
            ],
            order: ["dateCreated", "DESC"],
        });

        const posts = postHistory.map((post) => post.get({plain: true}));
        res.render("profile", {
            title: 'My Dashboard',
            isLoggedIn: req.session.isLoggedIn,
            loggedInUserData: req.session.loggedInUserData,
            posts: posts
        });
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;

// took inspo from this dude https://github.com/DavidTunnell/tech-blog-fullstack-mvc-node-express-mysql-handlebars-authentication/blob/main/controllers/dashboard-routes.js
