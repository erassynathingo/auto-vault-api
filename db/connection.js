const mongoose = require('mongoose');

const connectDB = (url) => {
	mongoose
		.connect(url, {
			dbName: 'AutoVault',
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => console.log('MongoDB Connected'))
		.catch((error) => console.error('MongoDB Connection Error:', error));
};

module.exports = connectDB;
