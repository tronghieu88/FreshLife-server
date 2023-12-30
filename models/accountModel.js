const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    imageUrl: {
      type: String,
    },
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: Number,
    },
    gender: {
      type: String,
    },
    birthday: {
      type: Date,
    },
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
// const User = mongoose.model("User", userSchema);

module.exports = mongoose.model("User", userSchema);