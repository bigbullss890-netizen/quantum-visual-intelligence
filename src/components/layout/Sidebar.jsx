import React from 'react';
import { motion } from 'framer-motion';
import { Icons } from '../ui/Icons';

const NavItem = ({ icon, active }) => (
  <motion.button 
    whileHover={{ scale: 1.1, backgroundColor: "rgba(34, 211, 238, 0.1)" }}
    whileTap={{ scale: 0.9 }}
    className={`p-3 rounded-xl transition-all ${active ? 'text-cyan-400 bg-cyan-500/10 ring-1 ring-cyan-500/50' : 'text-slate-500 hover:text-slate-200'}`}
  >
    {icon}
  </motion.button>
);

export const Sidebar = () => (
  <motion.nav 
    initial={{ x: -50, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ delay: 0.2 }}
    className="w-20 border-r border-white/10 bg-black/20 backdrop-blur-xl flex flex-col items-center py-8 gap-8 z-20"
  >
    {/* Logo */}
    <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.3)]">
      <span className="font-bold text-white text-lg">Q</span>
    </div>
    
    <div className="flex flex-col gap-6 mt-4">
      <NavItem icon={<Icons.Layers />} active />
      <NavItem icon={<Icons.Cpu />} />
      <NavItem icon={<Icons.Code />} />
    </div>
  </motion.nav>
);
