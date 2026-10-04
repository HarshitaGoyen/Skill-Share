require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const skillRoutes = require("./routes/skillRoutes");
const swapRoutes = require("./routes/swapRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Home route
app.get("/", (req, res) => {
    res.json({
        message: "Skill Swap Hub Backend is running!"
    });
});


// User routes
app.use("/api/users", userRoutes);


// Skill routes
app.use("/api/skills", skillRoutes);


// Swap routes
app.use("/api/swaps", swapRoutes);


// Authentication routes
app.use("/api/auth", authRoutes);


// Start server
const PORT = 5000;

const startServer = () => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
};

startServer();