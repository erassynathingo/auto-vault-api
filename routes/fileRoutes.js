const express = require('express');
const router = express.Router();

const FileModel = require('../models/File');



FileModel.methods(['get', 'put', 'delete', 'post']);
FileModel.register(router, '/files');
module.exports = router;