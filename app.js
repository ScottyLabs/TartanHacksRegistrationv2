// Load the dotfiles.
require('dotenv').config({silent: true});

var express         = require('express');

// Middleware!
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
const morgan = require('morgan');

var mongoose        = require('mongoose');
var port            = process.env.PORT || 5000;
var database        = process.env.DATABASE || process.env.MONGODB_URI || "mongodb://localhost:27017";

var settingsConfig  = require('./config/settings');
var adminConfig     = require('./config/admin');

var app             = express();

// Connect to mongodb
mongoose.connect(database);

// Morgan is for logging
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({
  limit: '5mb',
  extended: true
}));
app.use(bodyParser.json({
  limit: '5mb'
}));

app.use(methodOverride());

app.use(express.static(__dirname + '/client/build'));

// Routers =====================================================================

var apiRouter = express.Router();
require('./server/routes/api')(apiRouter);
app.use('/api', apiRouter);

var authRouter = express.Router();
require('./server/routes/auth')(authRouter);
app.use('/auth', authRouter);

require('./server/routes')(app);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);
