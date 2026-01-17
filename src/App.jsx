import React, { useState } from 'react';
import ReactFlow, { Background, Controls, Panel, useNodesState, useEdgesState } from 'reactflow';
import { motion, AnimatePresence } from 'framer-motion';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import 'reactflow/dist/style.css';

// Modular Imports
import { ThemeStyles } from './styles/ThemeStyles';
import { Sidebar } from './components/layout/Sidebar';
import { AICodePanel } from './components/layout/AICodePanel';
import { GlassCard } from './components/ui/GlassCard';
import { Icons } from './components/ui/Icons';

// --- INITIAL DATA ---
const initialNodes = [
  { id: 'q0', type: 'input', data: { label: 'q[0]' }, position: { x: 50, y: 100 }, style: { background: 'transparent', border: 'none', color: '#94a3b8', fontFamily: 'JetBrains Mono', fontSize: '12px' } },
  { id: 'gate1', data: { label: 'H' }, position: { x: 180, y: 85 }, style: { background: 'rgba(34, 211, 238, 0.1)', backdropFilter: 'blur(5px)', border: '1px solid #22d3ee', color: '#22d3ee', width: 45, height: 45, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', boxShadow: '0 0 15px rgba(34, 211, 238, 0.2)' } },
];
const initialEdges = [{ id: 'e1', source: 'q0', target: 'gate1', animated: true, style: { stroke: '#475569', strokeWidth: 1 } }];

const INITIAL_CODE = `# ALPHA PARADOX QC - INITIALIZED
from qiskit import QuantumCircuit

qc = QuantumCircuit(2)
qc.h(0)
qc.cx(0, 1)
qc.measure_all()`;

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
  // STATE
  const [code, setCode] = useState(INITIAL_CODE);
  const [isRunning, setIsRunning] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // HANDLER: Run Experiment
  const handleRun = () => {
    setIsRunning(true);
    setShowResults(false);
    
    // Simulate Processing Delay
    setTimeout(() => {
      setIsRunning(false);
      setShowResults(true);
    }, 1500);
  };

  return (
    <>
      <ThemeStyles />
      
      {/* 1. BACKGROUND LAYER */}
      <div className="fixed inset-0 z-0 bg-[#020617]">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 rounded-full aurora-blob" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-900/20 rounded-full aurora-blob" style={{ animationDelay: '-5s' }} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      </div>

      <div className="relative z-10 h-screen w-full flex overflow-hidden">
        
        <Sidebar />

        {/* 2. CENTER CANVAS */}
        <div className="flex-1 flex flex-col relative">
          
          {/* HEADER */}
          <motion.header 
            initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
            className="h-16 flex items-center justify-between px-8 border-b border-white/5 bg-black/10 backdrop-blur-md"
          >
            <h1 className="text-white font-medium tracking-tight flex items-center gap-2 text-lg">
              ALPHA PARADOX <span className="text-cyan-400 font-bold">QC</span> 
              <span className="text-[10px] px-2 py-0.5 bg-slate-800 text-slate-400 border border-slate-700 rounded-full ml-2">v2.4</span>
            </h1>

            <div className="flex items-center gap-4">
              
              {/* AUTH BUTTONS (KRYV Branding) */}
              <div className="h-8 flex items-center">
                  <SignedOut>
                    <SignInButton mode="modal">
                      <button className="text-xs font-mono text-cyan-300 hover:text-white border border-cyan-900 bg-cyan-950/30 px-3 py-1.5 rounded hover:bg-cyan-900 transition-colors">
                        INITIALIZE KRYV LOGIN
                      </button>
                    </SignInButton>
                  </SignedOut>
                  
                  <SignedIn>
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono text-emerald-400">KRYV ACTIVE</span>
                        <UserButton afterSignOutUrl="/" appearance={{
                          elements: {
                            avatarBox: "w-8 h-8 ring-2 ring-cyan-500/50"
                          }
                        }}/>
                    </div>
                  </SignedIn>
              </div>

              {/* RUN BUTTON */}
              <button 
                onClick={handleRun}
                disabled={isRunning}
                className={`flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-5 py-2 rounded-lg text-sm font-medium shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all ${isRunning ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
              >
                {isRunning ? (
                  <span className="animate-pulse">Processing...</span>
                ) : (
                  <> <Icons.Play /> Run Experiment </>
                )}
              </button>
            </div>
          </motion.header>

          {/* FLOW CANVAS */}
          <div className="flex-1 relative">
            <ReactFlow 
              nodes={nodes} edges={edges} 
              onNodesChange={onNodesChange} onEdgesChange={onEdgesChange}
              fitView
              className="bg-transparent"
            >
              <Background color="#334155" gap={25} size={1} style={{ opacity: 0.2 }} />
              <Controls className="!bg-slate-900/80 !border-white/10 !fill-white backdrop-blur-md rounded-lg overflow-hidden" />
              
              {/* RESULT PANEL (Appears after Run) */}
              <AnimatePresence>
                {showResults && (
                  <Panel position="bottom-center" className="mb-8">
                    <GlassCard className="p-6 w-[600px] flex flex-col gap-4 border-cyan-500/30 shadow-[0_0_50px_rgba(34,211,238,0.1)]">
                      <div className="flex justify-between items-center border-b border-white/5 pb-2">
                        <div className="flex items-center gap-2">
                          <Icons.Sparkles />
                          <span className="text-sm font-bold text-white">Probability Distribution</span>
                        </div>
                        <span className="text-xs font-mono text-emerald-400 bg-emerald-900/20 px-2 py-1 rounded">Balanced State</span>
                      </div>
                      
                      {/* REALTIME GRAPH BARS */}
                      <div className="h-32 flex items-end gap-2 px-2">
                        <Bar label="|00⟩" height="10%" percent="5.2%" />
                        <Bar label="|01⟩" height="45%" percent="48.1%" active />
                        <Bar label="|10⟩" height="45%" percent="44.8%" active />
                        <Bar label="|11⟩" height="10%" percent="1.9%" />
                      </div>
                    </GlassCard>
                  </Panel>
                )}
              </AnimatePresence>

            </ReactFlow>
          </div>
        </div>

        {/* RIGHT: EDITABLE CODE */}
        <AICodePanel code={code} setCode={setCode} />
      
      </div>
    </>
  );
}

// Sub-component for Graph Bars
const Bar = ({ height, label, active, percent }) => (
  <div className="flex flex-col items-center gap-2 w-full h-full justify-end group cursor-pointer">
    <motion.div 
      initial={{ height: 0 }}
      animate={{ height }}
      transition={{ duration: 0.8, type: 'spring' }}
      className={`w-full rounded-t-sm transition-all duration-300 relative group-hover:opacity-100 ${active ? 'bg-gradient-to-t from-cyan-500 to-blue-500 opacity-90' : 'bg-slate-700/50 opacity-60'}`} 
    >
       {/* Tooltip */}
       <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          {percent}
       </div>
    </motion.div>
    <span className={`text-[10px] font-mono transition-colors ${active ? 'text-white font-bold' : 'text-slate-600'}`}>{label}</span>
  </div>
);
