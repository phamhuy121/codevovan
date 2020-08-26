const Cart = require("../models/cart.model");
const { PromiseProvider } = require("mongoose");

exports.getCart = async (req, res) => {
  const userId = "5f44e940c4cfd52b0fa68568"; //logged in user ID
  const cart = await Cart.findOne({ userId: userId }); //fetch the cart of the user
  const products = cart.products; // get all the product in the cart
  // cal the total of the bill
  let total = 0;
  products.forEach((product) => {
    total += product.price * product.quantity;
  });
  // const total = products.reduce((prevProduct, nextProduct) => {
  //   return (
  //     parseFloat(prevProduct.price) * parseInt(prevProduct.quantity) +
  //     parseFloat(nextProduct.price) * parseInt(nextProduct.quantity)
  //   );
  // });
  // const test = products.forEach((product) => {
  //   console.log(typeof product.price);
  //   console.log(typeof product.quantity);
  // });
  // console.log(products);
  // console.log(total);
  res.render("cart.ejs", { cart: cart, products: products, total: total });
};

exports.postCart = async (req, res) => {
  const userId = "5f44e940c4cfd52b0fa68568"; //logged in user ID
  // find the cart for the user Id
  let cart = await Cart.findOne({ userId: userId });
  // console.log(cart);
  // Check if the cart exists for user
  if (cart) {
    // Check if the product exists in the cart, if not, the findIndex method will return -1
    let itemIndex = cart.products.findIndex(
      (product) => product.productId == req.body.productId
    );
    if (itemIndex > -1) {
      //if product exists in the cart, update the quantity
      let productItem = cart.products[itemIndex]; //Find index of the product
      productItem.quantity = req.body.quantity; //Change its quantity
      cart.products[itemIndex] = productItem; //Save that product
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
    return res.status(201).send(cart);
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
    return res.status(201).send(newCart);
  }
  // Check if product exists in the cart, if not, the findIndex method will return -1
  // If product exists in the cart (!== -1), then update the quantity
  // If product not exists in the cart, add new item to cart
};
