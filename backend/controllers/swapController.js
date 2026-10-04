let swaps = [
    {
        id: 1,
        sender: 1,
        receiver: 2,
        skillOffered: "Java",
        skillWanted: "React",
        message: "I can teach you Java if you can teach me React.",
        status: "pending"
    }
];


// Get all swap requests
const getSwaps = (req, res) => {
    res.json(swaps);
};


// Get swap request by ID
const getSwapById = (req, res) => {
    const id = parseInt(req.params.id);

    const swap = swaps.find(swap => swap.id === id);

    if (!swap) {
        return res.status(404).json({
            message: "Swap request not found"
        });
    }

    res.json(swap);
};


// Create a new swap request
const createSwap = (req, res) => {
    const {
        sender,
        receiver,
        skillOffered,
        skillWanted,
        message
    } = req.body;


    // Check required fields
    if (
        sender === undefined ||
        receiver === undefined ||
        !skillOffered ||
        !skillWanted
    ) {
        return res.status(400).json({
            message: "Sender, receiver, skill offered and skill wanted are required"
        });
    }


    // Sender and receiver cannot be the same
    if (sender === receiver) {
        return res.status(400).json({
            message: "Sender and receiver cannot be the same user"
        });
    }


    const newSwap = {
        id: swaps.length + 1,
        sender,
        receiver,
        skillOffered,
        skillWanted,
        message: message || "",
        status: "pending"
    };


    swaps.push(newSwap);


    res.status(201).json({
        message: "Swap request created successfully",
        swap: newSwap
    });
};


// Accept or reject a swap request
const updateSwapStatus = (req, res) => {
    const id = parseInt(req.params.id);
    const { status } = req.body;


    const swap = swaps.find(s => s.id === id);


    if (!swap) {
        return res.status(404).json({
            message: "Swap request not found"
        });
    }


    // Only pending requests can be accepted or rejected
    if (swap.status !== "pending") {
        return res.status(400).json({
            message: `Cannot update a ${swap.status} swap request`
        });
    }


    // Only accepted or rejected are allowed
    if (status !== "accepted" && status !== "rejected") {
        return res.status(400).json({
            message: "Status must be accepted or rejected"
        });
    }


    swap.status = status;


    res.json({
        message: `Swap request ${status} successfully`,
        swap: swap
    });
};


// Cancel a pending swap request
const cancelSwap = (req, res) => {
    const id = parseInt(req.params.id);


    const swap = swaps.find(s => s.id === id);


    if (!swap) {
        return res.status(404).json({
            message: "Swap request not found"
        });
    }


    // Only pending requests can be cancelled
    if (swap.status !== "pending") {
        return res.status(400).json({
            message: `Cannot cancel a ${swap.status} swap request`
        });
    }


    swap.status = "cancelled";


    res.json({
        message: "Swap request cancelled successfully",
        swap: swap
    });
};


// Delete a swap request
const deleteSwap = (req, res) => {
    const id = parseInt(req.params.id);


    const index = swaps.findIndex(s => s.id === id);


    if (index === -1) {
        return res.status(404).json({
            message: "Swap request not found"
        });
    }


    const deletedSwap = swaps.splice(index, 1);


    res.json({
        message: "Swap request deleted successfully",
        swap: deletedSwap[0]
    });
};


module.exports = {
    getSwaps,
    getSwapById,
    createSwap,
    updateSwapStatus,
    cancelSwap,
    deleteSwap
};