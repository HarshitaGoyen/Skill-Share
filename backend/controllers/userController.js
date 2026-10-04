const users = [
    {
        id: 1,
        name: "Maitri",
        email: "maitri@example.com",
        bio: "Computer Science student",
        skillsToTeach: ["Java", "C++"],
        skillsToLearn: ["React", "Node.js"]
    },
    {
        id: 2,
        name: "Rahul",
        email: "rahul@example.com",
        bio: "Web developer",
        skillsToTeach: ["React", "JavaScript"],
        skillsToLearn: ["Python", "Java"]
    }
];


// Get all users
// Optional: search users by skill they can teach
const getUsers = (req, res) => {
    const skill = req.query.skill;

    if (!skill) {
        return res.json(users);
    }

    const filteredUsers = users.filter(user =>
        user.skillsToTeach.some(
            userSkill =>
                userSkill.toLowerCase() === skill.toLowerCase()
        )
    );

    res.json(filteredUsers);
};


// Get user by ID
const getUserById = (req, res) => {
    const id = parseInt(req.params.id);

    // Check if ID is a valid number
    if (isNaN(id)) {
        return res.status(400).json({
            message: "User ID must be a number"
        });
    }

    const user = users.find(user => user.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.json(user);
};


// Update user profile
const updateUser = (req, res) => {
    const id = parseInt(req.params.id);

    // Check if ID is a valid number
    if (isNaN(id)) {
        return res.status(400).json({
            message: "User ID must be a number"
        });
    }

    const user = users.find(user => user.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    const {
        name,
        email,
        bio,
        skillsToTeach,
        skillsToLearn
    } = req.body;


    // Validate name
    if (name !== undefined) {
        if (typeof name !== "string" || name.trim() === "") {
            return res.status(400).json({
                message: "Name must be a non-empty string"
            });
        }

        user.name = name.trim();
    }


    // Validate email
    if (email !== undefined) {
        if (
            typeof email !== "string" ||
            !email.includes("@") ||
            email.trim() === ""
        ) {
            return res.status(400).json({
                message: "Please provide a valid email"
            });
        }

        user.email = email.trim();
    }


    // Validate bio
    if (bio !== undefined) {
        if (typeof bio !== "string") {
            return res.status(400).json({
                message: "Bio must be a string"
            });
        }

        user.bio = bio;
    }


    // Validate skills to teach
    if (skillsToTeach !== undefined) {
        if (!Array.isArray(skillsToTeach)) {
            return res.status(400).json({
                message: "skillsToTeach must be an array"
            });
        }

        user.skillsToTeach = skillsToTeach;
    }


    // Validate skills to learn
    if (skillsToLearn !== undefined) {
        if (!Array.isArray(skillsToLearn)) {
            return res.status(400).json({
                message: "skillsToLearn must be an array"
            });
        }

        user.skillsToLearn = skillsToLearn;
    }


    res.json({
        message: "User profile updated successfully",
        user: user
    });
};


// Find users with matching skills
const getMatches = (req, res) => {
    const userId = parseInt(req.params.id);

    // Check if ID is a valid number
    if (isNaN(userId)) {
        return res.status(400).json({
            message: "User ID must be a number"
        });
    }

    const currentUser = users.find(user => user.id === userId);

    if (!currentUser) {
        return res.status(404).json({
            message: "User not found"
        });
    }


    const matches = users.filter(user => {
        if (user.id === userId) {
            return false;
        }

        const teachMatch = user.skillsToTeach.some(skill =>
            currentUser.skillsToLearn.some(
                wantedSkill =>
                    wantedSkill.toLowerCase() === skill.toLowerCase()
            )
        );

        const learnMatch = user.skillsToLearn.some(skill =>
            currentUser.skillsToTeach.some(
                offeredSkill =>
                    offeredSkill.toLowerCase() === skill.toLowerCase()
            )
        );

        return teachMatch || learnMatch;
    });


    res.json({
        user: currentUser.name,
        matches: matches
    });
};


module.exports = {
    getUsers,
    getUserById,
    updateUser,
    getMatches
};