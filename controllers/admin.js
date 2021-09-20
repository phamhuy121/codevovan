const Product = require("../models/product.model");
const Order = require("../models/order.model");
const User = require("../models/user.model");
const Type = require("../models/type.model");

exports.getAdminRoute = (req, res) => {
  if (req.session.isAdmin == true) {
    
    res.render("admin/admin.ejs");
  } else {
    res.render("auth/auth-error.ejs");
  }
};

exports.getAddProduct = async (req, res) => {
  if (req.session.isAdmin == true) {
    let allProductType = await Type.find({});
    res.render("admin/add-product.ejs", { types: allProductType });
  } else {
    res.render("auth/auth-error.ejs");
  }
};

exports.postAddProduct = async (req, res) => {
  if (req.session.isAdmin == true) {
    const product = new Product({
      title: req.body.title,
      price: req.body.price,
      type: req.body.type,
      imgURL: req.body.imgURL,
    });
    await product.save();
    res.redirect("/admin");
  } else {
    res.render("auth/auth-error.ejs");
  }
};

exports.getUpdateProduct = async (req, res) => {
  if (req.session.isAdmin == true) {
    const products = await Product.find({});
    res.render("admin/update-product.ejs", { products: products });
  } else {
    res.render("auth/auth-error.ejs");
  }
};

exports.getUpdateProductId = async (req, res) => {
  if (req.session.isAdmin == true) {
    const product = await Product.findById({ _id: req.params.id });
    res.render("admin/update-product-form.ejs", { product: product });
  } else {
    res.render("auth/auth-error.ejs");
  }
};

exports.postUpdateProductId = async (req, res) => {
  if (req.session.isAdmin == true) {
    const product = await Product.findById(req.params.id);
    product.title = req.body.title;
    product.price = req.body.price;
    product.type = req.body.type;
    product.imgURL = req.body.imgURL;

    await product.save();
    res.redirect("/admin");
  } else {
    res.render("auth/auth-error.ejs");
  }
};

exports.getDeleteProduct = async (req, res) => {
  if (req.session.isAdmin == true) {
    const products = await Product.find({});
    res.render("admin/delete-product.ejs", { products: products });
  } else {
    res.render("auth/auth-error.ejs");
  }
};

exports.deleteProduct = async (req, res) => {
  if (req.session.isAdmin == true) {
    const product = await Product.findById({ _id: req.params.id });
    await product.remove();
    res.redirect("/admin/delete-product");
  } else {
    res.render("auth/auth-error.ejs");
  }
};

exports.getOrder = async (req, res) => {
  if (req.session.isAdmin == true) {
    const orders = await Order.find();
    const products = orders.products;
    res.render("admin/view-orders.ejs", { orders: orders, products: products });
  } else {
    res.render("auth/auth-error.ejs");
  }
};

exports.deleteOrder = async (req, res) => {
  if (req.session.isAdmin == true) {
    await Order.findByIdAndDelete({ _id: req.body.orderId });
    res.redirect("/admin/get-orders");
  } else {
    res.render("auth/auth-error.ejs");
  }
};
