const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, phone, birthday, address, gender } =
    req.body;

  if (!username || !password || !phone || !address) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  const userAvailable = await User.findOne({ phone });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered!");
  }

  //Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    phone,
    birthday,
    address,
    gender,
  });

  if (user) {
    return next(res.status(201).json({ _id: user.id, email: user.email }));
  } else {
    // res.status(400);
    // throw new Error("User data is not valid");
    return next(
      // new ErrorResponse(`Người dùng chưa đưang ký.`, 404)
      res.status(400).json({
        success: false,
        message: `User data is not valid`,
      })
    );
  }
  res.json({ message: "Register the user" });
});

//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { phone, password } = req.body;
  console.log(req.body);
  if (!phone || !password) {
    // res.status(400);
    // throw new Error("All fields are mandatory!");
    return res.status(400).json({
      success: false,
      message: `Email or password is empty!`,
    });
    // new ErrorResponse(`Người dùng chưa đưang ký.`, 404)
  }

  const user = await User.findOne({ phone });
  //compare password with hashedpassword
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: process.env.EXPIRES_IN }
    );
    return res.status(200).json({ success: true, userLogin: user });
  } else {
    // res.status(401);
    // res.status(401).json();
    // throw new Error("email or password is not valid");
    return res.status(404).json({
      success: false,
      message: `Email or password is not valid!`,
    });
    // new ErrorResponse(`Người dùng chưa đưang ký.`, 404)
  }
});

//@desc Current user info
//@route POST /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

const getUser = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json({ users });
});

module.exports = { registerUser, loginUser, currentUser, getUser };
