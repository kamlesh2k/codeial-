const User = require('../models/user');


module.exports.profile= async function(req,res){
    return res.render('user_profile', {
        title: 'User Profile'
    })
}

//render SignUp page
module.exports.signUp= function(req, res){
    // if(req.isAuthenticated()){
    //     return res.redirect('/users/profile');
    // }
    return res.render('user_sign_up',{
        title: "Codeial | Sign Up"
    })
}

//render SignIn page
module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title: "Codeial | Sign In"
    })
}


//get the sign up data
module.exports.create = async function (req, res) {
    if (req.isAuthenticated()) {

        return res.redirect('/users/profile')
    }
    if (req.body.password != req.body.confirm_password) {

        return res.redirect('back');
    }
    try {
        user = await User.findOne({ email: req.body.email });
        if (!user) {
            await User.create(req.body);
            return res.redirect('/users/sign-in');
        } else {
            return res.redirect('back');
        }

    } catch (err) {
        console.log("Error: ", err);
        return;
    }
    }




//sign in and create a section for the user
module.exports.createSession = function (req, res) {
    return res.redirect('/');
}


//for logout
module.exports.destroySession = function(req, res){
    req.logout(function(err) {
        if (err) {
            console.log(err);
        }
        return res.redirect('/');
    });
}



// module.exports.createSession = async function(req, res) {
//     try {
//         // find the user
//         const user = await User.findOne({ email: req.body.email });

//         if (!user) {
//             // handle user not found
//             return res.redirect('back');
//         }

//         // handle password which doesn't match
//         if (user.password !== req.body.password) {
//             return res.redirect('back');
//         }

//         // handle user found and password matches
//         res.cookie('user_id', user.id);
//         return res.redirect('/users/profile');
//     } catch (err) {
//         console.log('Error in finding user in Sign In', err);
//         // handle error
//     }
// };

    //handle user not found
