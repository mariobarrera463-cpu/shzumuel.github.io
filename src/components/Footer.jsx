import { Github, Twitter, MessageCircle } from 'lucide-react';
import { StarOfDavid } from './StarOfDavid';

export function Footer() {
  return (
    <footer className="mt-20 border-t border-gaming-border bg-gaming-surface">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-gaming-neon rounded-lg flex items-center justify-center">
                <StarOfDavid className="text-black" fill="currentColor" size={20} />
              </div>
              <span className="font-display text-xl tracking-tighter uppercase italic">
                Jews<span className="text-gaming-neon">Games</span>
              </span>
            </div>
            <p className="text-gray-400 max-w-sm mb-6">
              The premium unblocked games destination. Experience fast loading, clean UI, and the best classic and modern titles without restrictions.
            </p>
            <div className="flex gap-4">
              <button className="p-2 bg-gaming-dark border border-gaming-border rounded-lg text-gray-400 hover:text-white hover:border-white transition-all">
                <Github size={20} />
              </button>
              <button className="p-2 bg-gaming-dark border border-gaming-border rounded-lg text-gray-400 hover:text-gaming-blue hover:border-gaming-blue transition-all">
                <Twitter size={20} />
              </button>
              <button className="p-2 bg-gaming-dark border border-gaming-border rounded-lg text-gray-400 hover:text-gaming-purple hover:border-gaming-purple transition-all">
                <MessageCircle size={20} />
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Explore</h4>
            <ul className="space-y-4 text-gray-400 text-sm font-medium">
              <li><a href="#" className="hover:text-gaming-neon transition-colors">Popular Games</a></li>
              <li><a href="#" className="hover:text-gaming-neon transition-colors">New Releases</a></li>
              <li><a href="#" className="hover:text-gaming-neon transition-colors">Categories</a></li>
              <li><a href="#" className="hover:text-gaming-neon transition-colors">Developer Portal</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Support</h4>
            <ul className="space-y-4 text-gray-400 text-sm font-medium">
              <li><a href="#" className="hover:text-gaming-neon transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-gaming-neon transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-gaming-neon transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gaming-neon transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gaming-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">
            © 2024 JewsGames Unblocked. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-gray-500 text-[10px] font-mono tracking-widest uppercase">System Status: <span className="text-gaming-neon">Online</span></span>
            <span className="text-gray-500 text-[10px] font-mono tracking-widest uppercase">Region: <span className="text-gaming-blue">US-East</span></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
