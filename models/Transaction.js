const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TransactionType",
      required: true,
    },
    notes: {
      type: String,
      default: "",
    },
    amount: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
