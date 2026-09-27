require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const messageRoutes = require("./routes/messageRoutes");

const app = express();

// =========================
// MIDDLEWARE
// =========================

app.use(cors());
app.use(express.json());


// =========================
// MONGODB CONNECTION
// =========================

mongoose
    .connect(process.env.MONGO_URI)
    .then(function () {
        console.log("MongoDB connected");
    })
    .catch(function (error) {
        console.log("MongoDB error:", error);
    });

// =========================
// HOME ROUTE
// =========================

app.get("/", function (req, res) {
    res.send("Portfolio Backend is running");
});


// =========================
// MESSAGE ROUTES
// =========================

app.use("/messages", messageRoutes);


// =========================
// START SERVER
// =========================

app.listen(3000, function () {
    console.log("Server is running on port 3000");
});