const express = require("express");
const router = express.Router();
const cntr = require("../../controllers/contacts");
const {authenticate} = require("../../middlewares")

router.get("/", cntr.listContacts);

router.get("/:id", cntr.getContactById);

router.post("/", authenticate, cntr.addContact);

router.delete("/:id", cntr.removeContact);

router.put("/:id", cntr.updateContact);

router.patch("/:id/favorite", cntr.updateFavorite )

module.exports = router;
