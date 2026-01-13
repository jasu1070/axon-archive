
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Shield, Fingerprint, Lock, Mail, ArrowRight, Loader2, Cpu } from 'lucide-react';

interface AuthProps {
  onLoginSuccess: () => void;
}

const Auth: React.FC<AuthProps> = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Reactive Mouse State
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for background movement
  const springX = useSpring(mouseX, { damping: 50, stiffness: 200 });
  const springY = useSpring(mouseY, { damping: 50, stiffness: 200 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates (-0.5 to 0.5)
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess();
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-20 relative overflow-hidden bg-[#010101]">
      {/* REACTIVE BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Dynamic Grid */}
        <motion.div 
          style={{ 
            x: springX.get() * 50, 
            y: springY.get() * 50,
            opacity: isFocused ? 0.15 : 0.05
          }}
          className="absolute inset-[-10%] bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:40px_40px] transition-opacity duration-500"
        />

        {/* Neural Follower Orb */}
        <motion.div 
          style={{ 
            left: `${(springX.get() + 0.5) * 100}%`,
            top: `${(springY.get() + 0.5) * 100}%`,
            scale: isFocused ? 1.5 : 1
          }}
          className="absolute w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(223,255,0,0.08)_0%,transparent_70%)] blur-3xl transition-transform duration-700"
        />

        {/* Pulsing Static Ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-white/[0.02] rounded-full animate-[pulse_8s_infinite]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-xl relative z-10"
      >
        <div className="glass-heavy p-12 relative overflow-hidden">
          {/* Reactive Decorative Glitch Corner */}
          <motion.div 
            animate={{ 
              opacity: isFocused ? 0.3 : 0.1,
              scale: isFocused ? 1.2 : 1
            }}
            className="absolute top-0 right-0 w-48 h-48 bg-[#DFFF00]/20 blur-[80px] transition-all" 
          />
          
          <div className="mb-12 flex flex-col items-center text-center">
            <motion.div 
              animate={{ rotateY: springX.get() * 40, rotateX: springY.get() * -40 }}
              className="w-16 h-16 bg-[#DFFF00] text-black flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(223,255,0,0.3)]"
            >
              <Shield size={32} />
            </motion.div>
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">
              {isLogin ? 'Establish Link' : 'Register Node'}
            </h2>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">
              Clearance Level Verification Required
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block ml-1">Identity Tag</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-[#DFFF00] transition-colors">
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  required
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="ID_0x00...AXON"
                  className="w-full bg-white/5 border-2 border-white/10 px-12 py-4 text-sm font-bold uppercase tracking-widest focus:border-[#DFFF00] outline-none transition-all placeholder:text-slate-800"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block ml-1">Access Protocol</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-[#DFFF00] transition-colors">
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  required
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="********"
                  className="w-full bg-white/5 border-2 border-white/10 px-12 py-4 text-sm font-bold tracking-widest focus:border-[#DFFF00] outline-none transition-all placeholder:text-slate-800"
                />
              </div>
            </div>

            <button 
              disabled={loading}
              className="w-full bg-white text-black py-5 font-black uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-4 hover:bg-[#DFFF00] transition-all disabled:opacity-50 relative overflow-hidden group shadow-xl hover:shadow-[#DFFF00]/20"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  {isLogin ? 'Initialize Uplink' : 'Encrypt Data'}
                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-white/5 flex flex-col items-center gap-6">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors"
            >
              {isLogin ? 'Switch to Node Registration' : 'Return to Identity Verification'}
            </button>

            <div className="flex gap-4">
              <motion.div 
                whileHover={{ scale: 1.1, color: '#DFFF00', borderColor: '#DFFF00' }}
                className="w-10 h-10 border border-white/10 flex items-center justify-center text-slate-600 transition-all cursor-pointer"
              >
                <Fingerprint size={20} />
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.1, color: '#DFFF00', borderColor: '#DFFF00' }}
                className="w-10 h-10 border border-white/10 flex items-center justify-center text-slate-600 transition-all cursor-pointer"
              >
                <Cpu size={20} />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Footer Technical Readout */}
        <div className="mt-8 flex justify-between items-center text-[8px] font-mono text-slate-700 tracking-widest uppercase">
          <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }}>AES-256 Enabled</motion.span>
          <span>Node ID: AX-449-P</span>
          <span className="text-[#DFFF00]/40">Latency: 4ms</span>
        </div>
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}} />
    </div>
  );
};

export default Auth;
