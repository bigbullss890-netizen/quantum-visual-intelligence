import React from 'react';
import { motion } from 'framer-motion';
import { Icons } from '../ui/Icons';

export const AICodePanel = () => (
  <aside className="w-96 border-l border-white/10 bg-black/20 backdrop-blur-2xl flex flex-col z-20">
    <div className="p-4 border-b border-white/5 flex justify-between items-center">
      <span className="text-sm font-semibold text-slate-200">Live Kernel</span>
      <div className="flex gap-2">
         <div className="w-2 h-2 rounded-full bg-red-500/50" />
         <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
         <div className="w-2 h-2 rounded-full bg-green-500/50" />
      </div>
    </div>
    
    <div className="flex-1 p-6 font-mono text-xs overflow-auto text-slate-400 leading-relaxed scrollbar-thin">
       {/* Code Lines */}
       {[
         { line: 1, text: "// Qiskit Runtime Initialized", color: "text-slate-600" },
         { line: 2, html: <><span className="text-purple-400">from</span> qiskit <span className="text-purple-400">import</span> *</> },
         { line: 3, html: <><span className="text-cyan-400">qc</span> = QuantumCircuit(2)</> },
         { line: 4, html: <>qc.h(0) <span className="text-slate-600 ml-2"># Hadamard</span></> },
         { line: 5, html: <>qc.cx(0, 1)</> },
       ].map((code, i) => (
         <motion.div 
           key={i} 
           initial={{ opacity: 0, x: 10 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.1 * i }}
           className="flex gap-4 mb-2"
         >
            <span className="text-slate-700 select-none w-4 text-right">{code.line}</span>
            <div className={code.color || "text-slate-300"}>{code.html || code.text}</div>
         </motion.div>
       ))}

       {/* AI Insight Box (Magic UI Style) */}
       <motion.div 
         initial={{ opacity: 0, y: 10 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 1.2 }}
         className="mt-8 p-4 rounded-xl border border-cyan-500/30 bg-gradient-to-b from-cyan-900/20 to-transparent relative overflow-hidden"
       >
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
          <div className="flex items-center gap-2 mb-2">
             <Icons.Sparkles />
             <span className="text-cyan-300 font-bold text-xs uppercase tracking-wider">AI Copilot</span>
          </div>
          <p className="text-cyan-100/70">Entanglement detected between q[0] and q[1]. Recommended: Add a measurement operator to collapse the wavefunction.</p>
       </motion.div>
    </div>
  </aside>
);
