const { Contact } = require("../../models/contact");

const listContacts = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { page = 1, limit = 20 } = req.query;
    const result = await Contact.find(
      { owner },
      { skip: 0, limit: 20 }
    ).populate("owner", "email name");
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = listContacts;
