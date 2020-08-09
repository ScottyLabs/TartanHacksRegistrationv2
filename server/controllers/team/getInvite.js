const User = require("../../models/User");

module.exports = async (req, res) => {
  const id = req.params.id;

  const user = await User.findById(id).populate("teamInvite");
  if (!user) {
    return res.status(404).json({ message: "Unknown user" });
  }

  if (user.teamId) {
    return res.status(400).json({ message: "User already has a team" });
  }

  if (user.teamInvite) {
    return res.status(400).json({ message: "User already has a pending team invite" });
  }

  console.log(user);
  const teamInvite = user.teamInvite;
  if (!teamInvite) {
    return res.json([]);
  }
  return res.json(teamInvite);
};
