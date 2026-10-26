
const express = require("express");
const mongoose = require("mongoose");
const SwapRequest = require("../models/swaprequest");

const router = express.Router();

// Create swap request
router.post("/", async (req, res) => {
  try {
    const { requester, receiver, offeredSkill, requestedSkill, message } = req.body;

    if (!requester || !receiver || !offeredSkill || !requestedSkill) {
      return res.status(400).json({
        message: "requester, receiver, offeredSkill and requestedSkill are required"
      });
    }

    const ids = [requester, receiver, offeredSkill, requestedSkill];

    if (!ids.every(id => mongoose.isValidObjectId(id))) {
      return res.status(400).json({ message: "Invalid ID provided" });
    }

    if (requester === receiver) {
      return res.status(400).json({
        message: "You cannot request a swap with yourself"
      });
    }

    const swap = await SwapRequest.create({
      requester,
      receiver,
      offeredSkill,
      requestedSkill,
      message: message || ""
    });

    return res.status(201).json({
      message: "Swap request created successfully",
      swap
    });
  } catch (error) {
    console.error("Create swap request:", error.message);
    return res.status(500).json({
      message: "Failed to create swap request. Check model fields."
    });
  }
});

// Get swap requests for a user
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const swaps = await SwapRequest.find({
      $or: [{ requester: userId }, { receiver: userId }]
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      count: swaps.length,
      swaps
    });
  } catch (error) {
    console.error("Fetch swap requests:", error.message);
    return res.status(500).json({
      message: "Failed to fetch swap requests"
    });
  }
});

// Accept or reject a swap request
router.patch("/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid swap request ID" });
    }

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({
        message: "Status must be accepted or rejected"
      });
    }

    const swap = await SwapRequest.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true, runValidators: true }
    );

    if (!swap) {
      return res.status(404).json({ message: "Swap request not found" });
    }

    return res.status(200).json({
      message: "Swap request updated",
      swap
    });
  } catch (error) {
    console.error("Update swap request:", error.message);
    return res.status(500).json({
      message: "Failed to update swap request"
    });
  }
});

module.exports = router;