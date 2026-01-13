
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import AISmartAssistant from './components/AISmartAssistant';
import Cart from './components/Cart';
import CustomCursor from './components/CustomCursor';
import Auth from './components/Auth';
import Profile from './components/Profile';
import { INITIAL_PRODUCTS } from './constants';
import { Product, CartItem } from './types';

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentView, setView] = useState<string>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const categories = ['All', ...new Set(INITIAL_PRODUCTS.map(p => p.category))];

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const filteredProducts = selectedCategory === 'All' 
    ? INITIAL_PRODUCTS 
    : INITIAL_PRODUCTS.filter(p => p.category === selectedCategory);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setView('home');
  };

  return (
    <div className="min-h-screen bg-[#010101] text-white selection:bg-[#DFFF00]/30">
      <CustomCursor />
      
      <Navbar 
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} 
        onCartClick={() => setIsCartOpen(true)}
        currentView={currentView}
        setView={setView}
        isLoggedIn={isLoggedIn}
      />
      
      <AnimatePresence mode="wait">
        {currentView === 'home' && (
          <motion.main
            key="home"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5, ease: "anticipate" }}
          >
            <Hero />
            
            <section className="px-10 py-32 max-w-screen-2xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-3 text-[#DFFF00] text-[10px] font-black uppercase tracking-[0.4em]">
                    <div className="w-8 h-[2px] bg-[#DFFF00]" />
                    Hardware Inventory
                  </div>
                  <h2 className="text-7xl font-black uppercase tracking-tighter leading-none">
                    Axon <span className="text-transparent stroke-white" style={{ WebkitTextStroke: '2px white' }}>Archive</span>
                  </h2>
                </motion.div>

                <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all border-2 ${
                        selectedCategory === cat 
                          ? 'bg-[#DFFF00] text-black border-[#DFFF00]' 
                          : 'bg-transparent text-slate-500 border-white/5 hover:border-white/20 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px bg-white/5 border border-white/5"
              >
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onAddToCart={addToCart} 
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            </section>

            {/* Neural Section */}
            <section className="px-10 py-48 bg-[#000000] relative overflow-hidden border-t border-white/5">
              <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-24 items-center">
                <div className="w-full lg:w-1/2 relative group">
                  <div className="aspect-square glass-heavy border-4 border-white/5 flex items-center justify-center relative">
                    <div className="absolute inset-4 border border-white/5 group-hover:border-[#DFFF00]/20 transition-colors" />
                    <div className="w-24 h-24 border-2 border-[#DFFF00] flex items-center justify-center rotate-45 animate-pulse">
                       <div className="w-12 h-12 bg-white flex items-center justify-center">
                          <div className="w-4 h-4 bg-black" />
                       </div>
                    </div>
                  </div>
                </div>

                <div className="w-full lg:w-1/2 space-y-12">
                  <h3 className="text-6xl font-black uppercase leading-[0.9] tracking-tighter">
                    Synthetic <br />
                    <span className="text-[#DFFF00]">Reasoning Hub</span>
                  </h3>
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-xs leading-loose">
                    The Axon Hub operates at the intersection of commercial utility and neural verification. Every acquisition is logged in the permanent ledger of the Prime Network.
                  </p>
                  <div className="flex gap-12">
                    <div>
                      <h4 className="text-[#DFFF00] font-black uppercase text-xs tracking-widest mb-2">Network</h4>
                      <p className="text-slate-700 text-[10px] font-black uppercase">Mainnet v4.2</p>
                    </div>
                    <div>
                      <h4 className="text-[#DFFF00] font-black uppercase text-xs tracking-widest mb-2">Protocol</h4>
                      <p className="text-slate-700 text-[10px] font-black uppercase">Proof-of-Acquire</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </motion.main>
        )}

        {currentView === 'auth' && (
          <motion.div
            key="auth"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ type: "spring", damping: 20 }}
          >
            <Auth onLoginSuccess={handleLoginSuccess} />
          </motion.div>
        )}

        {currentView === 'profile' && (
          <motion.div
            key="profile"
            initial={{ opacity: 0, filter: "blur(20px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4 }}
          >
            <Profile />
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="px-10 py-32 border-t border-white/5 bg-[#000000]">
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-start gap-24">
          <div className="max-w-md">
            <h1 className="text-4xl font-black uppercase tracking-tighter mb-8">AXON <span className="text-[#DFFF00]">PRIME</span></h1>
            <p className="text-slate-600 font-bold uppercase tracking-widest text-[10px] leading-relaxed">
              Engineering the next epoch of decentralized commerce. <br />Powered by the Axon Neural Grid.
            </p>
          </div>
          <div className="flex flex-wrap gap-24">
            <div className="space-y-6">
              <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Registry</h5>
              <ul className="space-y-4 text-slate-700 text-[10px] font-black uppercase tracking-widest">
                <li className="hover:text-[#DFFF00] cursor-pointer transition-colors">Nodes</li>
                <li className="hover:text-[#DFFF00] cursor-pointer transition-colors">Clearance</li>
                <li className="hover:text-[#DFFF00] cursor-pointer transition-colors">Manifesto</li>
              </ul>
            </div>
            <div className="space-y-6">
              <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Security</h5>
              <ul className="space-y-4 text-slate-700 text-[10px] font-black uppercase tracking-widest">
                <li className="hover:text-[#DFFF00] cursor-pointer transition-colors">Encryption</li>
                <li className="hover:text-[#DFFF00] cursor-pointer transition-colors">Ledger</li>
                <li className="hover:text-[#DFFF00] cursor-pointer transition-colors">Privacy Hub</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />
      
      <AISmartAssistant />
    </div>
  );
};

export default App;
