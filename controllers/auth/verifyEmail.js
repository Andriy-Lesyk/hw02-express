const { User } = require("../../models/user");

const { createError } = require("../../models/user");

const verifyEmail = async (req, res) => {
  const { vericationToken } = req.params;
  const user = await User.findOne({ vericationToken });
  if (!user) {
    throw createError(404);
  }
  await User.findByIdAndUpdate(user._id, { vericationToken: "", verify: true });
  res.json({
    message: "Verification successful",
  });
};

module.exports = verifyEmail;
