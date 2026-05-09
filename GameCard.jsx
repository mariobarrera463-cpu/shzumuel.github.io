import { useState } from 'react';
import { motion } from 'motion/react';
import { Play, Star, Heart } from 'lucide-react';

export function GameCard({ game, onClick, isFavorite, onToggleFavorite, isLoggedIn }) {
  const [imgSrc, setImgSrc] = useState(game.image || game.thumbnail);
  const [hasError, setHasError] = useState(false);
  const [isImgLoaded, setIsImgLoaded] = useState(false);

  const [isHovered, setIsHovered] = useState(false);

  const fallbackImage = `https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-gaming-surface rounded-xl overflow-hidden border border-gaming-border hover:border-gaming-neon transition-colors cursor-pointer"
      onClick={() => onClick(game)}
      id={`game-card-${game.id}`}
    >
      <div className="relative aspect-video overflow-hidden bg-gaming-surface">
        {!isImgLoaded && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gaming-surface border-b border-gaming-border z-0">
             <div className="w-8 h-8 rounded-full border-2 border-gaming-neon border-t-transparent animate-spin"></div>
          </div>
        )}
        {!hasError ? (
          <img
            src={imgSrc}
            alt={game.title}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 relative z-10 ${!isImgLoaded ? 'opacity-0' : 'opacity-100'}`}
            referrerPolicy="no-referrer"
            onLoad={() => setIsImgLoaded(true)}
            onError={() => {
              setHasError(true);
              setImgSrc(fallbackImage);
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gaming-surface group-hover:bg-gaming-neon/5 transition-colors">
            <span className="text-4xl font-display text-gaming-neon/20 group-hover:text-gaming-neon/40 uppercase italic">
              {game.title.charAt(0)}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gaming-dark/80 to-transparent" />
        
        {/* Favorite Button */}
        {isLoggedIn && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(game.id);
            }}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-gaming-text-primary hover:text-gaming-neon transition-all z-10"
          >
            <Heart size={14} fill={isFavorite ? "#9DE5FF" : "none"} color={isFavorite ? "#9DE5FF" : "currentColor"} />
          </button>
        )}

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-12 h-12 bg-gaming-neon rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(157,229,255,0.6)]">
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
            <span>{game.rating || (4.5 + Math.random() * 0.5).toFixed(1)}</span>
          </div>
        </div>
        <p className="text-gaming-text-muted text-xs line-clamp-2 mb-3">
          {game.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {(game.tags || []).slice(0, 2).map((tag) => (
            <span key={tag} className="text-[10px] font-mono text-gaming-text-muted/70 border border-gaming-border px-1.5 rounded">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
