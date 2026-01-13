
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShoppingBag, Search, User, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  currentView: string;
  setView: (view: string) => void;
  isLoggedIn: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartClick, currentView, setView, isLoggedIn }) => {
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(scrollY, [0, 50], ["rgba(1, 1, 1, 0)", "rgba(1, 1, 1, 0.95)"]);
  const borderBottom = useTransform(scrollY, [0, 50], ["1px solid rgba(255,255,255,0)", "1px solid rgba(255,255,255,0.1)"]);

  return (
    <motion.nav 
      style={{ backgroundColor, borderBottom }}
      className="fixed top-0 left-0 right-0 z-[150] px-8 h-20 flex items-center justify-between backdrop-blur-md"
    >
      <div className="flex items-center gap-12">
        <motion.div 
          onClick={() => setView('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-6 h-6 bg-white flex items-center justify-center group-hover:bg-[#DFFF00] transition-colors">
            <div className="w-2 h-2 bg-black" />
          </div>
          <h1 className="text-xl font-black uppercase tracking-tighter">
            AXON <span className="text-[#DFFF00]">PRIME</span>
          </h1>
        </motion.div>
        
        <div className="hidden lg:flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
          <button onClick={() => setView('home')} className={`hover:text-white transition-colors ${currentView === 'home' ? 'text-white' : ''}`}>Terminal</button>
          <a href="#" className="hover:text-white transition-colors">Nodes</a>
          <a href="#" className="hover:text-white transition-colors">Protocols</a>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="text-slate-500 hover:text-white transition-colors">
          <Search size={18} strokeWidth={3} />
        </button>
        
        <div className="w-px h-4 bg-white/10 mx-2" />

        {isLoggedIn ? (
          <button 
            onClick={() => setView('profile')}
            className={`flex items-center gap-2 group transition-colors ${currentView === 'profile' ? 'text-[#DFFF00]' : 'text-slate-500 hover:text-white'}`}
          >
            <ShieldCheck size={18} />
            <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">Clearance: Level 4</span>
          </button>
        ) : (
          <button 
            onClick={() => setView('auth')}
            className={`flex items-center gap-2 transition-colors ${currentView === 'auth' ? 'text-[#DFFF00]' : 'text-slate-500 hover:text-white'}`}
          >
            <User size={18} />
            <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">Initialize</span>
          </button>
        )}

        <button 
          onClick={onCartClick}
          className="bg-white text-black px-4 py-2 flex items-center gap-3 group hover:bg-[#DFFF00] transition-all"
        >
          <ShoppingBag size={18} strokeWidth={2.5} />
          <span className="text-[10px] font-black uppercase tracking-widest">
            [{cartCount}]
          </span>
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
