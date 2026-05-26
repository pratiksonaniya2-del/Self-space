import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import fetch from "node-fetch";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Message from "./models/Message.js";
import User from "./models/User.js";
import Habit from "./models/Habits.js";

dotenv.config();

const app = express();


app.use(cors());

app.use(express.json());


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected 🚀");
  })
  .catch((err) => {
    console.log(err);
  });


const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "No token",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,

      "SECRET_KEY",
    );

    req.userId = decoded.id;

    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid token",
    });
  }
};


app.post(
  "/signup",

  async (req, res) => {
    try {
      const {
        name,

        email,

        password,
      } = req.body;

      const existingUser = await User.findOne({
        email,
      });

      if (existingUser) {
        return res.status(400).json({
          message: "User already exists",
        });
      }

      const hashedPassword = await bcrypt.hash(
        password,

        10,
      );

      const user = await User.create({
        name,

        email,

        password: hashedPassword,
      });

      const token = jwt.sign(
        {
          id: user._id,
        },

        "SECRET_KEY",
      );

      res.json({
        token,

        user,
      });
    } catch (error) {
      console.log(error);
    }
  },
);


app.post(
  "/login",

  async (req, res) => {
    try {
      const {
        email,

        password,
      } = req.body;

      const user = await User.findOne({
        email,
      });

      if (!user) {
        return res.status(400).json({
          message: "User not found",
        });
      }

      const isMatch = await bcrypt.compare(
        password,

        user.password,
      );

      if (!isMatch) {
        return res.status(400).json({
          message: "Invalid password",
        });
      }

      const token = jwt.sign(
        {
          id: user._id,
        },

        "SECRET_KEY",
      );

      res.json({
        token,

        user,
      });
    } catch (error) {
      console.log(error);
    }
  },
);


app.post(
  "/chat",

  verifyToken,

  async (req, res) => {
    try {
      const { message, chatId } = req.body;

      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",

        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,

            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            model: "openai/gpt-3.5-turbo",

            messages: [
              {
                role: "user",

                content: message,
              },
            ],
          }),
        },
      );

      const data = await response.json();

      const reply = data.choices[0].message.content;

      await Message.create({
        userId: req.userId,

        chatId,

        title: message,

        userMessage: message,

        botReply: reply,
      });

      res.json({
        reply,
      });
    } catch (error) {
      console.log(error);
    }
  },
);


app.get(
  "/chats",

  verifyToken,

  async (req, res) => {
    try {
      const chats = await Message.find({
        userId: req.userId,
      });

      const uniqueChats = [];

      const map = new Map();

      chats.forEach((chat) => {
        if (!map.has(chat.chatId)) {
          map.set(
            chat.chatId,

            true,
          );

          uniqueChats.push({
            chatId: chat.chatId,

            title: chat.title,
          });
        }
      });

      res.json(uniqueChats);
    } catch (error) {
      console.log(error);
    }
  },
);


app.get(
  "/messages/:chatId",

  verifyToken,

  async (req, res) => {
    try {
      const messages = await Message.find({
        userId: req.userId,

        chatId: req.params.chatId,
      });

      res.json(messages);
    } catch (error) {
      console.log(error);
    }
  },
);


app.delete(
  "/delete-chat/:chatId",

  verifyToken,

  async (req, res) => {
    try {
      await Message.deleteMany({
        userId: req.userId,

        chatId: req.params.chatId,
      });

      res.json({
        message: "Deleted",
      });
    } catch (error) {
      console.log(error);
    }
  },
);


app.put(
  "/rename-chat/:chatId",

  verifyToken,

  async (req, res) => {
    try {
      const { title } = req.body;

      await Message.updateMany(
        {
          userId: req.userId,

          chatId: req.params.chatId,
        },

        {
          $set: {
            title,
          },
        },
      );

      res.json({
        message: "Renamed",
      });
    } catch (error) {
      console.log(error);
    }
  },
);


app.post(
  "/add-habit",

  verifyToken,

  async (req, res) => {
    try {
      const { title } = req.body;

      const habit = await Habit.create({
        userId: req.userId,

        title,

        completed: false,

        completedDate: "",
      });

      res.json(habit);
    } catch (error) {
      console.log(error);
    }
  },
);


app.get(
  "/habits",

  verifyToken,

  async (req, res) => {
    try {
      const habits = await Habit.find({
        userId: req.userId,
      });

      const today = new Date().toDateString();

      /* DAILY RESET */

      for (let habit of habits) {
        if (habit.completedDate && habit.completedDate !== today) {
          habit.completed = false;

          await habit.save();
        }
      }

      const updatedHabits = await Habit.find({
        userId: req.userId,
      });

      res.json(updatedHabits);
    } catch (error) {
      console.log(error);
    }
  },
);


app.put(
  "/toggle-habit/:id",

  verifyToken,

  async (req, res) => {
    try {
      const habit = await Habit.findById(req.params.id);

      const user = await User.findById(req.userId);


      habit.completed = !habit.completed;


      if (habit.completed) {
        habit.completedDate = new Date().toDateString();
      }


      if (habit.completed) {
        user.xp += 10;
      } else {
        user.xp = Math.max(
          0,

          user.xp - 10,
        );
      }

      await habit.save();


      const habits = await Habit.find({
        userId: req.userId,
      });


      const allCompleted =
        habits.length > 0 && habits.every((h) => h.completed);

      const today = new Date().toDateString();


      if (allCompleted && user.lastStreakDate !== today) {
        user.streak += 1;

        user.lastStreakDate = today;
      }


      if (user.streak >= 50) {
        user.level = 4;
      } else if (user.streak >= 30) {
        user.level = 3;
      } else if (user.streak >= 20) {
        user.level = 2;
      } else if (user.streak >= 10) {
        user.level = 1;
      } else {
        user.level = 0;
      }


      const todayIndex = new Date().getDay();

      const completedCount = habits.filter((h) => h.completed).length;

      const percentage =
        Math.round((completedCount / habits.length) * 100) || 0;

      user.weeklyProgress[todayIndex] = percentage;


      const currentDate = new Date().getDate();

      const weekIndex = Math.floor((currentDate - 1) / 7);

      user.monthlyProgress[weekIndex] = percentage;


      if (user.xp >= 10 && !user.achievements.includes("First Habit")) {
        user.achievements.push("First Habit");
      }

      if (user.xp >= 100 && !user.achievements.includes("100 XP")) {
        user.achievements.push("100 XP");
      }

      if (user.streak >= 7 && !user.achievements.includes("7 Day Streak")) {
        user.achievements.push("7 Day Streak");
      }

      if (
        user.streak >= 30 &&
        !user.achievements.includes("Discipline Warrior")
      ) {
        user.achievements.push("Discipline Warrior");
      }

      await user.save();

      res.json(habit);
    } catch (error) {
      console.log(error);
    }
  },
);


app.get(
  "/user-stats",

  verifyToken,

  async (req, res) => {
    try {
      const user = await User.findById(req.userId);

      res.json({
        xp: user.xp,

        streak: user.streak,

        level: user.level,

        weeklyProgress: user.weeklyProgress,

        monthlyProgress: user.monthlyProgress,

        achievements: user.achievements,
      });
    } catch (error) {
      console.log(error);
    }
  },
);


app.listen(
  5000,

  () => {
    console.log("Server running on port 5000 🚀");
  },
);
