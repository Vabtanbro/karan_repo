const express = require("express");
const { connectDB } = require("./config/database"); // Ensure correct import
const app = express();

const userRoutes = require("./routes/auth");
const supportResistanceRoutes = require("./routes/supportResistance");
const formRoutes = require('./routes/formroute'); // Import form routes

const cookieParser = require("cookie-parser");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 4000;

// Database connection
connectDB();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/support-resistance", supportResistanceRoutes);
app.use('/api', formRoutes);

// Default route
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your server is up and running....",
    });
});

app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
});
