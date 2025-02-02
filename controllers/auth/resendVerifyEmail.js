const {User} = require("../../models/user")

const {createError, sendMail} = require("../../helpers")

const resendVerifyEmail = async (req, res) =>{
    const {email} = req.body;
    const user = await User.findOne({email})
    if(!user){
        throw createError(404)
    }
    if(user.verify){
        throw createError(400, "Verification has already been passed")
    }
    const mail = {
    to:"email",
    subject:"Підтвердження реєстрації на сайті",
    html: `<a href="localhost:3000/api/auth/verify/${user.verificationToken}">Натисніть для підтвердження email</a>`
  }
  await sendMail(mail)
  res.json({
    message: "Verification email sent"
  })
}

module.exports = resendVerifyEmail;