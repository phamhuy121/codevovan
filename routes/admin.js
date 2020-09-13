const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");

router.get("/", adminController.getAdminRoute);

router.get("/add-product", adminController.getAddProduct);

router.post("/add-product", adminController.postAddProduct);

router.get("/update-product", adminController.getUpdateProduct);

router.get("/update-product/:id", adminController.getUpdateProductId);

router.put("/update-product/:id", adminController.postUpdateProductId);

router.get("/delete-product", adminController.getDeleteProduct);

router.delete("/delete-product/:id", adminController.deleteProduct);

router.get("/get-orders", adminController.getOrder);
router.post("/delete-order/", adminController.deleteOrder);

module.exports = router;
