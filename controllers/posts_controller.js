const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req,res){
   
    let post = await Post.create({
        content: req.body.content,
        user: req.user.id
    })

    
        if(post){
            console.log('Post created');
            return res.redirect('back');
        }
    return res.redirect('back');
}



module.exports.destroy = async function(req,res)
{
   try{
      let post = await Post.findById(req.params.id);
      if(post.user == req.user.id){


        //  await Like.deleteMany({likeable: post, onModel: 'Post'});
        //  await Like.deleteMany({_id: {$in: post.comments}});
   
         post.remove();
         console.log(post);
         await Comment.deleteMany({post: req.params.id});
         
         return res.redirect('back');
      }else{ 
            return res.redirect('back');
         }
   }catch(err){
      return res.redirect('back');
   }
}
