const SupportResistance = require('../models/SupportResistance');

// Create a new support/resistance level
const createSupportResistance = async (req, res) => {
    const { index, y, y2, imptext, timestamp, type } = req.body; // Extract all fields from the request body

    try {
        // Create a new document with the provided data
        const newSupportResistance = new SupportResistance({
            index,      // Use index from the request body
            timestamp,
            y,          // Assign y from the request body
            y2,
            imptext,
            type
        });

        // Save the new document to the database
        await newSupportResistance.save();

        // Return success response
        return res.status(201).json({ message: 'Support/Resistance created successfully!', newSupportResistance });
    } catch (error) {
        // Return error response in case of any issues
        return res.status(500).json({ message: 'Server error', error });
    }
};

// Delete a specific support/resistance level by ID
const deleteSupportResistance = async (req, res) => {
    const { id } = req.params; // Extract the ID from URL parameters
    console.log("Attempting to delete Support/Resistance with ID:", id); // Log the ID

    try {
        const deletedSupportResistance = await SupportResistance.findByIdAndDelete(id);

        if (!deletedSupportResistance) {
            console.log("No document found with ID:", id); // Log if no document found
            return res.status(404).json({ message: 'Support/Resistance not found' });
        }

        return res.status(200).json({ message: 'Support/Resistance deleted successfully!' });
    } catch (error) {
        console.error("Error during deletion:", error); // Log any error
        return res.status(500).json({ message: 'Server error', error });
    }
};


// Get all support/resistance levels for a specific index (sensex, nifty50, etc.)
const getSupportResistance = async (req, res) => {
    const { index } = req.params; // Extract the index type from URL parameter

    try {
        // Fetch support/resistance levels for the specific index
        const supportResistanceLevels = await SupportResistance.find({ index });

        // Return success response with the fetched data
        return res.status(200).json(supportResistanceLevels);
    } catch (error) {
        // Return error response in case of any issues
        return res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = { createSupportResistance, deleteSupportResistance, getSupportResistance };
