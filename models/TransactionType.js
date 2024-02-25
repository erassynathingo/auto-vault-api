const mongoose = require("mongoose");

const transactionTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Transaction type name is required"],
    },
  },
  { timestamps: true }
);

const TransactionType = mongoose.model(
  "TransactionType",
  transactionTypeSchema
);

module.exports = TransactionType;
