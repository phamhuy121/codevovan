const express = require("express");
const router = express.Router();
const typeController = require("../controllers/type");

router.get("/", typeController.getType);
router.post("/", typeController.postType);
// router.put("/", typeController.putType);
// router.post("/edit/:id", TypeController.postType);

module.exports = router;
