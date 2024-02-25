const mongoose = require('mongoose');
const restful = require('node-restful');

const projectSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Project name is required'],
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		status: {
			type: String,
			enum: ['In Progress', 'Completed'],
			required: [true, 'Project status is required'],
		},
	},
	{ timestamps: true }
);

module.exports = restful.model('Projects', projectSchema);
