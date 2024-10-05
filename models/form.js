const mongoose = require('mongoose');

// Data Schema for the form
const formSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
});

// Export the model
const Form = mongoose.model('Form', formSchema);

module.exports = Form;
