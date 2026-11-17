
const express = require("express");
const mongoose = require("mongoose");
const UserSkill = require("../models/userskill");

const router = express.Router();

// Add a skill to a user's profile
router.post("/", async (req, res) => {
  try {
    const { userId, skillId, proficiency, type } = req.body;

    if (!userId || !skillId || !type) {
      return res.status(400).json({
        message: "userId, skillId and type are required"
      });
    }

    if (!mongoose.isValidObjectId(userId) ||
        !mongoose.isValidObjectId(skillId)) {
      return res.status(400).json({
        message: "Invalid userId or skillId"
      });
    }

    const userSkill = await UserSkill.create({
      user: userId,
      skill: skillId,
      proficiency: proficiency || "beginner",
      type
    });

    res.status(201).json({
      message: "User skill added successfully",
      userSkill
    });

  } catch (error) {
    console.error("User skill error:", error.message);
    res.status(500).json({
      message: "Failed to add user skill"
    });
  }
});

// Get a user's skills
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({
        message: "Invalid user ID"
      });
    }

    const skills = await UserSkill.find({ user: userId })
      .populate("skill")
      .sort({ createdAt: -1 });

    res.json({
      count: skills.length,
      skills
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch user skills"
    });
  }
});

module.exports = router;
