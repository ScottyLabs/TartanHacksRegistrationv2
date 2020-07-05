const Team = require("../../models/Team");

module.exports = async (req, res) => {
  const teamId = req.params.id;

  const team = await Team.findById(teamId).populate("members", "profile email");
  if (!team) {
    return res.status(404).json({ message: "Team not found" });
  }

  const members = team.members;
  return res.json(members);
};
