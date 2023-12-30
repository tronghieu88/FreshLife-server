const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    img: {
        type: String,
      },
    title: {
      type: String,
    },
    content_short: {
      type: String,
    },
    content: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", blogSchema);
