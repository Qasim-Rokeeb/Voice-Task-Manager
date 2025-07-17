import { useState } from 'react';

export default function TaskInput({ onAdd }) {
  const [input, setInput] = useState('');
  const [listening, setListening] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onAdd(input);
    setInput('');
  };

  const handleVoice = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.start();
    setListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
    };
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add task or use voice..."
        className="flex-1 px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800"
      />
      <button type="submit" className="px-4 py-2 bg-brandBlue text-white rounded">Add</button>
      <button
        type="button"
        onClick={handleVoice}
        className={`px-4 py-2 rounded ${listening ? 'bg-yellow-500' : 'bg-green-600'} text-white`}
      >
        🎤
      </button>
    </form>
  );
}
