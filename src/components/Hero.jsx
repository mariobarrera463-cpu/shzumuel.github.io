import { useState } from 'react';
import { motion } from 'motion/react';
import { Play, TrendingUp } from 'lucide-react';

export function Hero({ featuredGame, onPlay }) {
  const [imgSrc, setImgSrc] = useState(featuredGame?.thumbnail);
  const [hasError, setHasError] = useState(false);

  if (!featuredGame) return null;
  
  const fallbackImage = 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop';

  return (
    <div className="relative w-full h-[500px] rounded-3xl overflow-hidden mb-12 border border-gaming-border bg-gaming-surface">
      {!hasError ? (
        <img
          src={imgSrc}
          alt="Featured Game"
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
          onError={() => {
            setHasError(true);
            setImgSrc(fallbackImage);
          }}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <span className="text-[200px] font-display text-gaming-neon uppercase italic leading-none select-none">
            {featuredGame.title}
          </span>
        </div>
      )}
      
      <div className="absolute inset-0 bg-gradient-to-r from-gaming-dark via-gaming-dark/60 to-transparent" />
      
      <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 mb-4"
        >
          <div className="px-3 py-1 bg-gaming-neon/10 rounded-full border border-gaming-neon/30 flex items-center gap-1.5">
            <TrendingUp size={14} className="text-gaming-neon" />
            <span className="text-gaming-neon text-xs font-bold uppercase tracking-widest">Trending Now</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display text-6xl md:text-8xl tracking-tighter uppercase italic leading-[0.85] mb-6"
        >
          {featuredGame.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-300 text-lg mb-8 line-clamp-3"
        >
          {featuredGame.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex gap-4"
        >
          <button
            onClick={() => onPlay(featuredGame)}
            className="flex items-center gap-2 bg-gaming-neon text-black font-bold py-4 px-8 rounded-xl hover:scale-105 active:scale-95 transition-transform group"
            id="play-hero-game"
          >
            <Play size={20} fill="currentColor" />
            PLAY NOW
          </button>
          <button
            className="flex items-center gap-2 bg-gaming-surface border border-gaming-border text-white font-bold py-4 px-8 rounded-xl hover:bg-gaming-border transition-colors"
            id="more-info-hero"
          >
            MORE INFO
          </button>
        </motion.div>
      </div>

      <div className="absolute inset-0 gaming-grid opacity-20 pointer-events-none" />
    </div>
  );
}
