const User = require("../../models/User");

module.exports = async (req, res) => {
  const id = req.params.id;

  const user = await User.findById(id).populate("teamInvitations");
  if (!user) {
    return res.status(404).json({ message: "Unknown user" });
  }

  if (user.teamId) {
    return res.status(400).json({ message: "User already has a team" });
  }

  const teamInvitations = user.teamInvitations;
  if (!teamInvitations || teamInvitations.length == 0) {
    return res.json([]);
  }
  return res.json(teamInvitations);
};
