const mongoose = require("mongoose");

const connectDB = async () => {
    console.log("MongoDB URI:", process.env.MONGODB_URI); // Add this line for debugging
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected successfully.");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

module.exports = { connectDB };
