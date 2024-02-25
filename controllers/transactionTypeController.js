const TransactionType = require("../models/TransactionType");

const transactionTypeController = {
  /**
   * Create a new transaction type.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Object} Response object containing the created transaction type.
   */
  createTransactionType: async (req, res) => {
    try {
      const { name } = req.body;
      const transactionType = new TransactionType({ name });

      // Save transaction type
      const savedTransactionType = await transactionType.save();

      res.status(201).json({
        message: "Transaction type successfully created",
        savedTransactionType,
      });
    } catch (error) {
      console.error("Error creating transaction type:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  /**
   * Retrieve a single transaction type by its ID.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Object} Response object containing the retrieved transaction type.
   */
  getTransactionTypeById: async (req, res) => {
    try {
      const { id } = req.params;
      const transactionType = await TransactionType.findById(id);
      if (!transactionType) {
        return res.status(404).json({ message: "Transaction type not found" });
      }
      res.status(200).json(transactionType);
    } catch (error) {
      console.error("Error retrieving transaction type:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  /**
   * Retrieve all transaction types.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Object} Response object containing all transaction types.
   */
  getAllTransactionTypes: async (req, res) => {
    try {
      const transactionTypes = await TransactionType.find();
      res.status(200).json(transactionTypes);
    } catch (error) {
      console.error("Error retrieving transaction types:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  /**
   * Update a transaction type.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Object} Response object containing the updated transaction type.
   */
  updateTransactionType: async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const updatedTransactionType = await TransactionType.findByIdAndUpdate(
        id,
        updateData,
        {
          new: true,
        }
      );
      if (!updatedTransactionType) {
        return res.status(404).json({ message: "Transaction type not found" });
      }
      res.status(200).json(updatedTransactionType);
    } catch (error) {
      console.error("Error updating transaction type:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  /**
   * Delete a transaction type.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Object} Response object indicating the success or failure of the deletion.
   */
  deleteTransactionType: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedTransactionType = await TransactionType.findByIdAndDelete(
        id
      );
      if (!deletedTransactionType) {
        return res.status(404).json({ message: "Transaction type not found" });
      }
      res
        .status(200)
        .json({ message: "Transaction type deleted successfully" });
    } catch (error) {
      console.error("Error deleting transaction type:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = transactionTypeController;
