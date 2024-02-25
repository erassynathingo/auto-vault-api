const restful = require('node-restful');
const mongoose = restful.mongoose;

const fileSchema = new mongoose.Schema(
  {
    transaction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
      required: true,
    },
    name: {
      type: String,
      required: [true, "File name is required"],
    },
    type: {
      type: String,
      default: "",
    },
    size: {
      type: Number,
    },
    category: {
      type: String,
      enum: ["Category1", "Category2", "Category3"],
    },
    url: {
      type: String,
      required: [true, "File URL is required"],
    },
  },
  { timestamps: true }
);
module.exports = restful.model('File', fileSchema);
