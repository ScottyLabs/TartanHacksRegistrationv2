require('dotenv').load();
let mongoose        = require('mongoose');
let database        = process.env.DATABASE || { url: "mongodb://localhost:27017"};
let jwt             = require('jsonwebtoken');
mongoose.connect(database.url);

let User = require('../server/models/User');
let UserController = require('../server/controllers/UserController');

let email = 'hacker@school.edu';

User.findOne({
  email: email
}, function(err, user){
  let id = user._id;

  /* Change with old password */ 
  UserController.changePassword(
    id,
    'foobar',
    'hunter123',
    function (err, something){
      console.log(!err ? 'Successfuly changed' : err);
    }
  );

  /* Change with auth token */
  // let token = user.generateTempAuthToken();

  // UserController.resetPassword(
  //   id,
  //   token,
  //   'hunter123',
  //   function (err, something){
  //     console.log(!err ? 'Successfully changed' : err);
  //   }
  // );

});
