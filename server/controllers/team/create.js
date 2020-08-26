const User = require("../../models/User");
const Team = require("../../models/Team");

module.exports = async (req, res) => {
  const name = req.body.team_name;
  const id = req.params.id;

  if (!name) {
    return res.status(400).json({ message: "Please enter a team name" });
  }

  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ message: "Unknown user" });
  }

  if (user.team) {
    return res.status(400).json({ message: "User already has a team" });
  }

  const team = await Team.findOne({ name: name });
  if (team) {
    return res.status(400).json({ message: "Team already exists" });
  }

  const newTeam = await new Team({
    name: name,
    members: [id],
  }).save();

  user.team = newTeam._id;
  await user.save();

  return res.json(newTeam);
};
