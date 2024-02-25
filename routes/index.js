const express = require('express'),
	restful = require('node-restful'),
	mongoose = restful.mongoose;

const router = express.Router();
const userRoutes = require('./userRoutes');
const transactionRoutes = require('./transactionRoutes');
const transactionTypeRoutes = require('./transactionTypeRoutes');

// Define the routes
router.use('/users', userRoutes);
router.use('/transactions', transactionRoutes);
router.use('/transaction-types', transactionTypeRoutes);

module.exports = router;
