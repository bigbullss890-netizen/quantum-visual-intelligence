import React from 'react';

export const ThemeStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=JetBrains+Mono:wght@400;700&display=swap');
    
    :root {
      --bg-deep: #020617;
      --glass-border: rgba(255, 255, 255, 0.08);
      --glass-surface: rgba(15, 23, 42, 0.6);
      --neon-cyan: #22d3ee;
    }

    body {
      font-family: 'Inter', sans-serif;
      background-color: var(--bg-deep);
      color: #e2e8f0;
      margin: 0;
      overflow: hidden;
    }

    /* Custom Scrollbar */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }

    /* Aceternity Aurora Animation */
    @keyframes drift {
      0% { transform: translate(0, 0) scale(1); }
      50% { transform: translate(20px, -20px) scale(1.1); }
      100% { transform: translate(0, 0) scale(1); }
    }
    
    .aurora-blob {
      position: absolute;
      filter: blur(90px);
      opacity: 0.3;
      animation: drift 12s infinite ease-in-out;
      z-index: 0;
    }
  `}</style>
);
