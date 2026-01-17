import React from 'react';
import { motion } from 'framer-motion';

export const GlassCard = ({ children, className }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className={`rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0f172a]/60 backdrop-blur-xl shadow-2xl ${className}`}
  >
    {children}
  </motion.div>
);
