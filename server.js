
require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

const User = require("./models/user");
const Skill = require("./models/skill");
const SwapRequest = require("./models/swaprequest");
const app = express();

app.use(express.json());
const authRoutes = require("./routes/authTemp");
app.use("/api/auth", authRoutes);

const skillRoutes = require("./routes/skill");
app.use("/api/skills", skillRoutes);
const swapRequestRoutes = require("./routes/swaprequest");
app.use("/api/swaps", swapRequestRoutes);
const userSkillRoutes = require("./routes/userskill");
app.use("/api/user-skills", userSkillRoutes);

app.use(express.static("private"));
// Get all users for dashboard (never return passwords)
app.get("/api/dashboard/users", async (req, res) => {
  try {
    const users = await User.find()
      .select("name email bio location createdAt")
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();

    res.json(users);
  } catch (error) {
    console.error("Dashboard users error:", error.message);
    res.status(500).json({ message: "Unable to load users" });
  }
});

// Get all skills for dashboard
app.get("/api/dashboard/skills", async (req, res) => {
  try {
    const skills = await Skill.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();

    res.json(skills);
  } catch (error) {
    console.error("Dashboard skills error:", error.message);
    res.status(500).json({ message: "Unable to load skills" });
  }
});

// Get all swap requests for dashboard
app.get("/api/dashboard/swaps", async (req, res) => {
  try {
    const swaps = await SwapRequest.find()
      .populate("requester", "name email")
      .populate("receiver", "name email")
      .populate("offeredSkill", "name category")
      .populate("requestedSkill", "name category")
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();

    res.json(swaps);
  } catch (error) {
    console.error("Dashboard swaps error:", error.message);
    res.status(500).json({ message: "Unable to load swap requests" });
  }
});
// Dashboard API
app.get("/api/dashboard", async (req, res) => {
  try {
    const [totalUsers, totalSkills, totalSwaps, pendingSwaps, recentSwaps] =
      await Promise.all([
        User.countDocuments(),
        Skill.countDocuments(),
        SwapRequest.countDocuments(),
        SwapRequest.countDocuments({ status: "pending" }),
        SwapRequest.find()
          .sort({ createdAt: -1 })
          .limit(10)
          .select("status createdAt")
      ]);

    res.json({
      totalUsers,
      totalSkills,
      totalSwaps,
      pendingSwaps,
      recentSwaps
    });
  } catch (error) {
    console.error("Dashboard error:", error.message);
    res.status(500).json({ message: "Dashboard data load nahi hua" });
  }
});
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "./private" });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
  }
};

startServer();