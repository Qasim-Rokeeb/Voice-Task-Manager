import { useState } from "react";
import { FiMic, FiMicOff } from "react-icons/fi";

export default function TaskInput({ onAdd }) {
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onAdd(input.trim());
    setInput("");
  };

  const handleVoice = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition not supported.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onresult = (e) => setInput(e.results[0][0].transcript.trim());
    recognition.onerror = () => setListening(false);

    recognition.start();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type or speak a task..."
        className="flex-1 px-4 py-2 rounded-xl bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm
                   border border-transparent focus:ring-2 focus:ring-indigo-500 outline-none"
      />
      <button
        type="button"
        onClick={handleVoice}
        className={`p-2 rounded-xl transition ${listening ? "bg-yellow-400" : "bg-green-500"} text-white`}
        aria-label="Voice"
      >
        {listening ? <FiMicOff /> : <FiMic />}
      </button>
      <button
        type="submit"
        className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
      >
        Add
      </button>
    </form>
  );
}