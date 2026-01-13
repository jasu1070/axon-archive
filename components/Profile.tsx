
import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldAlert, CreditCard, Box, Zap, Key } from 'lucide-react';

const Profile: React.FC = () => {
  const stats = [
    { label: 'Neural Credits', value: '458,200', icon: CreditCard, color: 'text-[#DFFF00]' },
    { label: 'Security Level', value: 'Alpha-9', icon: ShieldAlert, color: 'text-rose-500' },
    { label: 'Active Uplinks', value: '14 Nodes', icon: Zap, color: 'text-cyan-400' },
    { label: 'Storage Sync', value: '88%', icon: Box, color: 'text-white' },
  ];

  const recentActivity = [
    { id: '1', type: 'Purchase', item: 'Aether Pods Pro', date: '02.14.25', status: 'Secured' },
    { id: '2', type: 'Access', item: 'Auth Terminal Alpha', date: '02.13.25', status: 'Success' },
    { id: '3', type: 'Credit', item: 'Mining Reward', date: '02.12.25', status: '+400 AC' },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-10 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* User Identity Column */}
        <div className="w-full lg:w-1/3 space-y-8">
          <div className="glass-heavy p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-2 h-2 bg-[#DFFF00] m-4" />
            <div className="flex flex-col items-center mb-8">
              <div className="w-32 h-32 border-4 border-white/5 mb-6 relative group">
                <img 
                  src="https://picsum.photos/seed/profile/400/400" 
                  className="w-full h-full object-cover filter grayscale"
                  alt="Identity"
                />
                <div className="absolute inset-0 border border-[#DFFF00]/50 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h2 className="text-3xl font-black uppercase tracking-tighter">AGENT_77</h2>
              <p className="text-[10px] font-black text-[#DFFF00] uppercase tracking-[0.4em] mt-2">Verified Identity Node</p>
            </div>

            <div className="space-y-4 pt-8 border-t border-white/5">
              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                <span className="text-slate-500">Node Location</span>
                <span>SF_GRID_9</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                <span className="text-slate-500">Registration</span>
                <span>01.01.2025</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                <span className="text-slate-500">Encryption Key</span>
                <span className="flex items-center gap-2 text-cyan-400"><Key size={12} /> SHA-512</span>
              </div>
            </div>
          </div>

          <button className="w-full py-4 border-2 border-white text-white font-black uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all">
            Update Security Protocol
          </button>
        </div>

        {/* Analytics & Activity Column */}
        <div className="w-full lg:w-2/3 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-heavy p-6 flex items-center justify-between group"
              >
                <div>
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                  <h4 className={`text-2xl font-black uppercase tracking-tighter ${stat.color}`}>{stat.value}</h4>
                </div>
                <stat.icon className={`${stat.color} opacity-20 group-hover:opacity-100 transition-opacity`} size={32} />
              </motion.div>
            ))}
          </div>

          <div className="glass-heavy p-8">
            <div className="flex items-center gap-3 mb-8">
              <Activity size={20} className="text-[#DFFF00]" />
              <h3 className="text-xl font-black uppercase tracking-widest">Neural Log_</h3>
            </div>
            
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 hover:border-white/20 transition-colors">
                  <div className="flex items-center gap-6">
                    <span className="text-[9px] font-mono text-slate-600">{activity.date}</span>
                    <div>
                      <h5 className="text-[11px] font-black uppercase tracking-widest">{activity.item}</h5>
                      <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{activity.type}</p>
                    </div>
                  </div>
                  <span className={`text-[9px] font-black uppercase tracking-widest ${activity.status.includes('+') ? 'text-[#DFFF00]' : 'text-white'}`}>
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 h-24">
            {[1, 2, 3].map(i => (
              <div key={i} className="glass-heavy flex items-center justify-center overflow-hidden group">
                <div className="w-full h-full bg-gradient-to-br from-white/0 to-white/5 group-hover:bg-[#DFFF00]/10 transition-all flex flex-col items-center justify-center">
                  <span className="text-[8px] font-black text-slate-700">MOD_{i}</span>
                  <div className="w-8 h-px bg-white/10 mt-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
