const express = require('express');
const router = express.Router();

const ProjectModel = require('../models/Project');

ProjectModel.methods(['get', 'put', 'delete', 'post']);
ProjectModel.register(router, '/projects');
module.exports = router;
