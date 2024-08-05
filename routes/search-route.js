const express = require('express');
const router = express.Router();

// controllers 
const { searchTermController } = require('../controllers/search-controller');

router.get('/' , searchTermController)

module.exports = router