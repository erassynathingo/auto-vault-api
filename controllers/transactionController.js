const Transaction = require("../models/Transaction");
const User = require("../models/User");
const Project = require("../models/Project");
const TransactionType = require("../models/TransactionType");

const transactionController = {
  /**
   * Create a new transaction.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Object} Response object containing the created transaction.
   */
  createTransaction: async (req, res) => {
    try {
      const { user, project, type, notes, amount } = req.body;

      // Check if user exists
      const userExists = await User.findById(user);
      if (!userExists) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check if project exists
      const projectExists = await Project.findById(project);
      if (!projectExists) {
        return res.status(404).json({ message: "Project not found" });
      }

      // Check if transaction type exists
      const transactionTypeExists = await TransactionType.findById(type);
      if (!transactionTypeExists) {
        return res.status(404).json({ message: "Transaction type not found" });
      }

      // Create a new transaction
      const transaction = new Transaction({
        user,
        project,
        type,
        notes,
        amount,
      });

      // Save the transaction
      const savedTransaction = await transaction.save();

      res.status(201).json({
        message: "Transaction successfully created",
        savedTransaction,
      });
    } catch (error) {
      console.error("Error creating transaction:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  /**
   * Retrieve a single transaction by its ID.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Object} Response object containing the retrieved transaction.
   */
  getTransactionById: async (req, res) => {
    try {
      const { id } = req.params;
      const transaction = await Transaction.findById(id);
      if (!transaction) {
        return res.status(404).json({ message: "Transaction not found" });
      }
      res.status(200).json(transaction);
    } catch (error) {
      console.error("Error retrieving transaction:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  /**
   * Retrieve all transactions.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Object} Response object containing all transactions.
   */
  getAllTransactions: async (req, res) => {
    try {
      const transactions = await Transaction.find();
      res.status(200).json(transactions);
    } catch (error) {
      console.error("Error retrieving transactions:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  /**
   * Update a transaction.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Object} Response object containing the updated transaction.
   */
  updateTransaction: async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const updatedTransaction = await Transaction.findByIdAndUpdate(
        id,
        updateData,
        {
          new: true,
        }
      );
      if (!updatedTransaction) {
        return res.status(404).json({ message: "Transaction not found" });
      }
      res.status(200).json(updatedTransaction);
    } catch (error) {
      console.error("Error updating transaction:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  /**
   * Delete a transaction.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Object} Response object indicating the success or failure of the deletion.
   */
  deleteTransaction: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedTransaction = await Transaction.findByIdAndDelete(id);
      if (!deletedTransaction) {
        return res.status(404).json({ message: "Transaction not found" });
      }
      res.status(200).json({ message: "Transaction deleted successfully" });
    } catch (error) {
      console.error("Error deleting transaction:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = transactionController;
