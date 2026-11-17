
const express = require("express");
const mongoose = require("mongoose");
const Skill = require("../models/skill");

const router = express.Router();

// Create a skill
router.post("/", async (req, res) => {
  try {
    const { name, description, category, createdBy } = req.body;

    if (!name || !category || !createdBy) {
      return res.status(400).json({
        message: "Name, category and createdBy are required"
      });
    }

    if (!mongoose.isValidObjectId(createdBy)) {
      return res.status(400).json({
        message: "Invalid createdBy user ID"
      });
    }

    const skill = await Skill.create({
      name,
      description: description || "",
      category,
      createdBy
    });

    return res.status(201).json({
      message: "Skill created successfully",
      skill
    });
  } catch (error) {
    console.error("Create skill:", error.message);
    return res.status(500).json({
      message: "Failed to create skill"
    });
  }
});

// Get all skills + search + category filter
router.get("/", async (req, res) => {
  try {
    const { search, category } = req.query;
    const filter = {};

    if (search && search.trim()) {
      filter.$or = [
        { name: { $regex: search.trim(), $options: "i" } },
        { description: { $regex: search.trim(), $options: "i" } }
      ];
    }

    if (category && category.trim()) {
      filter.category = {
        $regex: `^${category.trim()}$`,
        $options: "i"
      };
    }

    const skills = await Skill.find(filter)
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 })
      .limit(100);

    return res.status(200).json({
      count: skills.length,
      skills
    });
  } catch (error) {
    console.error("Fetch skills:", error.message);
    return res.status(500).json({
      message: "Failed to fetch skills"
    });
  }
});

// Get one skill by ID
router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid skill ID" });
    }

    const skill = await Skill.findById(req.params.id)
      .populate("createdBy", "name email");

    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    return res.status(200).json({ skill });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch skill" });
  }
});

module.exports = router;