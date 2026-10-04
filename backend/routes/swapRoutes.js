const express = require("express");

const {
    getSwaps,
    getSwapById,
    createSwap,
    updateSwapStatus,
    cancelSwap,
    deleteSwap
} = require("../controllers/swapController");

const router = express.Router();


// Get all swap requests
router.get("/", getSwaps);


// Get swap request by ID
router.get("/:id", getSwapById);


// Create a new swap request
router.post("/", createSwap);


// Accept or reject swap request
router.put("/:id", updateSwapStatus);


// Cancel swap request
router.put("/:id/cancel", cancelSwap);


// Delete swap request
router.delete("/:id", deleteSwap);


module.exports = router;