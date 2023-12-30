const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    birthday: {
      type: String,
    },
    gender: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
