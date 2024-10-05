const express = require('express');
const { submitForm } = require('../controllers/formData'); // Import the submitForm controller

const router = express.Router();

// POST route to handle form submissions
router.post('/submit', submitForm);

module.exports = router;
