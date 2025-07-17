import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ theme, setTheme }) {
  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="text-xl"
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? <Sun className="text-yellow-400" /> : <Moon className="text-zinc-800" />}
    </button>
  );
}
