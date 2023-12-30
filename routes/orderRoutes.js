const express = require("express");
const {
  getOrder,
  addOrder,
  updateOrder,
  deleteOrder
} = require("../controllers/orderController");

const router = express.Router();

router.get("/:user_id", getOrder);
router.post("/add", addOrder);
router.put("/update", updateOrder);
router.delete("/delete/:order_id", deleteOrder);

module.exports = router;
