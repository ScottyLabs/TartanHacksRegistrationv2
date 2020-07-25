const {
  create,
  get,
  join,
  leave,
  getMembers,
  decline,
  getInvites,
} = require("./team");

// TODO: separate controller into multiple routers per folder (Milestone 2)
let TeamController = {};

TeamController.create = create;
TeamController.get = get;
TeamController.join = join;
TeamController.leave = leave;
TeamController.getMembers = getMembers;
TeamController.decline = decline;
TeamController.getInvites = getInvites;

module.exports = TeamController;
