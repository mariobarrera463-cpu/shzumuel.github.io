import { useState, useEffect, useRef } from 'react';
import { Search, Moon, Sun } from 'lucide-react';
import { StarOfDavid } from './StarOfDavid';
import { GAMES } from '../data';

export function Navbar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    // Check initial preference
    const isLightMode = document.documentElement.classList.contains('light');
    setIsDarkMode(!isLightMode);

    // Handle clicks outside suggestions
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    // Update suggestions
    if (searchTerm.trim().length > 0) {
      const filtered = GAMES.filter(game => 
        game.title.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 5); // Limit to 5 suggestions
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }

    return () => clearTimeout(timer);
  }, [searchTerm, onSearch]);

  const handleSuggestionClick = (title) => {
    setSearchTerm(title);
    setShowSuggestions(false);
  };

  return (
    <nav className="sticky top-0 z-[100] glass-morphism border-b border-gaming-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gaming-neon rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(157,229,255,0.4)]">
              <StarOfDavid className="text-black" size={24} />
            </div>
            <span className="font-display text-2xl tracking-tighter uppercase italic">
              Jews<span className="text-gaming-neon">Games</span>
            </span>
          </div>

          <div className="flex-1 md:flex-none md:max-w-md mx-4 md:mx-8 relative" ref={suggestionsRef}>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gaming-text-muted" />
            </div>
            <input
              type="text"
              className="block w-full pl-9 pr-3 py-1.5 border border-gaming-border rounded-full bg-gaming-dark/50 text-xs sm:text-sm text-gaming-text-primary placeholder-gaming-text-muted focus:outline-none focus:ring-1 focus:ring-gaming-neon focus:border-gaming-neon transition-all"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(searchTerm.length > 0)}
              id="search-input"
              autoComplete="off"
            />
            
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute left-0 right-0 mt-2 bg-gaming-surface border border-gaming-border rounded-xl shadow-2xl overflow-hidden z-[101] backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
                {suggestions.map((game) => (
                  <button
                    key={game.id}
                    className="w-full text-left px-4 py-3 text-sm text-gaming-text-primary hover:bg-gaming-neon/10 hover:text-gaming-neon transition-colors border-b border-gaming-border last:border-0 flex items-center gap-3"
                    onClick={() => handleSuggestionClick(game.title)}
                  >
                    <Search className="h-3 w-3 opacity-50" />
                    <span>{game.title}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 sm:p-2.5 rounded-full border border-gaming-border bg-gaming-dark hover:border-gaming-neon hover:text-gaming-neon transition-all"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <div className="hidden lg:block text-[10px] font-mono tracking-widest text-gaming-neon uppercase ml-2">
              Secure Link Active
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

