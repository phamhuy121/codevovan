const Product = require("../models/product.model");
const User = require("../models/user.model");
const Type = require("../models/type.model");
const { Types } = require("mongoose");
exports.getShop = async (req, res) => {
  const types = await Type.find({});
  const userId = req.session.userId;
  const user = await User.findOne({ _id: userId });
  const products = await Product.find({});
  const isAdmin = req.session.isAdmin;
  console.log(user);
  res.render("homepage.ejs", {
    products: products,
    isAdmin: isAdmin,
    user: user,
    userId: userId,
    types: types,
  });
};

exports.getLogin = (req, res) => {
  res.render("auth/login.ejs");
};

exports.postLogin = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const inputPassword = req.body.password;
  // if user exist then check the input password
  if (user) {
    // if the password correct, log the user in using session and back to the homepage
    if (user.password == inputPassword) {
      req.session.userId = user._id;
      req.session.isAdmin = user.isAdmin;
      res.redirect("/");
    } else {
      res.send("Password Incorrect");
    }
  } else {
    res.send("Failed to login, try again");
  }
};

exports.getLogout = (req, res) => {
  req.session.destroy();
  res.redirect("/");
};

exports.getSearch = async (req, res) => {
  const searchInput = req.params.search;
  console.log(searchInput);
  const userId = req.session.userId;
  const user = await User.findOne({ _id: userId });
  const products = await Product.find({
    title: { $regex: ".*" + searchInput + ".*" },
  });
  console.log(products);
  console.log(user);
  res.render("homepage.ejs", {
    products: products,
    user: user,
    userId: userId,
  });
};

exports.getSearchItemType = async (req, res) => {
  const searchItemType = req.params.search;
  const userId = req.session.userId;
  const user = await User.findOne({ _id: userId });
  const products = await Product.find({
    type: searchItemType,
  });
  const types = await Type.find({});  
  res.render("homepage.ejs", {
    products: products,
    user: user,
    userId: userId,
    types: types,
  });
};
