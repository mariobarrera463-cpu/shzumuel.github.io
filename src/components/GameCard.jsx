import { motion } from 'motion/react';
import { Play, Star } from 'lucide-react';

export function GameCard({ game, onClick }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      className="group relative bg-gaming-surface rounded-xl overflow-hidden border border-gaming-border hover:border-gaming-neon transition-colors cursor-pointer"
      onClick={() => onClick(game)}
      id={`game-card-${game.id}`}
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={game.thumbnail}
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gaming-dark/80 to-transparent" />
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-12 h-12 bg-gaming-neon rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(57,255,20,0.6)]">
            <Play className="text-black fill-black ml-1" size={24} />
          </div>
        </div>

        <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[10px] font-bold uppercase tracking-wider text-gaming-neon border border-gaming-neon/30">
          {game.category}
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-lg leading-tight group-hover:text-gaming-neon transition-colors">
            {game.title}
          </h3>
          <div className="flex items-center gap-1 text-xs text-yellow-500">
            <Star size={12} fill="currentColor" />
            <span>4.8</span>
          </div>
        </div>
        <p className="text-gray-400 text-xs line-clamp-2 mb-3">
          {game.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {game.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-[10px] font-mono text-gray-500 border border-gaming-border px-1.5 rounded">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
