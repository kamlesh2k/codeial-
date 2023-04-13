 const Comment = require('../models/comment');
 const Post = require("../models/post");

 module.exports.create = async function(req, res){
    try {
        const post = await Post.findById(req.body.post);
        if (post) {
            const comment = await Comment.create({
                content:req.body.content,
                user: req.user._id,
                post: req.body.post
            });
            post.comments.push(comment)
            post.save();
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

module.exports.destroy = async function(req, res) {
  try {
    console.log(req.params.id);
    // let doneAssigned = await Assigned.findOneAndDelete({ assignedTo: req.user._id }).exec();
    let comment = await Comment.findByIdAndDelete(req.params.id);
    console.log(comment);
    console.log(comment.user);
    console.log(req.user.id);
    if (comment.user == req.user.id) {
      let postId = comment.post;
      // comment.remove();
      
      await Post.findByIdAndUpdate(postId, {$pull: { comments: req.params.id}});
      console.log('susses cmt');
      return res.redirect('/');
    } else {
      return res.redirect('/');
    }
  } catch (err) {
    return res.redirect('/');
  }
}

