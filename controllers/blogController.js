const asyncHandler = require("express-async-handler");
const Blog = require("../models/blogModel");

const getBlog = asyncHandler(async (req, res) => {
  // Không cần kiểm tra điều kiện is_new và type
  const blogs = await Blog.find({});
  res.status(200).json({ blogs });
});

module.exports = { getBlog };
