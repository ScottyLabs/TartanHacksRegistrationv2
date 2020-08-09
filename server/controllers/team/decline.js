const User = require("../../models/User");
const Team = require("../../models/Team");

module.exports = async (req, res) => {
  const id = req.params.id;
  const teamId = req.body.teamId;

  if (!teamId) {
    return res.status(400).json({ message: "Missing team ID" });
  }

  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ message: "Unknown user" });
  }

  if (user.team) {
    return res.status(400).json({ message: "User already has a team" });
  }

  const team = await Team.findById(teamId);
  if (!team) {
    return res.status(404).json({ message: "Team does not exist" });
  }

  if (user.teamInvite != teamId) {
    return res.status(400).json({ message: "User does not have an invite from this team" });
  }

  delete user.teamInvite;
  await user.save();

  return res.json(user);
};
