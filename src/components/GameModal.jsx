import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Star, Info, Share2, MessageCircle } from 'lucide-react';

export function GameModal({ game, onClose, user, onUpdatePlayTime }) {
  if (!game) return null;

  const rating = game.rating || (4.5 + Math.random() * 0.4).toFixed(1);

  useEffect(() => {
    if (!user || !onUpdatePlayTime) return;
    
    // Track play time every 10 seconds
    const interval = setInterval(() => {
      onUpdatePlayTime(user.uid, game.id, 10);
    }, 10000);

    return () => clearInterval(interval);
  }, [user, game.id, onUpdatePlayTime]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center p-2 sm:p-4 bg-black/95 backdrop-blur-md"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="relative w-full max-w-6xl bg-gaming-dark border border-gaming-border rounded-2xl sm:rounded-3xl overflow-y-auto custom-scrollbar shadow-2xl flex flex-col h-[98vh] sm:h-[95vh]"
          id="game-modal-container"
        >
          {/* Header - Sticky */}
          <div className="sticky top-0 z-20 flex items-center justify-between p-3 sm:p-4 border-b border-gaming-border bg-gaming-dark/80 backdrop-blur-md shrink-0">
            <div className="flex items-center gap-3">
              <img 
                src={game.thumbnail} 
                className="w-10 h-10 rounded-lg object-cover border border-gaming-border" 
                alt="" 
                referrerPolicy="no-referrer" 
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1614850523296-62c1995ecbed?q=80&w=800&auto=format&fit=crop';
                }}
              />
              <div>
                <h2 className="font-bold text-base sm:text-lg leading-none mb-1">{game.title}</h2>
                <div className="flex items-center gap-2 text-[10px] text-gray-500 uppercase font-bold tracking-widest">
                  <span className="text-gaming-neon">{game.category}</span>
                  <span>•</span>
                  <span>TBG95 Unblocked</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-1 sm:gap-2">
              <a 
                href={game.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/5" 
                title="Open in new tab"
              >
                <ExternalLink size={18} />
              </a>
              <div className="w-px h-6 bg-gaming-border mx-1 sm:mx-2" />
              <button 
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gaming-neon transition-colors rounded-full hover:bg-white/5"
                id="close-modal"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          <div className="flex-grow flex flex-col">
            {/* Game Implementation Area */}
            <div className="w-full aspect-video bg-black relative group shrink-0">
              <iframe 
                src={game.url} 
                className="w-full h-full border-none"
                style={{ 
                  border: 'none',
                  maxWidth: '100%',
                  height: '100%',
                  margin: 'auto'
                }}
                title={game.title}
                scrolling="no"
                allow={game.allow || "autoplay; fullscreen; keyboard"}
                allowFullScreen
              />
              
              <div className="absolute bottom-4 left-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-[10px] text-gray-400 bg-black/80 px-2 py-1 rounded-md backdrop-blur-sm border border-white/5">
                  Si el juego falla, pulsa el icono superior para abrir en otra pestaña
                </p>
              </div>
            </div>

            {/* Controls info bar */}
            <div className="px-4 py-3 bg-gaming-surface/50 border-b border-gaming-border flex flex-wrap gap-4 items-center shrink-0">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-gaming-dark border border-gaming-border rounded text-[10px] text-gaming-neon font-mono uppercase">Control</span>
                <span className="text-xs text-gray-400 font-medium">Usa ratón o teclado</span>
              </div>
              <div className="flex items-center gap-4 ml-auto">
                 <div className="flex items-center gap-1.5 text-yellow-500 bg-yellow-500/5 px-2 py-1 rounded-lg border border-yellow-500/10">
                    <Star size={14} fill="currentColor" />
                    <span className="text-sm font-bold">{rating}</span>
                 </div>
                 <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors">
                    <Share2 size={14} />
                    <span>Compartir</span>
                 </button>
              </div>
            </div>

            {/* Details Content */}
            <div className="p-6 sm:p-8 space-y-8 bg-gaming-dark">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <section>
                    <div className="flex items-center gap-2 mb-4">
                       <Info size={18} className="text-gaming-neon" />
                       <h3 className="text-lg font-bold text-white tracking-tight">Descripción del Juego</h3>
                    </div>
                    <p className="text-gray-400 leading-relaxed font-sans">
                      {game.description || `Prepárate para disfrutar de ${game.title} en TBG95. Este emocionante juego de ${game.category} te mantendrá entretenido por horas con sus mecánicas únicas y desafíos constantes.`}
                    </p>
                    <div className="mt-6 p-4 rounded-xl bg-gaming-surface border border-gaming-border/50 italic text-sm text-gray-500 border-l-4 border-l-gaming-neon">
                      "¡Vuelve cada día para descubrir nuevos juegos desbloqueados y llevar tus habilidades al siguiente nivel!"
                    </div>
                  </section>

                  <section>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4 font-mono">Etiquetas y Categorías</h4>
                    <div className="flex flex-wrap gap-2">
                       <span className="px-3 py-1 rounded-full bg-gaming-neon/10 border border-gaming-neon/20 text-gaming-neon text-[10px] font-bold uppercase tracking-wider">
                         {game.category}
                       </span>
                       {game.tags?.map(tag => (
                         <span key={tag} className="px-3 py-1 rounded-full bg-gaming-surface border border-gaming-border text-gray-400 text-[10px] font-bold uppercase tracking-wider">
                           {tag}
                         </span>
                       ))}
                    </div>
                  </section>
                </div>

                <div className="space-y-6">
                   <div className="p-6 rounded-2xl bg-gaming-surface border border-gaming-border space-y-4">
                      <h4 className="font-bold flex items-center gap-2 text-white">
                        <Star size={16} className="text-yellow-500" />
                        <span>Valoraciones</span>
                      </h4>
                      <div className="flex items-end gap-3 px-2">
                        <span className="text-4xl font-black text-white">{rating}</span>
                        <div className="flex flex-col pb-1">
                          <div className="flex gap-0.5 text-yellow-500 mb-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={12} fill={i < Math.floor(rating) ? "currentColor" : "none"} />
                            ))}
                          </div>
                          <span className="text-[10px] text-gray-500">Basado en +1.2k votos</span>
                        </div>
                      </div>
                      <button className="w-full py-2.5 rounded-xl bg-gaming-neon text-black font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_15px_rgba(57,255,20,0.2)]">
                        ¡Votar ahora!
                      </button>
                   </div>

                   <div className="p-6 rounded-2xl border border-dashed border-gaming-border/50 flex flex-col items-center text-center space-y-3">
                      <MessageCircle size={24} className="text-gray-600" />
                      <p className="text-xs text-gray-500">¿Tienes algún problema? <br/> ¡Cuéntanoslo en Discord!</p>
                      <button className="text-xs font-bold text-gaming-neon hover:underline">Unirse a la comunidad</button>
                   </div>
                </div>
              </div>

              {/* Related/Footer spacer */}
              <div className="pt-8 border-t border-gaming-border text-center">
                 <p className="text-[10px] text-gray-600 uppercase tracking-widest font-mono">
                    TBG95 - Experiencia Gaming Unblocked en Ultra HD
                 </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
