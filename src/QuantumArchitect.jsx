import React, { useState } from 'react';
import ReactFlow, { Background, Controls, Panel, useNodesState, useEdgesState } from 'reactflow';
import { motion, AnimatePresence } from 'framer-motion';
import 'reactflow/dist/style.css';

// --- 1. TYPOGRAPHY & GLOBAL STYLES (No Terminal Needed) ---
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=JetBrains+Mono:wght@400;700&display=swap');
    
    :root {
      --bg-deep: #030712;
      --glass-border: rgba(255, 255, 255, 0.08);
      --glass-surface: rgba(255, 255, 255, 0.03);
      --neon-cyan: #22d3ee;
      --neon-purple: #a855f7;
    }

    body {
      font-family: 'Inter', sans-serif;
      background-color: var(--bg-deep);
      color: #e2e8f0;
      overflow: hidden;
    }

    /* Custom Scrollbar */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }

    /* Aurora Animation */
    @keyframes drift {
      0% { transform: translate(0, 0); }
      50% { transform: translate(10px, 20px); }
      100% { transform: translate(0, 0); }
    }
    
    .aurora-blob {
      filter: blur(80px);
      opacity: 0.4;
      animation: drift 10s infinite ease-in-out;
    }
  `}</style>
);

// --- 2. MOTION VARIANTS (Cinematic Entry) ---
const containerVar = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVar = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
