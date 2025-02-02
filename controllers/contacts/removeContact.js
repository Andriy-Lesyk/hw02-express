const {Contact} = require("../../models/contact");
const { createError } = require("../../helpers");

const removeContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndRemove(id);
    if (!result) {
      throw createError(404);
    }
    res.json({
      message: "Contact deleted",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = removeContact;
