import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Brain,
  Flame,
  Activity,
  BatteryCharging,
  TrendingUp,
  Calendar,
  MessageSquare,
  Sparkles,
} from "lucide-react";

export default function TrackYourself() {
  const navigate = useNavigate();
  const [moods, setMoods] = useState({
    Happy: 0,
    Sad: 0,
    Focused: 0,
    Stressed: 0,
    Neutral: 0,
  });

  /* FETCH MOOD STATS */

  useEffect(() => {
    const fetchMoodStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "https://self-space.onrender.com0/mood-stats",

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setMoods(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMoodStats();
  }, []);

  /* MOST COMMON MOOD */

  const dominantMood = Object.keys(moods).reduce((a, b) =>
    moods[a] > moods[b] ? a : b,
  );

  /* TOTAL CHATS */

  const totalChats = Object.values(moods).reduce(
    (a, b) => a + b,

    0,
  );

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* SIDEBAR */}

      <div className="w-72 bg-zinc-950 border-r border-zinc-800 p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-4xl font-black">SelfSpace</h1>

          <p className="text-zinc-500 mt-2">Your private AI companion.</p>

          {/* MENU */}

          <div className="mt-12 space-y-4">
            <button className="w-full bg-zinc-900 border border-zinc-800 rounded-3xl px-5 py-4 text-left hover:bg-zinc-800 transition-all duration-300">
              Chat
            </button>

            <button className="w-full bg-purple-600 rounded-3xl px-5 py-4 text-left font-semibold">
              Track Yourself
            </button>

            <button
              onClick={() => navigate("/journal")}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-3xl px-5 py-4 text-left hover:bg-zinc-800 transition-all duration-300"
            >
              Journal
            </button>

            <button className="w-full bg-zinc-900 border border-zinc-800 rounded-3xl px-5 py-4 text-left hover:bg-zinc-800 transition-all duration-300">
              Goals
            </button>
          </div>
        </div>

        {/* USER */}

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5">
          <p className="font-semibold">Welcome Back 👋</p>

          <p className="text-zinc-500 text-sm mt-2">
            Continue your self-growth journey.
          </p>
        </div>
      </div>

      {/* MAIN */}

      <div className="flex-1 p-8 overflow-y-auto">
        {/* TOP */}

        <div className="mb-10">
          <h1 className="text-5xl font-black">Track Yourself</h1>

          <p className="text-zinc-500 mt-3 text-lg">
            Understand your emotions, habits and growth.
          </p>
        </div>

        {/* TOP CARDS */}

        <div className="grid grid-cols-4 gap-6">
          {/* MOOD */}

          <div className="bg-zinc-900 border border-zinc-800 rounded-[30px] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400">Current Mood</p>

                <h2 className="text-4xl font-black mt-3">{dominantMood}</h2>
              </div>

              <Brain size={40} className="text-purple-500" />
            </div>

            <p className="text-green-400 mt-5">Based on your conversations</p>
          </div>

          {/* STRESS */}

          <div className="bg-zinc-900 border border-zinc-800 rounded-[30px] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400">Stress Messages</p>

                <h2 className="text-4xl font-black mt-3">{moods.Stressed}</h2>
              </div>

              <Activity size={40} className="text-pink-500" />
            </div>

            <p className="text-green-400 mt-5">Emotional pressure detected</p>
          </div>

          {/* PRODUCTIVITY */}

          <div className="bg-zinc-900 border border-zinc-800 rounded-[30px] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400">Focused Messages</p>

                <h2 className="text-4xl font-black mt-3">{moods.Focused}</h2>
              </div>

              <TrendingUp size={40} className="text-yellow-500" />
            </div>

            <p className="text-green-400 mt-5">Productivity conversations</p>
          </div>

          {/* ENERGY */}

          <div className="bg-zinc-900 border border-zinc-800 rounded-[30px] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400">Total Emotional Chats</p>

                <h2 className="text-4xl font-black mt-3">{totalChats}</h2>
              </div>

              <BatteryCharging size={40} className="text-blue-500" />
            </div>

            <p className="text-green-400 mt-5">AI analyzed conversations</p>
          </div>
        </div>

        {/* MIDDLE SECTION */}

        <div className="grid grid-cols-3 gap-6 mt-8">
          {/* MOOD GRAPH */}

          <div className="col-span-2 bg-zinc-900 border border-zinc-800 rounded-[30px] p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-black">Mood Trend</h2>

                <p className="text-zinc-500 mt-2">Your emotional journey</p>
              </div>

              <Calendar className="text-zinc-500" />
            </div>

            {/* GRAPH */}

            <div className="mt-10 rounded-[30px] bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-zinc-800 p-10">
              <div className="space-y-6">
                {/* HAPPY */}

                <div>
                  <div className="flex justify-between mb-2">
                    <p>Happy</p>

                    <p>{moods.Happy}</p>
                  </div>

                  <div className="h-4 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      style={{
                        width: `${moods.Happy * 20}px`,
                      }}
                      className="h-full bg-green-500 rounded-full"
                    />
                  </div>
                </div>

                {/* SAD */}

                <div>
                  <div className="flex justify-between mb-2">
                    <p>Sad</p>

                    <p>{moods.Sad}</p>
                  </div>

                  <div className="h-4 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      style={{
                        width: `${moods.Sad * 20}px`,
                      }}
                      className="h-full bg-red-500 rounded-full"
                    />
                  </div>
                </div>

                {/* STRESSED */}

                <div>
                  <div className="flex justify-between mb-2">
                    <p>Stressed</p>

                    <p>{moods.Stressed}</p>
                  </div>

                  <div className="h-4 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      style={{
                        width: `${moods.Stressed * 20}px`,
                      }}
                      className="h-full bg-pink-500 rounded-full"
                    />
                  </div>
                </div>

                {/* FOCUSED */}

                <div>
                  <div className="flex justify-between mb-2">
                    <p>Focused</p>

                    <p>{moods.Focused}</p>
                  </div>

                  <div className="h-4 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      style={{
                        width: `${moods.Focused * 20}px`,
                      }}
                      className="h-full bg-yellow-500 rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI INSIGHTS */}

          <div className="bg-zinc-900 border border-zinc-800 rounded-[30px] p-8">
            <div className="flex items-center gap-3">
              <Sparkles className="text-purple-500" />

              <h2 className="text-3xl font-black">AI Insights</h2>
            </div>

            <div className="mt-8 space-y-5">
              <div className="bg-black/40 border border-zinc-800 rounded-3xl p-5">
                <p className="font-semibold">Dominant mood: {dominantMood}</p>
              </div>

              <div className="bg-black/40 border border-zinc-800 rounded-3xl p-5">
                <p className="font-semibold">
                  Total analyzed chats: {totalChats}
                </p>
              </div>

              <div className="bg-black/40 border border-zinc-800 rounded-3xl p-5">
                <p className="font-semibold">
                  Your emotions are evolving over time.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM CARDS */}

        <div className="grid grid-cols-3 gap-6 mt-8">
          {/* STREAK */}

          <div className="bg-zinc-900 border border-zinc-800 rounded-[30px] p-8">
            <div className="flex items-center gap-3">
              <Flame className="text-orange-500" />

              <h2 className="text-3xl font-black">Reflection Streak</h2>
            </div>

            <h1 className="text-6xl font-black mt-8">7 Days</h1>

            <p className="text-zinc-500 mt-5">Keep reflecting consistently.</p>
          </div>

          {/* CHAT STATS */}

          <div className="bg-zinc-900 border border-zinc-800 rounded-[30px] p-8">
            <div className="flex items-center gap-3">
              <MessageSquare className="text-blue-500" />

              <h2 className="text-3xl font-black">Chat Statistics</h2>
            </div>

            <div className="mt-8 space-y-5">
              <div className="flex items-center justify-between">
                <p className="text-zinc-400">Happy</p>

                <h3 className="text-2xl font-bold">{moods.Happy}</h3>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-zinc-400">Sad</p>

                <h3 className="text-2xl font-bold">{moods.Sad}</h3>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-zinc-400">Focused</p>

                <h3 className="text-2xl font-bold">{moods.Focused}</h3>
              </div>
            </div>
          </div>

          {/* MOTIVATION */}

          <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/20 rounded-[30px] p-8">
            <h2 className="text-3xl font-black">Daily Motivation</h2>

            <p className="mt-8 text-2xl leading-relaxed">
              “You don’t have to be perfect. You just need to keep growing.”
            </p>

            <p className="text-zinc-400 mt-6">— SelfSpace AI</p>
          </div>
        </div>
      </div>
    </div>
  );
}
