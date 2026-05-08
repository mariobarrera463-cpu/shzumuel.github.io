import { Search, User, LogOut, LogIn } from 'lucide-react';
import { StarOfDavid } from './StarOfDavid';
import { loginWithGoogle, logout } from '../lib/firebase';

export function Navbar({ onSearch, user, userData }) {
  return (
    <nav className="sticky top-0 z-50 glass-morphism border-b border-gaming-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gaming-neon rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(57,255,20,0.4)]">
              <StarOfDavid className="text-black" fill="currentColor" size={24} />
            </div>
            <span className="font-display text-2xl tracking-tighter uppercase italic">
              Jews<span className="text-gaming-neon">Games</span>
            </span>
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gaming-border rounded-full bg-gaming-dark/50 text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gaming-neon focus:border-gaming-neon transition-all"
              placeholder="Search unblocked games..."
              onChange={(e) => onSearch(e.target.value)}
              id="search-input"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:block text-[10px] font-mono tracking-widest text-gaming-neon uppercase mr-4">
              {user ? `Welcome, ${user.displayName}` : 'Secure Link Active'}
            </div>

            {user ? (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border border-gaming-neon overflow-hidden hidden sm:block">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gaming-surface flex items-center justify-center">
                      <User size={16} className="text-gaming-neon" />
                    </div>
                  )}
                </div>
                <button 
                  onClick={logout}
                  className="p-2 rounded-full bg-gaming-surface border border-gaming-border text-gray-400 hover:text-red-500 hover:border-red-500/50 transition-all"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button 
                onClick={loginWithGoogle}
                className="flex items-center gap-2 px-4 py-2 bg-gaming-neon text-black font-bold text-sm rounded-full shadow-[0_0_15px_rgba(57,255,20,0.3)] hover:scale-105 active:scale-95 transition-all"
              >
                <LogIn size={16} />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
