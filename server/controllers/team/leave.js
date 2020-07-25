const User = require("../../models/User");
const Team = require("../../models/Team");

module.exports = async (req, res) => {
  const id = req.params.id;

  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ message: "Unknown user" });
  }

  const teamName = user.teamCode;
  if (!teamName) {
    return res.status(400).json({ message: "User is not part of a team"});
  }

  const team = Team.findOne({ name: teamName });
  if (team && team.members.contains(id)) {
    team.members.remove(id);
    // Delete team if no members left
    if (team.members.length == 0) {
      Team.deleteOne({ name: teamName });
    } else {
      await team.save();
    }
  }
  delete user.teamCode;
  return await user.save();
};
