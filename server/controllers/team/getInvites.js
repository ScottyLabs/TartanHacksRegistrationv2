const User = require("../../models/User");

module.exports = async (req, res) => {
  const id = req.params.id;

  const user = await (await User.findById(id)).populate("teamInvitations");
  if (!user) {
    return res.status(404).json({ message: "Unknown user" });
  }

  const teamInvitations = user.teamInvitations;
  if (teamInvitations) {
    return res.json([]);
  }
  return res.json(teamInvitations);
};
