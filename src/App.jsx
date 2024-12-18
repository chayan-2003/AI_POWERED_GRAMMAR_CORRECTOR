import React, { useState } from "react";
import { CircularProgress } from "@mui/material";
import { GoogleGenerativeAI } from "@google/generative-ai";

function App() {
  const [text, setText] = useState("");
  const [temp, setTemp] = useState("");
  const [loading, setLoading] = useState(false);

  const typing = (e) => {
    const typed = e.target.value;
    setTemp(typed);
  };

  const clicked = async () => {
    setLoading(true);

    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Correct the sentence and display only the grammatical correct sentence. The sentence is ${temp}`;

    const result = await model.generateContent(prompt);
    const val = await result.response.text();

    setText(val);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-purple-800 flex flex-col relative">
      <div className="absolute inset-0 bg-opacity-30 bg-purple-500 z-0"></div>
      <div className="absolute left-16 top-10 opacity-20 z-0">
        <div className="text-white font-bold text-6xl rotate-45">✍️</div>
      </div>
      <div className="absolute right-16 bottom-16 opacity-20 z-0">
        <div className="text-white font-bold text-6xl rotate-45">✔️</div>
      </div>


      <header className="text-white p-6 text-center z-10">
        <h1 className="text-4xl font-bold mb-2">Grammatical Correction Tool</h1>
        <p className="mt-2 text-lg">
          Improve your writing with AI-powered corrections. Enter your text and let the tool enhance it for you, making it grammatically correct and fluent.
        </p>
      </header>

    
      <main className="flex-1 flex justify-center items-center py-8 z-10">
        <div className="bg-white shadow-lg rounded-lg p-6 w-96 max-w-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
            Enter Your Text Below
          </h2>
          <input
            type="text"
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Type or paste your text here"
            onChange={typing}
          />
          <div className="App mb-4">
            {loading ? (
              <div className="flex justify-center">
                <CircularProgress sx={{ color: "#6A1B9A" }} />
              </div>
            ) : (
              text && <div className="text-green-500 font-semibold text-lg">{text}</div>
            )}
          </div>
          <button
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
            onClick={clicked}
          >
            Correct Text
          </button>
        </div>
      </main>

    
      <footer className="bg-purple-800 text-white py-4 text-center z-10">
        <p className="text-sm">&copy; 2024 Chayan Ghosh | All rights reserved</p>
        <p className="text-xs mt-2">
          Enhance your text with AI! Our tool corrects grammar and structure, providing a professional touch.
        </p>
      </footer>
    </div>
  );
}

export default App;
