
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, ExternalLink, Sparkles, Loader2, Cpu } from 'lucide-react';
import { getMarketInsights } from '../services/geminiService';
import { AIResponse } from '../types';

const AISmartAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<AIResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsLoading(true);
    const result = await getMarketInsights(query);
    setResponse(result);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-10 right-10 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: 20 }}
            className="absolute bottom-24 right-0 w-[400px] glass-premium rounded-none border border-cyan-500/30 overflow-hidden flex flex-col shadow-2xl shadow-cyan-500/10"
          >
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black">
              <div className="flex items-center gap-3">
                <Cpu size={16} className="text-cyan-400" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Lumina Neural Node</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white transition-colors">
                <X size={16} />
              </button>
            </div>

            <div className="p-8 h-[400px] overflow-y-auto bg-black/40">
              {!response && !isLoading && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="w-20 h-20 rounded-full border border-cyan-400/20 flex items-center justify-center"
                  >
                    <Sparkles size={24} className="text-cyan-400/40" />
                  </motion.div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-loose">
                    Awaiting instructions. <br />Input query for market grounding.
                  </p>
                </div>
              )}

              {isLoading && (
                <div className="h-full flex flex-col items-center justify-center space-y-4">
                  <Loader2 size={24} className="animate-spin text-cyan-400" />
                  <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-[0.2em]">Synchronizing Real-Time Data...</p>
                </div>
              )}

              {response && !isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                  <div className="text-sm font-medium leading-relaxed text-slate-300 first-letter:text-cyan-400 first-letter:text-2xl first-letter:font-black">
                    {response.text}
                  </div>
                  {response.sources.length > 0 && (
                    <div className="pt-6 border-t border-white/5">
                      <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-4">Verification Nodes</p>
                      <div className="grid grid-cols-1 gap-2">
                        {response.sources.map((source, i) => (
                          <a key={i} href={source.web?.uri} target="_blank" className="flex items-center justify-between p-3 bg-white/5 border border-white/5 hover:border-cyan-400/30 transition-colors group">
                            <span className="text-[10px] font-bold truncate pr-4">{source.web?.title}</span>
                            <ExternalLink size={10} className="text-slate-600 group-hover:text-cyan-400" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="p-6 bg-black flex gap-4 border-t border-white/10">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="PROMPT SYSTEM..."
                className="flex-grow bg-transparent border-none text-[11px] font-bold uppercase tracking-widest outline-none placeholder:text-slate-800"
              />
              <button type="submit" className="text-cyan-400 hover:text-white transition-colors">
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative group"
      >
        <div className="absolute inset-0 bg-cyan-400 blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
        <div className="w-16 h-16 glass-premium rounded-none border border-cyan-400/30 flex items-center justify-center relative overflow-hidden">
          {isOpen ? (
            <X size={24} className="text-cyan-400" />
          ) : (
            <div className="relative">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 rounded-full border-t border-cyan-400/50"
              />
              <Cpu size={16} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-400" />
            </div>
          )}
        </div>
      </motion.button>
    </div>
  );
};

export default AISmartAssistant;
