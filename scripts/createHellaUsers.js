// Connect to mongodb
let mongoose        = require('mongoose');
const  database        = process.env.DATABASE || { url: "mongodb://localhost:27017"};
mongoose.connect(database.url);

const  UserController = require('../server/controllers/UserController');

const  users = 1000;
const  username = 'hacker';

for (let i = 0; i < users; i++){
  console.log(username, i);
  UserController
    .createUser(username + i + '@school.edu', 'foobar', function(){
    console.log(i);
    });
}
