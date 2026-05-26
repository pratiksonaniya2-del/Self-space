import { useState } from "react";

import {
  BookOpen,
  Sparkles,
  Flame,
  Save,
} from "lucide-react";

export default function Journal() {

  const [entry, setEntry] =
    useState("");

  const [saved, setSaved] =
    useState(false);




  const handleSave = () => {

    if (entry.trim() === "")
      return;

    localStorage.setItem(
      "journalEntry",
      entry
    );

    setSaved(true);

    setTimeout(() => {

      setSaved(false);

    }, 2000);

  };




  return (

    <div className="min-h-screen bg-black text-white flex">

      {/* SIDEBAR */}

      <div className="w-72 bg-zinc-950 border-r border-zinc-800 p-6 flex flex-col justify-between">

        <div>

          <h1 className="text-4xl font-black">

            SelfSpace

          </h1>

          <p className="text-zinc-500 mt-2">

            Your private AI companion.

          </p>



          {/* MENU */}

          <div className="mt-12 space-y-4">

            <button className="w-full bg-zinc-900 border border-zinc-800 rounded-3xl px-5 py-4 text-left hover:bg-zinc-800 transition-all duration-300">

              Chat

            </button>



            <button className="w-full bg-zinc-900 border border-zinc-800 rounded-3xl px-5 py-4 text-left hover:bg-zinc-800 transition-all duration-300">

              Track Yourself

            </button>



            <button className="w-full bg-purple-600 rounded-3xl px-5 py-4 text-left font-semibold">

              Journal

            </button>

          </div>

        </div>



        {/* STREAK */}

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5">

          <div className="flex items-center gap-3">

            <Flame className="text-orange-500" />

            <h2 className="text-2xl font-black">

              7 Day Streak

            </h2>

          </div>

          <p className="text-zinc-500 mt-3">

            Keep reflecting daily.

          </p>

        </div>

      </div>



      {/* MAIN */}

      <div className="flex-1 p-10 overflow-y-auto">

        {/* TOP */}

        <div>

          <h1 className="text-5xl font-black flex items-center gap-4">

            <BookOpen className="text-purple-500" />

            AI Journal

          </h1>

          <p className="text-zinc-500 mt-3 text-lg">

            Reflect on your thoughts and emotions.

          </p>

        </div>



        {/* JOURNAL BOX */}

        <div className="mt-10 bg-zinc-900 border border-zinc-800 rounded-[35px] p-8">

          <h2 className="text-3xl font-black">

            Today's Reflection

          </h2>

          <p className="text-zinc-500 mt-3">

            What made you feel something today?

          </p>



          <textarea
            value={entry}
            onChange={(e) =>
              setEntry(e.target.value)
            }
            placeholder="Write your thoughts here..."
            className="w-full h-72 mt-8 bg-black border border-zinc-800 rounded-[30px] p-6 outline-none resize-none text-lg focus:border-purple-500 transition-all duration-300"
          />



          <div className="flex items-center justify-between mt-8">

            <div className="flex items-center gap-3 text-zinc-500">

              <Sparkles />

              AI reflections are private and secure.

            </div>



            <button
              onClick={handleSave}
              className="bg-white text-black px-8 py-4 rounded-3xl font-semibold flex items-center gap-3 hover:scale-105 transition-all duration-300"
            >

              <Save size={20} />

              Save Journal

            </button>

          </div>



          {/* SAVED MESSAGE */}

          {saved && (

            <div className="mt-6 bg-green-500/10 border border-green-500/20 text-green-400 px-5 py-4 rounded-3xl">

              Journal saved successfully.

            </div>

          )}

        </div>



        {/* AI INSIGHTS */}

        <div className="grid grid-cols-3 gap-6 mt-10">

          {/* AI SUMMARY */}

          <div className="col-span-2 bg-zinc-900 border border-zinc-800 rounded-[35px] p-8">

            <div className="flex items-center gap-3">

              <Sparkles className="text-purple-500" />

              <h2 className="text-3xl font-black">

                AI Reflection

              </h2>

            </div>

            <p className="text-2xl leading-relaxed mt-8">

              “You seem more self-aware and emotionally expressive lately.
              Your reflections show growth and emotional honesty.”

            </p>

          </div>



          {/* DAILY PROMPTS */}

          <div className="bg-zinc-900 border border-zinc-800 rounded-[35px] p-8">

            <h2 className="text-3xl font-black">

              Daily Prompts

            </h2>



            <div className="mt-8 space-y-5">

              <div className="bg-black/40 border border-zinc-800 rounded-3xl p-5">

                What made you smile today?

              </div>



              <div className="bg-black/40 border border-zinc-800 rounded-3xl p-5">

                What challenged you today?

              </div>



              <div className="bg-black/40 border border-zinc-800 rounded-3xl p-5">

                What are you grateful for?

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}