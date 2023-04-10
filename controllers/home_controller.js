const Post= require('../models/post');

//display the posts
// module.exports.home = async function(req, res) {
//     try {
//       const posts = await Post.find({});
//       res.render('home', {
//         title: "Home | Home",
//         posts: posts
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   }

//populate the user of each post
module.exports.home = async function(req, res) {
    try {
      let posts = await Post.find({})
        .populate('user')
        .populate({
          path: 'comments',
          populate: {
            path: 'user'
          }
        })
      return res.render('home', {
        title: "Codeial I Home",
        posts: posts
      });
    } catch (err) {
       console.error(err);
       return;
    }
  }