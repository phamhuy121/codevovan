const Cart = require("../models/cart.model");
const Order = require("../models/order.model");
const { use } = require("../routes/cart");
const User = require("../models/user.model");

exports.getCart = async (req, res) => {
  const userId = req.session.userId; //logged in user ID
  console.log(userId);
  const cart = await Cart.findOne({ userId: userId }); //fetch the cart of the user
  //if the cart exist, render the information of the cart
  if (cart) {
    const products = cart.products; // get all the product in the cart
    // cal the total of the bill
    let total = 0;
    products.forEach((product) => {
      total += product.price * product.quantity;
    });
    res.render("cart.ejs", { cart: cart, products: products, total: total });
  }
  //if not, throw an error to user
  else {
    res.render("cart-not-found.ejs");
  }
};

exports.postCart = async (req, res) => {
  const userId = req.session.userId; //logged in user ID
  //if user not logged in
  if (!req.session.userId) {
    res.redirect("/cart");
  }
  // find the cart for the user Id
  let cart = await Cart.findOne({ userId: userId });
  // Check if the cart exists for user
  if (cart) {
    // Check if the product exists in the cart, if not, the findIndex method will return -1
    let itemIndex = cart.products.findIndex(
      (product) => product.productId == req.body.productId
    );
    if (itemIndex > -1) {
      //if product exists in the cart, update the quantity
      //if the quantity less than 0, delete that product from the cart
      if (req.body.quantity <= 0) {
        cart.products.splice(itemIndex, 1); //Delete item that has index = itemIndex
      } else {
        //if the quantity larger than 0, update the quantity of that product
        let productItem = cart.products[itemIndex]; //Find index of the product
        productItem.quantity = req.body.quantity; //Change its quantity
        cart.products[itemIndex] = productItem; //Save that product
      }
    } else {
      //if product not exists in the cart, add new item
      cart.products.push({
        productId: req.body.productId,
        quantity: req.body.quantity,
        name: req.body.name,
        price: req.body.price,
      });
    }
    //Save the cart to the database after change it
    await cart.save();
    return res.redirect("/cart");
  } else {
    // If the cart is not exists for the user, then create a new one
    const newCart = await Cart.create({
      userId: userId,
      products: [
        {
          productId: req.body.productId,
          price: req.body.price,
          name: req.body.name,
          quantity: req.body.quantity,
        },
      ],
    });
    return res.redirect("/cart");
  }
};

exports.postSubmitCart = async (req, res) => {
  const userCart = await Cart.findOne({ _id: req.body.cartId });
  const userId = userCart.userId;
  const userInfo = await User.findOne({ _id: userId });
  let total = 0;
  userCart.products.forEach((product) => {
    total += product.price * product.quantity;
  });
  const newOrder = new Order({
    user: {
      userId: userInfo._id,
      name: userInfo.name,
      email: userInfo.email,
    },
    products: userCart.products,
    total: total,
  });
  await newOrder.save();
  res.render("submit-order-success.ejs");
};
