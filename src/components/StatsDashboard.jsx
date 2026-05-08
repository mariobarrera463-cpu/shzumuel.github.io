import { motion } from 'motion/react';
import { Trophy, Clock, Zap, Star, LayoutGrid, ArrowRight } from 'lucide-react';
import { GAMES } from '../data';

export function StatsDashboard({ user, userData, onPlayGame }) {
  if (!user || !userData) return null;

  const playTime = userData.playTime || {};
  const favorites = userData.favorites || [];

  // Calculate stats
  const totalSeconds = Object.values(playTime).reduce((acc, val) => acc + val, 0);
  const totalHours = Math.floor(totalSeconds / 3600);
  const totalMinutes = Math.floor((totalSeconds % 3600) / 60);

  // Most played games
  const mostPlayed = Object.entries(playTime)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([id, time]) => {
      const game = GAMES.find(g => g.id === id);
      return { ...game, time };
    })
    .filter(g => g.title);

  // Recommendations
  const favoriteCategories = [...new Set(
    favorites.map(id => GAMES.find(g => g.id === id)?.category).filter(Boolean)
  )];

  const recommended = GAMES.filter(game => 
    favoriteCategories.includes(game.category) && 
    !favorites.includes(game.id)
  ).slice(0, 4);

  const formatTime = (seconds) => {
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
    return `${(seconds / 3600).toFixed(1)}h`;
  };

  return (
    <div className="space-y-10 py-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gaming-surface border border-gaming-border p-6 rounded-2xl flex items-center gap-4"
        >
          <div className="p-3 bg-gaming-neon/10 rounded-xl">
            <Clock className="text-gaming-neon" size={24} />
          </div>
          <div>
            <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">Tiempo Total</div>
            <div className="text-2xl font-black text-white">
              {totalHours}h {totalMinutes}m
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gaming-surface border border-gaming-border p-6 rounded-2xl flex items-center gap-4"
        >
          <div className="p-3 bg-purple-500/10 rounded-xl">
            <Trophy className="text-purple-500" size={24} />
          </div>
          <div>
            <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">Juegos Favoritos</div>
            <div className="text-2xl font-black text-white">
              {favorites.length}
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gaming-surface border border-gaming-border p-6 rounded-2xl flex items-center gap-4"
        >
          <div className="p-3 bg-blue-500/10 rounded-xl">
            <Zap className="text-blue-500" size={24} />
          </div>
          <div>
            <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">Más Jugado</div>
            <div className="text-lg font-black text-white truncate max-w-[150px]">
              {mostPlayed[0]?.title || 'Sin datos'}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Play Time Breakdown */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <LayoutGrid className="text-gaming-neon" size={20} />
            <h3 className="text-xl font-bold text-white">Ranking de Tiempo</h3>
          </div>
          <div className="space-y-3">
            {mostPlayed.length > 0 ? mostPlayed.map((game, index) => (
              <div 
                key={game.id}
                className="flex items-center gap-4 p-4 bg-gaming-surface border border-gaming-border rounded-xl group hover:border-gaming-neon/30 transition-all"
              >
                <div className="text-xl font-black text-gaming-border group-hover:text-gaming-neon/50 transition-colors w-6">
                  #{index + 1}
                </div>
                <img src={game.thumbnail} className="w-12 h-12 rounded-lg object-cover" alt="" referrerPolicy="no-referrer" />
                <div className="flex-1">
                  <div className="text-sm font-bold text-white">{game.title}</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest">{game.category}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-black text-gaming-neon">{formatTime(game.time)}</div>
                  <div className="text-[10px] text-gray-600 font-mono">PLAYTIME</div>
                </div>
              </div>
            )) : (
              <div className="p-10 border border-dashed border-gaming-border rounded-2xl text-center text-gray-500">
                Aún no has jugado lo suficiente para generar estadísticas.
              </div>
            )}
          </div>
        </section>

        {/* Recommendations */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Star className="text-yellow-500" size={20} />
            <h3 className="text-xl font-bold text-white">Recomendados para ti</h3>
          </div>
          {recommended.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recommended.map(game => (
                <div 
                  key={game.id}
                  onClick={() => onPlayGame(game)}
                  className="relative overflow-hidden rounded-xl bg-gaming-surface border border-gaming-border group cursor-pointer hover:border-gaming-neon/50 transition-all aspect-[4/3]"
                >
                  <img src={game.thumbnail} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-500" alt="" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-sm font-bold text-white mb-1">{game.title}</div>
                    <div className="flex items-center justify-between text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                      <span>{game.category}</span>
                      <ArrowRight size={14} className="text-gaming-neon opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
             <div className="p-10 border border-dashed border-gaming-border rounded-2xl text-center space-y-4">
                <p className="text-gray-500 text-sm">Añade juegos a favoritos para recibir recomendaciones personalizadas.</p>
                <div className="flex justify-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gaming-surface border border-gaming-border flex items-center justify-center">
                    <Star size={12} className="text-gray-600" />
                  </div>
                  <ArrowRight size={16} className="text-gray-700" />
                   <div className="w-16 h-8 rounded-full bg-gaming-neon/20 border border-gaming-neon/40" />
                </div>
             </div>
          )}
        </section>
      </div>
    </div>
  );
}
