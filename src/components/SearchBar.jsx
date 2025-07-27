import React, { useState } from "react";
import { Mic } from "lucide-react";

export default function Searchbar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [listening, setListening] = useState(false);

  const handleTextSearch = async (text) => {
    if (!text.trim()) return;

    try {
      const res = await fetch("http://localhost:5000/api/process-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderText: text }),
      });

      const data = await res.json();

      if (data.success) {
        setResults(data.items || []); // ✅ Use "items" not "order"
        setQuery(text);
        onSearch && onSearch(text);
      } else {
        setResults([]);
      }
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    handleTextSearch(value);
  };

  const handleVoiceSearch = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US"; // ✅ English only
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListening(true);

    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript;
      handleTextSearch(spokenText);
      setListening(false);
    };

    recognition.onerror = (err) => {
      console.error("Speech Recognition Error:", err);
      setListening(false);
    };

    recognition.onend = () => setListening(false);

    recognition.start();
  };

  return (
    <div className="p-6 w-full max-w-xl mx-auto font-sans">
      <div className="flex items-center gap-2 border border-gray-300 rounded-xl px-4 py-2 shadow-sm">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Type or speak your order..."
          className="flex-1 outline-none text-base"
        />
        <button
          onClick={handleVoiceSearch}
          disabled={listening}
          className={`p-2 rounded-full transition ${
            listening ? "bg-red-100 animate-pulse" : "hover:bg-gray-100"
          }`}
          title="Voice Search"
        >
          <Mic className="w-5 h-5 text-blue-500" />
        </button>
      </div>

      {results.length > 0 && (
        <div className="mt-6 bg-gray-100 p-4 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-2">🧾 Parsed Order:</h2>
          <ul className="list-disc pl-6 space-y-1">
            {results.map((item, idx) => (
              <li key={idx}>{item}</li> // ✅ Show item as plain string
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
