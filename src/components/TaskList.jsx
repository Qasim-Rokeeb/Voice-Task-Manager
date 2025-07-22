import { FiCheck, FiEdit2, FiTrash2 } from "react-icons/fi";

export default function TaskList({ tasks, onToggle, onDelete }) {
  if (!tasks.length)
    return <p className="text-center text-gray-500 dark:text-gray-400">No tasks yet.</p>;

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex items-center gap-3 p-3 rounded-xl bg-white/40 dark:bg-gray-700/40 backdrop-blur-md"
        >
          <button onClick={() => onToggle(task.id)} className="shrink-0">
            {task.done ? (
              <FiCheck className="w-5 h-5 text-emerald-500" />
            ) : (
              <div className="w-5 h-5 border-2 border-gray-400 rounded-full" />
            )}
          </button>
          <span className={`flex-1 ${task.done ? "line-through text-gray-500" : ""}`}>
            {task.text}
          </span>
          <button onClick={() => onDelete(task.id)} title="Delete">
            <FiTrash2 className="w-4 h-4 text-rose-500 hover:text-rose-700" />
          </button>
        </li>
      ))}
    </ul>
  );
}