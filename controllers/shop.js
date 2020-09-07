const Product = require("../models/product.model");
const User = require("../models/user.model");
exports.getShop = async (req, res) => {
  const userId = req.session.userId;
  const user = User.findOne({ _id: userId });
  const products = await Product.find({});
  const isAdmin = req.session.isAdmin;
  res.render("homepage.ejs", {
    products: products,
    isAdmin: isAdmin,
    user: user,
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
