const mongoose = require("mongoose");
const User = require("./User");
const Post = require("./Post");

const startupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
  },
  staff: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  numUsersPerMonth: [
    {
      type: Number,
    },
  ],
  revenuePerMonth: [
    {
      type: Number,
    },
  ],
  salesPerMonth: [
    {
      type: Number,
    },
  ],
});

const Startup = mongoose.model("Startup", startupSchema);

module.exports = Startup;
