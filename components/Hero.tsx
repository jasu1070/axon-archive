
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const yTranslate = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative h-[110vh] flex flex-col items-center justify-center overflow-hidden pt-20 bg-[#010101]">
      {/* Background Visuals */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] border-[40px] border-white/5 rounded-full"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(223,255,0,0.02)_0%,rgba(1,1,1,1)_80%)]" />
      </div>

      <motion.div
        style={{ y: yTranslate, opacity }}
        className="relative z-10 flex flex-col items-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[#DFFF00] text-[10px] font-black uppercase mb-8 tracking-[0.5em] flex items-center gap-4"
        >
          <div className="w-12 h-px bg-[#DFFF00]" />
          System Initialization Active
          <div className="w-12 h-px bg-[#DFFF00]" />
        </motion.div>

        <h1 className="text-[14vw] font-black leading-[0.8] tracking-tighter text-center uppercase">
          <motion.span 
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="block"
          >
            AXON
          </motion.span>
          <motion.span 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="block text-transparent stroke-white"
            style={{ WebkitTextStroke: '2px rgba(255,255,255,0.8)' }}
          >
            PRIME
          </motion.span>
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 flex flex-col items-center gap-6"
        >
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] max-w-sm text-center leading-relaxed">
            Neural Grounding // Federated Commerce <br />
            Sub-Latency Verification Protocols Enabled
          </p>
          
          <div className="flex gap-4 mt-8">
            <button className="px-12 py-5 bg-[#DFFF00] text-black font-black uppercase text-xs tracking-widest hover:bg-white transition-all glitch-hover">
              Initialize Entry
            </button>
            <button className="px-12 py-5 border-2 border-white/20 text-white font-black uppercase text-xs tracking-widest hover:border-white transition-all">
              Network Specs
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Meta Data */}
      <div className="absolute top-1/2 -translate-y-1/2 left-10 hidden xl:block">
        <div className="rotate-90 origin-left text-[8px] font-mono text-slate-800 tracking-[0.8em] uppercase whitespace-nowrap">
          AXON_CORE_SYSTEM_NODE_PRIME_001
        </div>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-10 hidden xl:block">
        <div className="-rotate-90 origin-right text-[8px] font-mono text-slate-800 tracking-[0.8em] uppercase whitespace-nowrap">
          ENCRYPTION_LEVEL_SECURE_VERIFIED
        </div>
      </div>
    </section>
  );
};

export default Hero;
