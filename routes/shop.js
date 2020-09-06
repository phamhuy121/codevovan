const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shop");

router.get("/", shopController.getShop);
router.get("/login", shopController.getLogin);
router.post("/login", shopController.postLogin);
router.get("/logout", shopController.getLogout);

module.exports = router;
