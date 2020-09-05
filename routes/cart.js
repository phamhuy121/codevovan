const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart");

router.get("/", cartController.getCart);
router.post("/", cartController.postCart);

router.post("/edit/:id", cartController.postCart);
router.post("/submit-order", cartController.postSubmitCart);

module.exports = router;
