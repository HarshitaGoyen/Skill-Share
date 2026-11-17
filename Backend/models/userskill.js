
const mongoose = require("mongoose");

const userSkillSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    skill: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skill",
      required: true
    },
    type: {
      type: String,
      enum: ["offered", "wanted"],
      required: true
    },
    proficiency: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner"
    }
  },
  {
    timestamps: true
  }
);

userSkillSchema.index(
  { user: 1, skill: 1, type: 1 },
  { unique: true }
);

module.exports = mongoose.model("UserSkill", userSkillSchema);