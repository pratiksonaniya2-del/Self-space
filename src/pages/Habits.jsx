import { useState, useEffect } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import {
  Plus,
  Check,
  Flame,
  TrendingUp,
  Menu,
  X,
  Trophy,
  Star,
} from "lucide-react";

export default function Habits() {
  const navigate = useNavigate();


  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [habitInput, setHabitInput] = useState("");

  const [habits, setHabits] = useState([]);

  const [showCelebrate, setShowCelebrate] = useState(false);

  const [userStats, setUserStats] = useState({
    xp: 0,

    streak: 0,

    level: 0,

    weeklyProgress: [0, 0, 0, 0, 0, 0, 0],

    monthlyProgress: [0, 0, 0, 0],

    achievements: [],
  });


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");


      const habitsResponse = await axios.get(
        "https://self-space.onrender.com0/habits",

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setHabits(habitsResponse.data);


      const statsResponse = await axios.get(
        "https://self-space.onrender.com0/user-stats",

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setUserStats(statsResponse.data);
    } catch (error) {
      console.log(error);
    }
  };


  const addHabit = async () => {
    if (habitInput.trim() === "") return;

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "https://self-space.onrender.com0/add-habit",

        {
          title: habitInput,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setHabits([...habits, response.data]);

      setHabitInput("");
    } catch (error) {
      console.log(error);
    }
  };


  const toggleHabit = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `https://self-space.onrender.com0/toggle-habit/${id}`,

        {},

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const updatedHabits = habits.map((habit) =>
        habit._id === id ? response.data : habit,
      );

      setHabits(updatedHabits);


      const statsResponse = await axios.get(
        "https://self-space.onrender.com0/user-stats",

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setUserStats(statsResponse.data);


      const allCompleted =
        updatedHabits.length > 0 &&
        updatedHabits.every((habit) => habit.completed);

      if (allCompleted) {
        setShowCelebrate(true);

        setTimeout(() => {
          setShowCelebrate(false);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const completedHabits = habits.filter((habit) => habit.completed).length;

  const progress =
    habits.length === 0
      ? 0
      : Math.round((completedHabits / habits.length) * 100);


  const getLevelName = () => {
    if (userStats.level === 0) {
      return "Starter";
    }

    if (userStats.level === 1) {
      return "Consistent";
    }

    if (userStats.level === 2) {
      return "Discipline Warrior";
    }

    if (userStats.level === 3) {
      return "Growth Master";
    }

    return "Self Legend";
  };

  return (
    <>
      

      {showCelebrate && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[999]">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-12 rounded-[40px] text-center animate-bounce shadow-2xl">
            <h1 className="text-7xl">🎉</h1>

            <h2 className="text-5xl font-black mt-4">Amazing Work!</h2>

            <p className="text-xl mt-4">All habits completed 🚀</p>
          </div>
        </div>
      )}

      <div className="h-screen bg-gradient-to-br from-black via-[#0B1120] to-[#111827] text-white overflow-hidden flex">

        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          />
        )}


        <div
          className={`fixed lg:relative z-50 top-0 left-0 h-full w-80 bg-white/5 backdrop-blur-2xl border-r border-white/10 p-6 flex flex-col justify-between transition-all duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-5xl font-black bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
                  SelfSpace
                </h1>

                <p className="text-zinc-400 mt-2">Build your future daily.</p>
              </div>

              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden"
              >
                <X />
              </button>
            </div>


            <div className="mt-10 space-y-4">
              <button
                onClick={() => navigate("/chat")}
                className="w-full bg-white/5 border border-white/10 py-4 rounded-3xl hover:bg-white/10 transition-all duration-300 font-semibold"
              >
                Chat
              </button>

              <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 py-4 rounded-3xl font-semibold">
                Habit Tracker
              </button>
            </div>


            <div className="mt-10 bg-white/5 border border-white/10 rounded-[35px] p-6 backdrop-blur-2xl">
              <div className="flex items-center gap-3">
                <Trophy className="text-yellow-400" />

                <h2 className="text-3xl font-black">Level {userStats.level}</h2>
              </div>

              <p className="text-purple-400 mt-4 text-lg">{getLevelName()}</p>
            </div>
          </div>


          <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-[35px] p-6">
            <div className="flex items-center gap-3">
              <Flame className="text-orange-400" />

              <h2 className="text-3xl font-black">{userStats.streak}</h2>
            </div>

            <p className="text-zinc-400 mt-3">Day Streak 🔥</p>
          </div>
        </div>


        <div className="flex-1 overflow-y-auto">

          <div className="border-b border-white/10 bg-black/20 backdrop-blur-2xl px-6 py-5 flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
              <Menu />
            </button>

            <div>
              <h2 className="text-5xl font-black bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
                Habit Tracker
              </h2>

              <p className="text-zinc-400 mt-2">Stay disciplined daily 🚀</p>
            </div>
          </div>


          <div className="p-6 md:p-10">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-[35px] p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-zinc-400">XP Points</p>

                    <h2 className="text-6xl font-black mt-4 text-yellow-400">
                      {userStats.xp}
                    </h2>
                  </div>

                  <Star size={50} className="text-yellow-400" />
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-[35px] p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-zinc-400">Today's Progress</p>

                    <h2 className="text-6xl font-black mt-4 text-green-400">
                      {progress}%
                    </h2>
                  </div>

                  <TrendingUp size={50} className="text-green-400" />
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-[35px] p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-zinc-400">Current Level</p>

                    <h2 className="text-6xl font-black mt-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {userStats.level}
                    </h2>
                  </div>

                  <Trophy size={50} className="text-purple-400" />
                </div>
              </div>
            </div>


            <div className="mt-10 bg-white/5 border border-white/10 rounded-[35px] p-8">
              <h2 className="text-4xl font-black">Weekly Analytics</h2>

              <div className="flex items-end justify-between gap-4 mt-12 h-[250px]">
                {userStats.weeklyProgress.map((value, index) => {
                  const days = [
                    "Sun",

                    "Mon",

                    "Tue",

                    "Wed",

                    "Thu",

                    "Fri",

                    "Sat",
                  ];

                  return (
                    <div
                      key={index}
                      className="flex flex-col items-center flex-1"
                    >
                      <div className="w-full bg-black/30 rounded-3xl overflow-hidden h-[200px] flex items-end">
                        <div
                          style={{
                            height: `${value}%`,
                          }}
                          className="w-full bg-gradient-to-t from-purple-500 to-pink-500 transition-all duration-500 rounded-3xl"
                        />
                      </div>

                      <p className="mt-4 text-zinc-400">{days[index]}</p>

                      <p className="text-sm mt-1 text-white">{value}%</p>
                    </div>
                  );
                })}
              </div>
            </div>


            <div className="mt-10 bg-white/5 border border-white/10 rounded-[35px] p-8">
              <h2 className="text-4xl font-black">Monthly Analytics</h2>

              <div className="flex items-end justify-between gap-6 mt-12 h-[250px]">
                {userStats.monthlyProgress.map((value, index) => {
                  const weeks = ["Week 1", "Week 2", "Week 3", "Week 4"];

                  return (
                    <div
                      key={index}
                      className="flex flex-col items-center flex-1"
                    >
                      <div className="w-full bg-black/30 rounded-3xl overflow-hidden h-[200px] flex items-end">
                        <div
                          style={{
                            height: `${value}%`,
                          }}
                          className="w-full bg-gradient-to-t from-cyan-500 to-blue-500 transition-all duration-500 rounded-3xl"
                        />
                      </div>

                      <p className="mt-4 text-zinc-400">{weeks[index]}</p>

                      <p className="text-sm mt-1 text-white">{value}%</p>
                    </div>
                  );
                })}
              </div>
            </div>


            <div className="mt-10 bg-white/5 border border-white/10 rounded-[35px] p-8">
              <h2 className="text-4xl font-black">Achievements</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
                {userStats.achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-3xl p-6 flex items-center gap-4"
                  >
                    <div className="text-4xl">🏆</div>

                    <div>
                      <h3 className="text-2xl font-bold">{achievement}</h3>

                      <p className="text-zinc-400 mt-1">Achievement unlocked</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>


            <div className="mt-10 bg-white/5 border border-white/10 rounded-[35px] p-8">
              <h2 className="text-4xl font-black">Add New Habit</h2>

              <div className="flex flex-col md:flex-row gap-4 mt-8">
                <input
                  type="text"
                  placeholder="Gym, Coding, Reading..."
                  value={habitInput}
                  onChange={(e) => setHabitInput(e.target.value)}
                  className="flex-1 bg-black/30 border border-white/10 rounded-3xl px-6 py-5 outline-none focus:border-purple-500 text-lg"
                />

                <button
                  onClick={addHabit}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-5 rounded-3xl font-semibold flex items-center justify-center gap-3"
                >
                  <Plus />
                  Add Habit
                </button>
              </div>
            </div>


            <div className="mt-10 bg-white/5 border border-white/10 rounded-[35px] p-8">
              <h2 className="text-4xl font-black">Today's Habits</h2>

              <div className="mt-8 space-y-5">
                {habits.map((habit) => (
                  <div
                    key={habit._id}
                    className={`flex items-center justify-between rounded-[30px] px-6 py-5 border transition-all duration-300 ${
                      habit.completed
                        ? "bg-green-500/10 border-green-500/20"
                        : "bg-black/20 border-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-5">
                      <button
                        onClick={() => toggleHabit(habit._id)}
                        className={`w-10 h-10 rounded-full border flex items-center justify-center ${
                          habit.completed
                            ? "bg-green-500 border-green-500"
                            : "border-zinc-600"
                        }`}
                      >
                        {habit.completed && <Check size={20} />}
                      </button>

                      <p
                        className={`text-xl ${
                          habit.completed ? "line-through text-zinc-500" : ""
                        }`}
                      >
                        {habit.title}
                      </p>
                    </div>

                    <div
                      className={`text-sm font-semibold ${
                        habit.completed ? "text-green-400" : "text-zinc-500"
                      }`}
                    >
                      {habit.completed ? "+10 XP ⚡" : "Pending"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
