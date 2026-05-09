import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { GameCard } from './components/GameCard';
import { GameModal } from './components/GameModal';
import { Footer } from './components/Footer';
import { GAMES, CATEGORIES } from './data';
import { Filter } from 'lucide-react';
import { StarOfDavid } from './components/StarOfDavid';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedGame, setSelectedGame] = useState(null);
  
  // Replace favorite system with local storage
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('gameFavorites') || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('gameFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const featuredGame = (GAMES || []).find(g => g.featured) || (GAMES || [])[0];

  const filteredGames = useMemo(() => {
    if (!GAMES) return [];
    let list = GAMES;
    
    if (selectedCategory === 'My Games') {
      list = GAMES.filter(game => favorites.includes(game.id));
    } else if (selectedCategory !== 'All') {
      list = GAMES.filter(game => game.category === selectedCategory);
    }

    return list.filter(game => {
      if (!game || !game.title) return false;
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (game.tags || []).some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesSearch;
    });
  }, [searchQuery, selectedCategory, favorites]);

  const handlePlayGame = (game) => {
    setSelectedGame(game);
  };

  const handleToggleFavorite = (gameId) => {
    setFavorites(prev => 
      prev.includes(gameId) 
        ? prev.filter(id => id !== gameId)
        : [...prev, gameId]
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onSearch={setSearchQuery} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {featuredGame && !searchQuery && selectedCategory === 'All' && (
          <Hero featuredGame={featuredGame} onPlay={handlePlayGame} />
        )}

        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-4xl tracking-tighter uppercase italic">
              {searchQuery ? `Results for "${searchQuery}"` : `Game Hub`}
            </h2>
            <div className="flex items-center gap-2 text-gaming-text-muted/70">
              <Filter size={16} />
              <span className="text-xs font-bold uppercase tracking-widest">{`${filteredGames.length} Titles Available`}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {['All', 'My Games', ...(CATEGORIES || []).filter(c => c !== 'All')].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`
                  px-6 py-2 rounded-full text-sm font-bold tracking-tight transition-all
                  ${selectedCategory === category 
                    ? 'bg-gaming-neon text-black shadow-[0_0_15px_rgba(157,229,255,0.3)]' 
                    : 'bg-gaming-surface border border-gaming-border text-gaming-text-muted hover:text-gaming-text-primary hover:border-gray-600'}
                `}
                id={`filter-${category.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredGames.map((game) => (
              <GameCard 
                key={game.id} 
                game={game} 
                onClick={handlePlayGame} 
                isLoggedIn={true} /* we allow features for anyone now */
                isFavorite={favorites.includes(game.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </AnimatePresence>
        </div>

        {filteredGames.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32 glass-morphism rounded-3xl border-dashed"
          >
            <div className="text-gaming-neon mb-6 flex justify-center animate-pulse">
              <StarOfDavid size={80} fill="currentColor" />
            </div>
            <h3 className="text-2xl font-display uppercase italic tracking-tight text-gaming-text-primary mb-2">Initialize Gaming Sequence</h3>
            <p className="text-gaming-text-muted/70 max-w-xs mx-auto">Upload or connect your game database to populate the Jews Games hub.</p>
          </motion.div>
        )}
      </main>

      <Footer />

      <AnimatePresence>
        {selectedGame && (
          <GameModal 
            game={selectedGame} 
            onClose={() => setSelectedGame(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
