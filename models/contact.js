const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactsAddSchema = Joi.object({
  phone: Joi.string()
    .regex(/^[0-9\d-]{3,10}$/)
    .required(),
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().lowercase().required(),
  favorite: Joi.boolean(),
});

const updateFavorite = Joi.object({
  favorite: Joi.bool().required(),
});

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const schemas = {
  contactsAddSchema,
  updateFavorite,
};

const Contact = model("contact", contactSchema);
module.exports = {
  Contact,
  schemas,
};
