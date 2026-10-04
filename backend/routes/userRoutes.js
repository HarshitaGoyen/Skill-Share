const express = require("express");

const {
    getUsers,
    getUserById,
    updateUser,
    getMatches
} = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getUsers);

router.get("/:id/matches", getMatches);

router.get("/:id", getUserById);

// Protected route
router.put("/:id", authMiddleware, updateUser);

module.exports = router;