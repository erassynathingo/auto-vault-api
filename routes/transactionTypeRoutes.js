const express = require("express");
const router = express.Router();
const transactionTypeController = require("../controllers/transactionTypeController");

// Define routes for transaction types
router.post("/create-transaction-type", transactionTypeController.createTransactionType);
router.get("/:id", transactionTypeController.getTransactionTypeById);
router.get("/", transactionTypeController.getAllTransactionTypes);
router.put("/:id", transactionTypeController.updateTransactionType);
router.delete("/:id", transactionTypeController.deleteTransactionType);

module.exports = router;
