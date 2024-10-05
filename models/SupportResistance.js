const mongoose = require("mongoose");

const SupportResistanceSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        required: true,
    },
    y: {
        type: Number,
        required: true,
    },
    y2: {
        type: Number,
        required: true,
    },
    imptext: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['support', 'resistance'], // Specify allowed values for type
        required: true,
    },
    index: {
        type: String,
        enum: ['nifty50', 'sensex', 'midcapselect50', 'finnifty', 'banknifty'], // Allowed indices
        required: true,
    }
}, { timestamps: true }); // Automatically manage createdAt and updatedAt fields

module.exports = mongoose.model("SupportResistance", SupportResistanceSchema);
