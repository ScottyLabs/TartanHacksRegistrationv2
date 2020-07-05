const User = require("../../models/User");
const Team = require("../../models/Team");

module.exports = async (req, res) => {
  const id = req.params.id;

  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ message: "Unknown user" });
  }

  if (!user.teamId) {
    return res.status(400).json({ message: "User does not have a team" });
  }

  const team = await Team.findById(user.teamId).populate("members");
  if (!team) {
    return res.status(404).json({ message: "Team not found" });
  }

  return res.json(team);
};
