import React from 'react';
import { motion } from 'framer-motion';
import { Icons } from '../ui/Icons';

export const AICodePanel = ({ code, setCode }) => (
  <aside className="w-96 border-l border-white/10 bg-black/20 backdrop-blur-2xl flex flex-col z-20">
    <div className="p-4 border-b border-white/5 flex justify-between items-center">
      <span className="text-sm font-semibold text-slate-200">Live Kernel</span>
      <div className="flex gap-2">
         <div className="w-2 h-2 rounded-full bg-red-500/50" />
         <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
         <div className="w-2 h-2 rounded-full bg-green-500/50" />
      </div>
    </div>
    
    {/* EDITABLE CODE AREA */}
    <div className="flex-1 relative font-mono text-xs overflow-hidden">
        {/* Line Numbers (Visual Only) */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-black/10 border-r border-white/5 pt-4 flex flex-col items-center text-slate-700 select-none">
            {[...Array(50)].map((_, i) => <div key={i} className="h-5 leading-5">{i + 1}</div>)}
        </div>

        {/* Text Area */}
        <textarea 
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-full bg-transparent text-slate-300 pl-10 pt-4 pr-4 border-none outline-none resize-none leading-5 font-mono selection:bg-cyan-500/30 placeholder-slate-600"
            spellCheck="false"
        />

       {/* AI Insight Box (Magic UI Style) */}
       <motion.div 
         initial={{ opacity: 0, y: 10 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 1.2 }}
         className="absolute bottom-4 left-4 right-4 p-4 rounded-xl border border-cyan-500/30 bg-[#020617]/90 backdrop-blur-md relative overflow-hidden pointer-events-none"
       >
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
          <div className="flex items-center gap-2 mb-2">
             <Icons.Sparkles />
             <span className="text-cyan-300 font-bold text-xs uppercase tracking-wider">AI Copilot</span>
          </div>
          <p className="text-cyan-100/70">Syntax Verified. Ready for compilation.</p>
       </motion.div>
    </div>
  </aside>
);
