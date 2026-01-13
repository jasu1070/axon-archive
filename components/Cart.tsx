
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ChevronRight, Vault } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onRemove, onUpdateQuantity }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[200]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-lg bg-[#020202] border-l border-white/10 z-[210] flex flex-col cursor-none"
          >
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Vault size={20} className="text-cyan-400" />
                <h2 className="text-xl font-black uppercase tracking-[0.3em]">Hardware Vault</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/5 transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-8 space-y-12">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-20">
                  <Vault size={40} />
                  <p className="text-[10px] font-black uppercase tracking-widest">Vault Empty</p>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={item.id} 
                    className="flex gap-8 group"
                  >
                    <div className="w-24 h-24 bg-white/5 border border-white/5 shrink-0 p-2">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain filter grayscale" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-lg font-black uppercase tracking-tighter">{item.name}</h4>
                        <button onClick={() => onRemove(item.id)} className="text-slate-600 hover:text-rose-500 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-6">Unit ID: {item.id.padStart(3, '0')}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-white/10 px-3 py-1 gap-6">
                          <button onClick={() => onUpdateQuantity(item.id, -1)} className="text-slate-500 hover:text-white">-</button>
                          <span className="text-[10px] font-black w-4 text-center">{item.quantity}</span>
                          <button onClick={() => onUpdateQuantity(item.id, 1)} className="text-slate-500 hover:text-white">+</button>
                        </div>
                        <span className="text-sm font-black text-cyan-400">${item.price * item.quantity}</span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            <div className="p-10 bg-white/5 border-t border-white/5 space-y-10">
              <div className="space-y-4">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                  <span>Subtotal</span>
                  <span className="text-white">${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                  <span>Allocation</span>
                  <span className="text-cyan-400">AUTHORIZED</span>
                </div>
                <div className="flex justify-between text-2xl font-black text-white pt-6 border-t border-white/10 uppercase tracking-tighter">
                  <span>Total</span>
                  <span>${total.toLocaleString()}</span>
                </div>
              </div>
              
              <button 
                disabled={items.length === 0}
                className="w-full py-6 bg-cyan-400 text-black font-black uppercase text-xs tracking-[0.3em] hover:bg-white transition-all disabled:opacity-20 flex items-center justify-center gap-4"
              >
                Execute Transaction
                <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;
