const Form = require('../models/form'); // Import the Form model

// Controller to handle form submission
const submitForm = async (req, res) => {
    const { name, email, phone, address } = req.body;
    // Validate required fields
    if (!name || !email || !phone || !address) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        // Create a new form instance
        const newForm = new Form({ name, email, phone, address });
        // Save the form data to the database
        await newForm.save();
        // Return success response
        res.status(202).json({ message: 'Form data saved successfully!' });
    } catch (error) {
        // Handle any errors
        res.status(500).json({ message: 'Error saving form data', error });
    }
};

module.exports = {
    submitForm,
};
