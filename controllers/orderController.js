const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Order = require("../models/orderModel");
const ObjectId = require("mongoose").Types.ObjectId;

const getOrder = asyncHandler(async (req, res) => {
  const { user_id } = req.body;
  //   console.log(user_id);

  if (!user_id) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  if (!ObjectId.isValid(user_id)) {
    res.status(404);
    throw new Error("Order not found");
  }

  const orders = await getUserOrder(user_id);
  res.status(200).json({ orders });
});

// lay  nhung order co user_id
const getUserOrder = async (user_id) => {
  //   console.log(user_id);
  //
  const result = await Order.find({
    user_id: user_id,
    status: "cart",
  }).populate("product_id");
  return result;
};

const addOrder = asyncHandler(async (req, res) => {
  // lay gia tri tu request
  const { user_id, product_id, quantity } = req.body;

  // so sanh dieu kien
  if (!user_id || !product_id || !quantity || quantity <= 0) {
    // tra ve loi cho client
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  // 	if (!ObjectId.isValid(user_id)) {
  //     res.status(404);
  //     throw new Error("User not found");
  //   }

  // lay cac order theo user_id, product_id
  const order = await Order.findOne({
    user_id: user_id,
    status: "cart",
    product_id: product_id,
  });
  // neu order da co san
  if (order) {
    order.quantity += quantity;
    // order.quantity = order.quantity + quantity;
    await order.save();
  } else {
    // tao order moi trong mongo
    await Order.create({
      user_id,
      product_id,
      quantity,
      status: "cart",
    });
  }

  const orders = await getUserOrder(user_id);
  res.status(200).json({ orders });
});

const updateOrder = asyncHandler(async (req, res) => {
  const { order_id, quantity } = req.body;
  console.log(order_id, quantity);

  //   if (!order_id || !quantity || quantity <= 0) {
  //     res.status(400);
  //     throw new Error("All fields are mandatory!");
  //   }

  if (!ObjectId.isValid(order_id)) {
    res.status(404);
    throw new Error("Order not found");
  }

  const order = await Order.findById(order_id);
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  order.quantity = order.quantity + quantity;
  await order.save();

  const orders = await getUserOrder(order.user_id);
  res.status(200).json({ orders });
});

const deleteOrder = asyncHandler(async (req, res) => {
  const { order_id } = req.params;

  if (!order_id) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  if (!ObjectId.isValid(order_id)) {
    res.status(404);
    throw new Error("Order not found");
  }

  const order = await Order.findById(order_id);
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  await order.delete();
  const orders = await getUserOrder(order.user_id);
  res.status(200).json({ orders });
});

module.exports = { getOrder, addOrder, updateOrder, deleteOrder };
