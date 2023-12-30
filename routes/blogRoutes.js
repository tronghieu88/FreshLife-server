const express = require("express");
const {
  getBlog
} = require("../controllers/blogController");

const router = express.Router();

router.get("/", getBlog);

module.exports = router;
