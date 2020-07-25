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

  if (user.teamId) {
    return res.status(400).json({ message: "User already has a team" });
  }

  const team = await Team.findById(teamId);
  if (!team) {
    return res
      .status(404)
      .json({ message: "Team does not exist. Create one instead?" });
  }

  if (!user.teamInvitations.contains(teamId)) {
    return res
      .status(403)
      .json({ message: "You don't have an invite from this team" });
  }

  if (team.members.length >= process.env.TEAM_MAX_SIZE) {
    return res.status(400).json({ message: "Team is already full"})
  }
  user.teamInvitations = [];
  user.teamCode = team.name;
  await user.save();

  team.members.push(id);
  return await team.save();
};
