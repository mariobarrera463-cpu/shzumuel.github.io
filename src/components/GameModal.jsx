import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Maximize2, Share2, Heart, ExternalLink } from 'lucide-react';

export function GameModal({ game, onClose }) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!game) return null;

  const handleClose = () => {
    setIsPlaying(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="relative w-full max-w-6xl bg-gaming-dark border border-gaming-border rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[95vh]"
          id="game-modal-container"
        >
          <div className="flex items-center justify-between p-4 border-b border-gaming-border glass-morphism">
            <div className="flex items-center gap-3">
              <img src={game.thumbnail} className="w-10 h-10 rounded object-cover" alt="" referrerPolicy="no-referrer" />
              <div>
                <h2 className="font-bold text-lg">{game.title}</h2>
                <div className="flex items-center gap-2 text-[10px] text-gray-500 uppercase font-bold tracking-widest">
                  <span>{game.category}</span>
                  <span>•</span>
                  <span>Unblocked</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <a 
                href={game.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-white transition-colors" 
                title="Open in new tab if game doesn't load"
              >
                <ExternalLink size={18} />
              </a>
              <button className="p-2 text-gray-400 hover:text-white transition-colors" id="fullscreen-game">
                <Maximize2 size={18} />
              </button>
              <div className="w-px h-6 bg-gaming-border mx-2" />
              <button 
                onClick={handleClose}
                className="p-2 text-gray-400 hover:text-gaming-neon transition-colors"
                id="close-modal"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          <div className="flex-1 bg-black relative group overflow-hidden">
            {!isPlaying ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 z-10 bg-gaming-dark">
                <div className="text-center font-display text-4xl text-gaming-neon space-y-4">
                  <p>READY TO PLAY?</p>
                  <div className="w-24 h-1 bg-gaming-neon mx-auto rounded-full shadow-[0_0_10px_rgba(57,255,20,0.8)]" />
                </div>
                <div className="flex flex-col items-center gap-4">
                  <button 
                    onClick={() => setIsPlaying(true)}
                    className="bg-gaming-neon text-black font-black py-4 px-12 rounded-2xl text-xl hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(57,255,20,0.3)]"
                  >
                    START GAME
                  </button>
                  <a 
                    href={game.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-white text-xs underline underline-offset-4 decoration-gaming-neon/50 flex items-center gap-1.5 transition-colors"
                  >
                    <ExternalLink size={12} />
                    Open in new tab if embed fails
                  </a>
                </div>
              </div>
            ) : (
              <iframe 
                src={game.url} 
                className="w-full h-full border-none"
                style={{ 
                  border: game.customStyle?.border || (game.id === 'dashmetry' ? '5px solid #333' : 'none'),
                  borderRadius: game.customStyle?.borderRadius || (game.id === 'dashmetry' ? '15px' : '0px'),
                  maxWidth: game.customStyle?.maxWidth || '100%',
                  height: game.customStyle?.height || '100%',
                  boxShadow: game.customStyle?.boxShadow || 'none',
                  margin: 'auto'
                }}
                title={game.title}
                scrolling="no"
                allow={game.allow || "autoplay; fullscreen"}
                allowFullScreen
              />
            )}
            
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gaming-border overflow-hidden">
               <motion.div 
                 initial={{ x: '-100%' }}
                 animate={{ x: '100%' }}
                 transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                 className="w-1/2 h-full bg-gaming-neon"
               />
            </div>
          </div>

          <div className="p-4 bg-gaming-surface border-t border-gaming-border flex gap-8 items-center overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-3 whitespace-nowrap">
              <span className="px-2 py-1 bg-gaming-dark border border-gaming-border rounded text-xs font-mono uppercase">Click/Space</span>
              <span className="text-xs text-gray-400 uppercase font-bold">Jump</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
