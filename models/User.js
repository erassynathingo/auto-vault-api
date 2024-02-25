const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// Indexes
userSchema.index({ email: 1 }); // Indexing email and username for faster queries

// Pre-save hook to hash password
userSchema.pre("save", async function (next) {
  const user = this;

  // Only hash the password if it has been modified
  if (!user.isModified("password")) return next();

  // Generate a salt and hash the password
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  user.password = await bcrypt.hash(user.password, salt);

  next();
});

// Create and export the User model
const User = mongoose.model("Users", userSchema);
module.exports = User;
