const {Contact, schemas} = require("../../models/contact");
const { createError } = require("../../helpers");


const addContact = async (req, res, next) => {
  try {
    const { error } = schemas.contactsAddSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}; 

module.exports = addContact;


/* {
    "name": "fghjklk",
    "phone": "063-767-76-67",
    "email": "tuytui@gmail.com",
    "favorite": "true"
} */
