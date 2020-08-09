const User = require("../../models/User");
const Team = require("../../models/Team");

module.exports = async (req, res) => {
  const id = req.params.id;

  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ message: "Unknown user" });
  }

  let team = user.team;
  if (!team) {
    return res.status(400).json({ message: "User is not part of a team"});
  }

  team = Team.findOne({ name: teamName });
  if (team && team.members.contains(id)) {
    team.members.remove(id);
    // Delete team if no members left
    if (team.members.length == 0) {
      Team.deleteOne({ name: teamName });
    } else {
      await team.save();
    }
  }
  delete user.team;
  return await user.save();
};
