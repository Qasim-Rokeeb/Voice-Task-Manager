import { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import ThemeToggle from "./components/ThemeToggle";

export default function App() {
  const [tasks, setTasks] = useState(() =>
    JSON.parse(localStorage.getItem("tasks") || "[]")
  );
  const [filter, setFilter] = useState("all"); // all | active | completed

  /* persist & theme */
  useEffect(() => localStorage.setItem("tasks", JSON.stringify(tasks)), [tasks]);

  const addTask = (text) =>
    setTasks([{ id: Date.now(), text, done: false }, ...tasks]);

  const toggleTask = (id) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const deleteTask = (id) => setTasks(tasks.filter((t) => t.id !== id));

  const filtered = tasks.filter((t) => {
    if (filter === "active") return !t.done;
    if (filter === "completed") return t.done;
    return true;
  });

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6
                     bg-gradient-to-br from-sky-200 via-indigo-200 to-purple-200
                     dark:from-slate-900 dark:via-slate-800 dark:to-slate-900
                     font-inter transition-colors">
      <div className="w-full max-w-md space-y-6 p-8 rounded-3xl bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl shadow-2xl">
        <header className="flex justify-between items-center">
          <h1 className="font-poppins text-3xl font-bold text-gray-900 dark:text-gray-100">
            Voice Tasks
          </h1>
          <ThemeToggle />
        </header>

        <TaskInput onAdd={addTask} />

        {/* filters */}
        <div className="flex gap-2 justify-center">
          {["all", "active", "completed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-full text-sm capitalize transition
                ${filter === f ? "bg-indigo-600 text-white" : "bg-gray-200 dark:bg-gray-700"}`}
            >
              {f}
            </button>
          ))}
        </div>

        <TaskList tasks={filtered} onToggle={toggleTask} onDelete={deleteTask} />
      </div>
    </main>
  );
}