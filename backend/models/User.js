import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,

    email: String,

    password: String,


    xp: {
      type: Number,

      default: 0,
    },


    streak: {
      type: Number,

      default: 0,
    },


    level: {
      type: Number,

      default: 0,
    },


    lastStreakDate: {
      type: String,

      default: "",
    },


    weeklyProgress: {
      type: [Number],

      default: [0, 0, 0, 0, 0, 0, 0],
    },


    monthlyProgress: {
      type: [Number],

      default: [0, 0, 0, 0],
    },


    achievements: {
      type: [String],

      default: [],
    },
  },

  {
    timestamps: true,
  },
);

const User = mongoose.model(
  "User",

  userSchema,
);

export default User;
