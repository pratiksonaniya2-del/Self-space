import mongoose from "mongoose";

const habitSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",
    },

    title: String,

    completed: Boolean,
  },

  {
    timestamps: true,
  },
);

const Habit = mongoose.model(
  "Habit",

  habitSchema,
);

export default Habit;
