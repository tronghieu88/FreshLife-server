const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Product = require("../models/productModel");

const getProduct = asyncHandler(async (req, res) => {
  const { type, is_new } = req.query;
	const query = {};
	if (type && type != '') {
		query['type'] = type;
	}

	if (is_new && is_new != '') {
		query['is_new'] = is_new;
	}

	const products = await Product.find(query);
	res.status(200).json({ products });
});

module.exports = { getProduct };
