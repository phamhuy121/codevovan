const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  user: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      ref: "User",
      required: true,
    },
    email: {
      type: String,
      ref: "User",
      required: true,
    },
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: Number,
      name: String,
      price: Number,
    },
  ],
  modifiedOn: {
    type: Date,
    default: Date.now,
  },
  total: {
    type: Number,
  },
});

module.exports = mongoose.model("Order", orderSchema);
