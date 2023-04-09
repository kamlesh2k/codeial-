const Post = require('../models/post')

module.exports.create = async function(req,res){
    console.log(req.body);
    console.log('user==', req.user);

    
    let post = await Post.create({
        content: req.body.content,
        user: req.user.id
    })
    console.log("new Post:-", post);
        if(post){
            console.log('Post created');
            return res.redirect('back');
        }
    return res.redirect('back');
}