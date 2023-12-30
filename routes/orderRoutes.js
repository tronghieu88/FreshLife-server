const express = require("express");
const {
  getOrder,
  addOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

const router = express.Router();

router.post("/", getOrder);
router.post("/add", addOrder);
router.patch("/update", updateOrder);
router.delete("/delete/:order_id", deleteOrder);

module.exports = router;
