let Settings = require('../server/models/Settings');

Settings
  .findOne({})
  .exec(function(err, settings){
    if (!settings){
      let settings = new Settings();
      settings.save();
    }
  });
