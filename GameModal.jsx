import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Star, Info, Share2, MessageCircle, Maximize2, Minimize2, Smartphone } from 'lucide-react';

export function GameModal({ game, onClose }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);

  const [reviews, setReviews] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(`game_reviews_${game.id}`) || '[]');
    } catch {
      return [];
    }
  });

  const [myRating, setMyRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [myComment, setMyComment] = useState('');
  
  const rating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : (4.5).toFixed(1);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (myRating === 0) return;
    
    const newReview = {
      id: Date.now(),
      rating: myRating,
      comment: myComment,
      date: new Date().toLocaleDateString(),
      author: 'Anonymous Player'
    };
    
    const newReviews = [newReview, ...reviews];
    setReviews(newReviews);
    localStorage.setItem(`game_reviews_${game.id}`, JSON.stringify(newReviews));
    setMyRating(0);
    setMyComment('');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-0 sm:p-4 bg-black/95 backdrop-blur-md"
    >
      <motion.div
        ref={containerRef}
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className={`relative w-full max-w-6xl bg-gaming-dark border border-gaming-border ${isFullscreen ? 'h-screen w-screen border-none rounded-none' : 'overflow-y-auto h-[100dvh] sm:h-[95vh] rounded-none sm:rounded-3xl'} custom-scrollbar shadow-2xl flex flex-col`}
        id="game-modal-container"
      >
          {/* Header - Sticky */}
          <div className={`sticky top-0 z-20 flex items-center justify-between p-3 sm:p-4 border-b border-gaming-border bg-gaming-dark/80 backdrop-blur-md shrink-0 ${isFullscreen ? 'hidden' : ''}`}>
            <div className="flex items-center gap-3">
              <img 
                src={game.image || game.thumbnail} 
                className="w-10 h-10 rounded-lg object-cover border border-gaming-border" 
                alt="" 
                referrerPolicy="no-referrer" 
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1614850523296-62c1995ecbed?q=80&w=800&auto=format&fit=crop';
                }}
              />
              <div>
                <h2 className="font-bold text-base sm:text-lg leading-none mb-1 line-clamp-1">{game.title}</h2>
                <div className="flex items-center gap-2 text-[10px] text-gaming-text-muted/70 uppercase font-bold tracking-widest whitespace-nowrap">
                  <span className="text-gaming-neon">{game.category}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-1 sm:gap-2">
              <button 
                onClick={toggleFullscreen}
                className="p-2 text-gaming-text-muted hover:text-gaming-text-primary transition-colors rounded-full hover:bg-white/5"
                title="Fullscreen"
              >
                {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              </button>
              <a 
                href={game.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-gaming-text-muted hover:text-gaming-text-primary transition-colors rounded-full hover:bg-white/5 hidden sm:flex" 
                title="Open in new tab"
              >
                <ExternalLink size={18} />
              </a>
              <div className="w-px h-6 bg-gaming-border mx-1 sm:mx-2 hidden sm:block" />
              <button 
                onClick={onClose}
                className="p-2 text-gaming-text-muted hover:text-gaming-neon transition-colors rounded-full hover:bg-white/5"
                id="close-modal"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          <div className="flex-grow flex flex-col relative">
            {/* Fullscreen Overlay Close (Visible only in FS) */}
            {isFullscreen && (
               <button 
                 onClick={toggleFullscreen}
                 className="absolute top-4 right-4 z-50 p-2 bg-black/40 backdrop-blur-md rounded-full text-gaming-text-primary/50 hover:text-gaming-text-primary transition-colors border border-white/10"
               >
                 <Minimize2 size={24} />
               </button>
            )}

            {/* Game Implementation Area */}
            <div className={`w-full relative group shrink-0 ${isFullscreen ? 'h-full' : 'aspect-video'}`}>
              <iframe 
                className="game-iframe w-full h-full bg-black" 
                id="game-area" 
                src={game.url}
                allow="autoplay; fullscreen; camera; focus-without-user-activation *; monetization; gamepad; keyboard-map *; xr-spatial-tracking; clipboard-write; web-share; accelerometer; magnetometer; gyroscope; display-capture" 
                sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-scripts allow-same-origin allow-downloads" 
                scrolling="no" 
                frameBorder="0" 
                allowFullScreen
              />
              
              {!isFullscreen && (
                <div className="absolute bottom-4 left-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
                  <p className="text-[10px] text-gaming-text-muted bg-black/80 px-2 py-1 rounded-md backdrop-blur-sm border border-white/5">
                    Si el juego falla, pulsa el icono superior para abrir en otra pestaña
                  </p>
                </div>
              )}
            </div>

            {/* Content below game - hidden in fullscreen */}
            {!isFullscreen && (
              <>
                {/* Controls info bar */}
                <div className="px-4 py-3 bg-gaming-surface/50 border-b border-gaming-border flex flex-wrap gap-4 items-center shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-gaming-dark border border-gaming-border rounded text-[10px] text-gaming-neon font-mono uppercase">Control</span>
                    <span className="text-xs text-gaming-text-muted font-medium hidden sm:inline">Usa ratón o teclado</span>
                    <Smartphone size={14} className="sm:hidden text-gaming-text-muted" />
                    <span className="text-xs text-gaming-text-muted font-medium sm:hidden italic">Optimizado para móvil</span>
                  </div>
                  <div className="flex items-center gap-4 ml-auto">
                    <div className="flex items-center gap-1.5 text-yellow-500 bg-yellow-500/5 px-2 py-1 rounded-lg border border-yellow-500/10">
                        <Star size={14} fill="currentColor" />
                        <span className="text-sm font-bold">{rating}</span>
                    </div>
                    <button className="flex items-center gap-1.5 text-xs text-gaming-text-muted hover:text-gaming-text-primary transition-colors">
                        <Share2 size={14} />
                        <span className="hidden sm:inline">Compartir</span>
                    </button>
                    <button 
                      onClick={toggleFullscreen}
                      className="sm:hidden p-1.5 rounded-lg bg-gaming-neon/10 text-gaming-neon border border-gaming-neon/20"
                    >
                      <Maximize2 size={16} />
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
                           <h3 className="text-lg font-bold text-gaming-text-primary tracking-tight">Descripción del Juego</h3>
                        </div>
                        <p className="text-gaming-text-muted leading-relaxed font-sans text-sm sm:text-base">
                          {game.description || `Prepárate para disfrutar de ${game.title}. Este emocionante juego de ${game.category} te mantendrá entretenido por horas con sus mecánicas únicas y desafíos constantes.`}
                        </p>
                        <div className="mt-6 p-4 rounded-xl bg-gaming-surface border border-gaming-border/50 italic text-xs sm:text-sm text-gaming-text-muted/70 border-l-4 border-l-gaming-neon">
                          "¡Vuelve cada día para descubrir nuevos juegos desbloqueados y llevar tus habilidades al siguiente nivel!"
                        </div>
                      </section>

                      <section>
                        <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gaming-text-muted/70 mb-4 font-mono">Etiquetas y Categorías</h4>
                        <div className="flex flex-wrap gap-2">
                           <span className="px-3 py-1 rounded-full bg-gaming-neon/10 border border-gaming-neon/20 text-gaming-neon text-[10px] font-bold uppercase tracking-wider">
                             {game.category}
                           </span>
                           {game.tags?.map(tag => (
                             <span key={tag} className="px-3 py-1 rounded-full bg-gaming-surface border border-gaming-border text-gaming-text-muted text-[10px] font-bold uppercase tracking-wider">
                               {tag}
                             </span>
                           ))}
                        </div>
                      </section>
                      
                      <section className="pt-6">
                        <div className="flex items-center gap-2 mb-6">
                           <MessageCircle size={18} className="text-gaming-neon" />
                           <h3 className="text-lg font-bold text-gaming-text-primary tracking-tight">Reseñas de la comunidad</h3>
                        </div>
                        
                        <div className="space-y-6">
                          {/* Write review form */}
                          <div className="p-4 rounded-xl bg-gaming-surface border border-gaming-border">
                            <form onSubmit={handleSubmitReview} className="space-y-4">
                              <div>
                                <label className="block text-xs text-gaming-text-muted mb-2 font-bold uppercase tracking-wider">Tu Puntuación</label>
                                <div className="flex gap-1">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                      key={star}
                                      type="button"
                                      onMouseEnter={() => setHoverRating(star)}
                                      onMouseLeave={() => setHoverRating(0)}
                                      onClick={() => setMyRating(star)}
                                      className="focus:outline-none transition-transform hover:scale-110"
                                    >
                                      <Star 
                                        size={24} 
                                        className={(hoverRating || myRating) >= star ? "text-yellow-500" : "text-gray-600"} 
                                        fill={(hoverRating || myRating) >= star ? "currentColor" : "none"}
                                      />
                                    </button>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <label className="block text-xs text-gaming-text-muted mb-2 font-bold uppercase tracking-wider">Tu Comentario</label>
                                <textarea
                                  value={myComment}
                                  onChange={(e) => setMyComment(e.target.value)}
                                  className="w-full bg-gaming-dark border border-gaming-border rounded-lg p-3 text-sm text-gaming-text-primary placeholder-gray-600 focus:border-gaming-neon focus:ring-1 focus:ring-gaming-neon focus:outline-none transition-all resize-none"
                                  rows="3"
                                  placeholder="¿Qué te pareció este juego?"
                                  required
                                />
                              </div>
                              <button 
                                type="submit" 
                                disabled={myRating === 0}
                                className="px-6 py-2 bg-gaming-neon text-black font-bold text-sm rounded-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                Publicar reseña
                              </button>
                            </form>
                          </div>

                          {/* List of reviews */}
                          <div className="space-y-4">
                            {reviews.length === 0 ? (
                              <p className="text-gaming-text-muted/70 text-sm italic">No hay reseñas todavía. ¡Sé el primero en comentar!</p>
                            ) : (
                              reviews.map((rev) => (
                                <div key={rev.id} className="p-4 rounded-xl bg-gaming-surface/50 border border-gaming-border/50">
                                  <div className="flex flex-wrap gap-2 items-center justify-between mb-2">
                                    <span className="font-bold text-sm text-gaming-neon">{rev.author}</span>
                                    <span className="text-xs text-gaming-text-muted/70">{rev.date}</span>
                                  </div>
                                  <div className="flex gap-0.5 text-yellow-500 mb-3">
                                    {[...Array(5)].map((_, i) => (
                                      <Star key={i} size={12} fill={i < rev.rating ? "currentColor" : "none"} />
                                    ))}
                                  </div>
                                  <p className="text-sm text-gray-300 leading-relaxed">
                                    {rev.comment}
                                  </p>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </section>
                    </div>

                    <div className="space-y-6">
                       <div className="p-6 rounded-2xl bg-gaming-surface border border-gaming-border space-y-4 sticky top-6">
                          <h4 className="font-bold flex items-center gap-2 text-gaming-text-primary">
                            <Star size={16} className="text-yellow-500" />
                            <span>Valoración Global</span>
                          </h4>
                          <div className="flex items-end gap-3 px-2">
                            <span className="text-4xl font-black text-gaming-text-primary">{rating}</span>
                            <div className="flex flex-col pb-1">
                              <div className="flex gap-0.5 text-yellow-500 mb-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} size={12} fill={i < Math.floor(rating) ? "currentColor" : "none"} />
                                ))}
                              </div>
                              <span className="text-[10px] text-gaming-text-muted/70">
                                Basado en {Math.max(reviews.length, 1).toLocaleString()} voto{reviews.length !== 1 ? 's' : ''}
                              </span>
                            </div>
                          </div>
                       </div>
                    </div>
                  </div>

                  {/* Related/Footer spacer */}
                  <div className="pt-8 border-t border-gaming-border text-center">
                     <p className="text-[10px] text-gray-600 uppercase tracking-widest font-mono">
                        TBG95 - Experiencia Gaming Unblocked
                     </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    );
}
