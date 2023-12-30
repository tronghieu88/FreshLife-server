const express = require("express");
const {
  registerUser,
  currentUser,
  loginUser,
  getUser,
} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");
const errorhander = require("../middleware/errorHandler");
const router = express.Router();

router.use(errorhander);
router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", currentUser);

router.get("/", getUser);
module.exports = router;
