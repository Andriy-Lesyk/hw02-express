const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const idGenerate =require("bson-objectid")

const { User } = require("../../models/user");

const { createError, sendMail } = require("../../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = idGenerate();
  const result = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken
  });
  const mail = {
    to:"email",
    subject:"Підтвердження реєстрації на сайті",
    html: `<a href="localhost:3000/api/auth/verify/${verificationToken}">Натисніть для підтвердження email</a>`
  }
  await sendMail(mail)
  res.status(201).json({
    user: {
      email: result.email,
      name: result.name,
    },
  });
};

module.exports = register;
