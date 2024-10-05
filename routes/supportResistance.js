const express = require('express');
const router = express.Router();
const { createSupportResistance, deleteSupportResistance, getSupportResistance } = require('../controllers/SupportResistanceController');

// Route to create a new support/resistance level (POST)
router.post('/', createSupportResistance);

// Route to get all support/resistance levels for a specific index (GET)
router.get('/:index', getSupportResistance);

router.delete('/:id', deleteSupportResistance);

module.exports = router;
