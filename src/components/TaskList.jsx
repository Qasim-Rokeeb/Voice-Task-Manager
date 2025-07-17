export default function TaskList({ tasks, onToggle, onDelete }) {
  if (!tasks.length) return <p className="text-center text-gray-500 dark:text-gray-400">No tasks yet.</p>;

  return (
    <ul className="space-y-2">
      {tasks.map(task => (
        <li key={task.id} className="flex justify-between items-center p-3 rounded bg-gray-100 dark:bg-gray-800">
          <div
            onClick={() => onToggle(task.id)}
            className={`flex-1 cursor-pointer ${task.done ? 'line-through text-gray-400' : ''}`}
          >
            {task.text}
          </div>
          <button onClick={() => onDelete(task.id)} className="text-red-500 hover:text-red-700">🗑️</button>
        </li>
      ))}
    </ul>
  );
}
