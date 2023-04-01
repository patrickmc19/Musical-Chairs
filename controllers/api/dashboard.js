const router = require("express").Router();
const { Post, User, Profile } = require("../../models");
const withAuth = require("../../util/withAuth");

// get all post and join with user data
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
        
        // serialize data for template to read
        const posts = postHistory.map((post) => post.get({plain: true}));

        // pass serialized data and session flag into template
        res.render("profile", {
            title: 'My Dashboard',
            isLoggedIn: req.session.isLoggedIn,
            posts
        });
    } catch (err) {
        res.status(500).json(err)
    }
});

// getting specific post
router.get('/post/:id', async (req, res) => {
    try{
        const postHistory = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ["username"],
                },
            ],
        });

        const post = postHistory.get({ plain: true });

        res.render('post', {
            ...post,
            isLoggedIn: req.session.isLoggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;
