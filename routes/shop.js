const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shop");

router.get("/", shopController.getShop);
router.get("/login", shopController.getLogin);
router.post("/login", shopController.postLogin);
router.get("/logout", shopController.getLogout);
router.get("/itemSearch/:search", shopController.getSearch);
router.get("/itemSearchType/:search", shopController.getSearchItemType);

module.exports = router;
