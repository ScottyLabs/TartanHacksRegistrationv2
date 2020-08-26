const {
  create,
  get,
  join,
  leave,
  getMembers,
  decline,
  getInvite,
} = require("./team");

// TODO: separate controller into multiple routers per folder (Milestone 2)
let TeamController = {};

TeamController.create = create;
TeamController.get = get;
TeamController.join = join;
TeamController.leave = leave;
TeamController.getMembers = getMembers;
TeamController.decline = decline;
TeamController.getInvite = getInvite;

module.exports = TeamController;
