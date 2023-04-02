const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment')

// Define sequelize associations in this file.


User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelte: 'CASCADE',
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

User.hasMany(Comment, {
    foreignKey: 'comment_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(Post, {
    foreignKey: "user_id",
});
module.exports = { User, Post, Comment };
