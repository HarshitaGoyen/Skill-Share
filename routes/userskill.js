const express = require("express");
const mongoose = require("mongoose");
const UserSkill = require("../models/userskill");

const router = express.Router();

// Add a skill to a user's profile
router.post("/", async (req, res) => {
  try {
    const { userId, skillId, level, type } = req.body;

    if (!userId || !skillId || !level || !type) {
      return res.status(400).json({
        message: "userId, skillId, level and type are required"
      });
    }

    if (
      !mongoose.isValidObjectId(userId) ||
      !mongoose.isValidObjectId(skillId)
    ) {
      return res.status(400).json({ message: "Invalid userId or skillId" });
    }

    const userSkill = await UserSkill.create({
      user: userId,
      skill: skillId,
      level,
      type
    });

    return res.status(201).json({
      message: "User skill added successfully",
      userSkill
    });
  } catch (error) {
    console.error("User skill error:", error.message);
    return res.status(500).json({
      message: "Failed to add user skill. Check model fields."
    });
  }
});

// Get a user's skills
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const skills = await UserSkill.find({ user: userId })
      .populate("skill")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      count: skills.length,
      skills
    });
  } catch (error) {
    console.error("Get user skills:", error.message);
    return res.status(500).json({
      message: "Failed to fetch user skills"
    });
  }
});

module.exports = router;