const Product = require("../models/product.model");
exports.getShop = async (req, res) => {
  const products = await Product.find({});
  res.render("homepage.ejs", { products: products });
};
