import { useState, useEffect, useRef } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import {
  Trash2,
  LogOut,
  Plus,
  Send,
  Sparkles,
  Menu,
  X,
  Flame,
} from "lucide-react";

export default function Chat() {
  const navigate = useNavigate();

  const messagesEndRef = useRef(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [chatId, setChatId] = useState(Date.now().toString());

  const [chatHistory, setChatHistory] = useState([]);

  const [activeChat, setActiveChat] = useState("");

  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/auth");
    }
  }, []);

  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);


  useEffect(() => {
    const fetchChats = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:5000/chats",

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setChatHistory(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchChats();
  }, [messages]);


  const loadChat = async (selectedChatId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:5000/messages/${selectedChatId}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const formatted = [];

      response.data.forEach((msg) => {
        formatted.push({
          sender: "user",

          text: msg.userMessage,
        });

        formatted.push({
          sender: "ai",

          text: msg.botReply,
        });
      });

      setMessages(formatted);

      setChatId(selectedChatId);

      setActiveChat(selectedChatId);

      setSidebarOpen(false);
    } catch (error) {
      console.log(error);
    }
  };


  const deleteChat = async (selectedChatId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/delete-chat/${selectedChatId}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setChatHistory((prev) =>
        prev.filter((chat) => chat.chatId !== selectedChatId),
      );

      if (activeChat === selectedChatId) {
        setMessages([]);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const handleSend = async () => {
    if (input.trim() === "") return;

    const userMessage = {
      sender: "user",

      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentInput = input;

    setInput("");

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/chat",

        {
          message: currentInput,

          chatId,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const aiMessage = {
        sender: "ai",

        text: response.data.reply,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/auth");
  };

  return (
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

              <p className="text-zinc-400 mt-2">Your AI companion.</p>
            </div>

            

            <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
              <X />
            </button>
          </div>

         

          <button
            onClick={() => {
              setMessages([]);

              setChatId(Date.now().toString());

              setActiveChat("");
            }}
            className="w-full mt-10 bg-gradient-to-r from-purple-500 to-pink-500 py-4 rounded-3xl font-semibold hover:scale-[1.03] transition-all duration-300 shadow-2xl shadow-purple-500/20 flex items-center justify-center gap-3"
          >
            <Plus />
            New Chat
          </button>

         

          <button
            onClick={() => navigate("/habits")}
            className="w-full mt-5 bg-white/5 border border-white/10 py-4 rounded-3xl hover:bg-white/10 transition-all duration-300 font-semibold"
          >
            Habit Tracker
          </button>

         

          <div className="mt-8 space-y-4 overflow-y-auto max-h-[50vh] pr-2">
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`group flex items-center justify-between rounded-3xl px-5 py-4 border transition-all duration-300 backdrop-blur-xl ${
                  activeChat === chat.chatId
                    ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/20"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
              >
                <button
                  onClick={() => loadChat(chat.chatId)}
                  className="flex-1 text-left truncate"
                >
                  {chat.title}
                </button>

                <button
                  onClick={() => deleteChat(chat.chatId)}
                  className="opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

         
        </div>

    

        <div>
       

          <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-[30px] p-5 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <Flame className="text-orange-400" />
            </div>
            <p className="text-zinc-400 mt-3">Keep growing daily 🚀</p>
          </div>

 

          <button
            onClick={handleLogout}
            className="w-full mt-5 bg-red-500/10 border border-red-500/20 text-red-400 py-4 rounded-3xl hover:bg-red-500/20 transition-all duration-300 flex items-center justify-center gap-3"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

  

      <div className="flex-1 flex flex-col relative overflow-hidden">
     

        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-purple-500/20 blur-[120px] rounded-full" />

        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-pink-500/10 blur-[120px] rounded-full" />

   

        <div className="relative z-10 border-b border-white/10 bg-black/20 backdrop-blur-2xl px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
       

            <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
              <Menu />
            </button>

            <div>
              <h2 className="text-4xl font-black flex items-center gap-3 bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
                <Sparkles />
                Talk Freely
              </h2>

              <p className="text-zinc-400 mt-1">
                Your conversations are private and secure.
              </p>
            </div>
          </div>

        

          <div className="hidden md:flex items-center gap-4">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />

            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
          </div>
        </div>

  

        <div className="flex-1 overflow-y-auto px-4 md:px-10 py-10 relative z-10">
          <div className="max-w-5xl mx-auto space-y-8">
            {messages.length === 0 && (
              <div className="h-[70vh] flex flex-col items-center justify-center text-center">
                <h1 className="text-7xl font-black bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
                  Start Talking
                </h1>

                <p className="text-zinc-400 text-xl mt-6 max-w-2xl leading-relaxed">
                  SelfSpace gives you a calm, secure and private space to think,
                  vent and reflect.
                </p>
              </div>
            )}

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-3xl px-7 py-5 rounded-[35px] text-lg leading-relaxed backdrop-blur-2xl shadow-2xl transition-all duration-300 ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                      : "bg-white/10 border border-white/10"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/10 border border-white/10 px-6 py-4 rounded-3xl backdrop-blur-2xl animate-pulse">
                  AI is typing...
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        

        <div className="relative z-10 px-4 md:px-10 py-6">
          <div className="max-w-5xl mx-auto flex items-center gap-4 bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[40px] px-4 py-4 shadow-2xl">
            <input
              type="text"
              placeholder="Write your thoughts..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSend();
                }
              }}
              className="flex-1 bg-transparent outline-none text-lg placeholder:text-zinc-500 px-4"
            />

            <button
              onClick={handleSend}
              className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-2xl shadow-purple-500/30"
            >
              <Send size={22} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
