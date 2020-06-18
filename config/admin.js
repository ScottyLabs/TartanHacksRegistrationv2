ADMIN_EMAIL = process.env.ADMIN_EMAIL;
ADMIN_PASSWORD = process.env.ADMIN_PASS;

// Create a default admin user.
let User = require('../server/models/User');

// If there is already a user
User
  .findOne({
    email: ADMIN_EMAIL
  })
  .exec(function(err, user){
    if (!user){
      let u = new User();
      u.email = ADMIN_EMAIL;
      u.password = User.generateHash(ADMIN_PASSWORD);
      u.admin = true;
      u.verified = true;
      u.save(function(err){
        if (err){
          console.log(err);
        }
      });
    }
  });
