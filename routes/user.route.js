const express = require('express');
const app = express();
const userRoutes = express.Router();
const jwt = require('jsonwebtoken');
let AllUser = require('../models/AllUsers');


userRoutes.route('/add').post(function (req, res) {
    let allUser = new AllUser(req.body);

    console.log("---------------------------3-3-3--3-3-3-3-3",allUser)
    allUser.save()
      .then(game => {
      res.send(200).json({'allUser': 'AdUnit in added successfully'});
      })
      .catch(err => {
      res.send(400).send("unable to save to database");
      });
  });
  

  userRoutes.route('/').get(function (req, res) {
    //   AllUser.find(function (err, allUser){
    //   if(err){
    //     console.log(err);
    //   }
    //   else {
    //     // res.json(allUser);
    //     console.log("all user");
    //   }
    // });
    console.log("done","RRRRRRRRRRRRRRRRRRRRRRRRRR");
    res.send( console.log("test completeed"));
  });



userRoutes.route('/login').post(function(req,res){
 let result_data = {};
let email = req.body.email;
let password = req.body.password;
var query = { email : email };
var query2 = { password : password };
AllUser.findOne(query).then(function(user){
  if(user){
    if(user.password == password) {
      const JWTToken = jwt.sign({   
        email: user.email,
        _id: user._id
      },
      'secret', {
        expiresIn: '2h'
      });
      AllUser.update({
        _id:user._id
      },{ $set : { token:JWTToken }},
      function(err,userupdated){
        if(err){
          console.log(err);
        }
        else{
          console.log(userupdated);
        }               
      });
    result_data.userInfo = user
    result_data.token = JWTToken
    return res.json({
      code: 200,
      success: {
        str1: 'Successfully LoggedIn',
        str2: ''
      },
      data: result_data
    });
    }
    else{
      return res.json({
        code: 401,
        failed: 'Unauthorized Access'
      });
    }
  } else{
    res.status(500).json({
      // error: error
    });
  }

});

});
// userRoutes.route('/login').post(function (req, res, next) {
//     console.log(req.body,"rk");
//     let result_data = {};
//     User.findOne({
//         email: req.body.email
//       })
//       .exec()
//       .then(function (user) {
//         bcrypt.compare(req.body.password, user.password, function (err, result) {
//           if (err) {
//             return res.status(401).json({
//               failed: 'Unauthorized Access'
//             });
//           }

//           if (result) {
//             const JWTToken = jwt.sign({
//                 email: user.email,
//                 _id: user._id
//               },
//               'secret', {
//                 expiresIn: '2h'
//               });
//               User.update({
//                 _id:user._id
//               },{ $set : { token:JWTToken }},
//               function(err,userupdated){
//                 if(err){
//                   console.log(err);
//                 }
//                 else{
//                   console.log(userupdated);
//                 }               
//               });
//             result_data.userInfo = user
//             result_data.token = JWTToken
//             return res.json({
//               code: 200,
//               success: {
//                 str1: 'Successfully LoggedIn',
//                 str2: ''
//               },
//               data: result_data
//             });
//           }
//           return res.json({
//             code: 401,
//             failed: 'Unauthorized Access'
//           });
//         });
//       })
//       .catch(error => {
//         res.status(500).json({
//           error: error
//         });
//       });
//   });


  module.exports = userRoutes;