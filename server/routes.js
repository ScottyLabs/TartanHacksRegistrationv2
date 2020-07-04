let User = require('./models/User');

module.exports = function(app) {

  // Application ------------------------------------------
  app.get('/', function(req, res){
    res.status(400).send("Forbidden");
  });

  // Wildcard all other GET requests to the angular app
  app.get('*', function(req, res){
    res.status(400).send("Forbidden");
  });

};
