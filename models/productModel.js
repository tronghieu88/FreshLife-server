const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    type: {
      type: String,
    },
    name: {
      type: String,
    },
    image_1: {
      type: String,
    },
    image_2: {
      type: String,
    },
    image_3: {
      type: String,
    },
    is_new: {
      type: String,
    },
    descption: {
      type: String,
    },
    price: {
      type: Number,
    },
    sale_price: {
      type: Number,
    },
    quantity: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
