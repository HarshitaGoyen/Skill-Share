const express = require("express");

const {
    getSkills,
    getSkillByName,
    searchSkills
} = require("../controllers/skillController");

const router = express.Router();


// Get all skills
router.get("/", getSkills);


// Search and filter skills
router.get("/search", searchSkills);


// Get skill by name
router.get("/:name", getSkillByName);


module.exports = router;