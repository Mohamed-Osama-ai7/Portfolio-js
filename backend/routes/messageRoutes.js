const express = require("express");
const Message = require("../models/Message");

const router = express.Router();


// =========================
// CREATE MESSAGE
// POST /messages
// =========================

router.post("/", async function (req, res) {
    try {

        const newMessage = new Message({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        });

        const savedMessage = await newMessage.save();

        res.status(201).json({
            message: "Message saved successfully",
            data: savedMessage
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to save message",
            error: error.message
        });

    }
});


// =========================
// GET ALL MESSAGES
// GET /messages
// =========================

router.get("/", async function (req, res) {
    try {

        const messages = await Message.find();

        res.status(200).json(messages);

    } catch (error) {

        res.status(500).json({
            message: "Failed to get messages",
            error: error.message
        });

    }
});


module.exports = router;