// Load the dotfiles.
require('dotenv').config({silent: true});

const express         = require('express');

// Middleware!
const bodyParser      = require('body-parser');
const methodOverride  = require('method-override');
const morgan = require('morgan');

const mongoose        = require('mongoose');
const port            = process.env.SERVER_PORT || 5000;
const database        = process.env.DATABASE || process.env.MONGODB_URI || "mongodb://localhost:27017";

const settingsConfig  = require('./config/settings');
const adminConfig     = require('./config/admin');

const app             = express();

// Connect to mongodb
mongoose.connect(database, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

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

const apiRouter = express.Router();
require('./server/routes/api')(apiRouter);
app.use('/api', apiRouter);

const authRouter = express.Router();
require('./server/routes/auth')(authRouter);
app.use('/auth', authRouter);

require('./server/routes')(app);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);
