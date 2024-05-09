const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    name: {
      type: String,
      require: true,
      default: "Uncategorized",
    },
    type: {
      type: String,
      enum: ["Income", "Expense"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
exports.default = mongoose.model("Category", categorySchema);
