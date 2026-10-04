const skills = [
    {
        id: 1,
        name: "Java",
        category: "Programming"
    },
    {
        id: 2,
        name: "C++",
        category: "Programming"
    },
    {
        id: 3,
        name: "JavaScript",
        category: "Web Development"
    },
    {
        id: 4,
        name: "React",
        category: "Web Development"
    },
    {
        id: 5,
        name: "Node.js",
        category: "Web Development"
    },
    {
        id: 6,
        name: "Python",
        category: "Programming"
    },
    {
        id: 7,
        name: "Graphic Designing",
        category: "Design"
    },
    {
        id: 8,
        name: "Video Editing",
        category: "Creative"
    },
    {
        id: 9,
        name: "Public Speaking",
        category: "Communication"
    },
    {
        id: 10,
        name: "Photography",
        category: "Creative"
    }
];


// Get all skills
const getSkills = (req, res) => {
    res.json(skills);
};


// Get skill by name
const getSkillByName = (req, res) => {
    const skillName = req.params.name;

    if (!skillName || skillName.trim() === "") {
        return res.status(400).json({
            message: "Skill name is required"
        });
    }

    const skill = skills.find(
        skill => skill.name.toLowerCase() === skillName.toLowerCase()
    );

    if (!skill) {
        return res.status(404).json({
            message: "Skill not found"
        });
    }

    res.json(skill);
};


// Search and filter skills
const searchSkills = (req, res) => {
    const { skill, category } = req.query;

    let results = skills;


    // Search by skill name
    if (skill) {
        if (typeof skill !== "string" || skill.trim() === "") {
            return res.status(400).json({
                message: "Skill search must be a valid text"
            });
        }

        results = results.filter(s =>
            s.name.toLowerCase().includes(skill.toLowerCase())
        );
    }


    // Filter by category
    if (category) {
        if (typeof category !== "string" || category.trim() === "") {
            return res.status(400).json({
                message: "Category must be a valid text"
            });
        }

        results = results.filter(s =>
            s.category.toLowerCase() === category.toLowerCase()
        );
    }


    res.json({
        count: results.length,
        skills: results
    });
};


module.exports = {
    getSkills,
    getSkillByName,
    searchSkills
};