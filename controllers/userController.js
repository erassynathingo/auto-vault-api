const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SALT_WORK_FACTOR = 10;

const userController = {
  /**
   * Registers a new user.
   *
   * This function checks if the user already exists in the database.
   * If the user does not exist, it creates a new user record in the database
   * and generates a JSON Web Token (JWT) for the user.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Object} Response object containing a message and JWT token.
   */

  registerUser: async (req, res) => {
    try {
      // Check if the user already exists in the database
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res
          .status(409)
          .json({ message: "User already with that email exists" });
      }

      // Hash the user's password
      const hashedPassword = await bcrypt.hash(
        req.body.password,
        SALT_WORK_FACTOR
      );

      // Create a new user record in the database
      const user = new User(req.body);

      const savedUser = await user.save();

      // Generate a JSON Web Token (JWT) for the user
      const token = jwt.sign(
        { userId: savedUser._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      // Send the JWT back to the user in the response
      res.status(201).json({ message: "User successfully registered", token });
    } catch (error) {
      // Handle possible exceptions and errors
      console.error("Error registering user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  /**
   * Handles user login by verifying email and password, generating a JSON Web Token (JWT),
   * and setting an HTTP-only cookie with the token for secure authentication.
   *
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @returns {void}
   */

  loginUser: async (req, res) => {
    try {
      // Retrieve the user from the database
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(401).json({ message: "Invalid email" });
      }
      // Compare the provided password with the hashed password in the database
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return res.status(401).json({ message: "Invalid password" });
      }

      // Generate a JSON Web Token (JWT) if the login is successful
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      //  Sets an HTTP-only cookie with the JWT token for secure authentication.
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        maxAge: 3600000, // Expires in 1 hour
      });

      // Send the JWT back to the user in the response
      res.json({ message: "User logged in successfully", token, user });
    } catch (error) {
      //  Handle login failures and errors
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = userController;
