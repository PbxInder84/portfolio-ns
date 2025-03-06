const express = require('express');
const router = express.Router();
const { getPortfolioItems, addPortfolioItem } = require('../controllers/portfolioController');

// Define routes
router.get('/portfolio', getPortfolioItems);
router.post('/portfolio', addPortfolioItem);

module.exports = router; 