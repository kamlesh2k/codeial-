 const Comment = require('../models/comment');
 const Post = require("../models/post");

 module.exports.create = async function(req, res){
    try {
        const post = await Post.findById(req.body.post);
        if (post) {
            const comment = await Comment.create({
                content:req.body.content,
                post: req.body.post,
                user: req.body._id
            });
            if (post.comments) {
                post.comments.push(comment);
            } else {
                post.comments = [comment];
            }
            await post.save();
            console.log(post);
            let pot = await post.populate('user','name').exec();
            console.log(pot);
            res.redirect('/');
        } else {
            console.log("Post not found");
            res.redirect('/');
        }
    } catch (err) {
        console.log("error in comment", err);
        res.redirect('/');
    }
}

