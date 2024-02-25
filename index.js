const express = require('express');
const bodyParser = require('body-parser');
const requestLogger = require('./middlewares/requestLogger');
const routes = require('./routes');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv/config');
const app = express();

const connectDB = require('./db/connection');

// Middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(requestLogger);
app.use(express.json());
app.use(helmet()); // set HTTP headers for security

//Routes
app
	.use('/api', (req, res)=>{
		res.status(200).json({
			message: 'Auto-Vault API'
		})
	})
	.use('/api', routes)
	.use('/api', require('./routes/fileRoutes'))
	.use('/api', require('./routes/projectRoutes'));

const PORT = process.env.PORT || 3001;

const startServer = async () => {
	try {
		//mongodb server connection
		connectDB(process.env.MONGODB_URL);

		// Start server
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	} catch (error) {
		console.log(error);
	}
};

startServer();
