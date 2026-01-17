import React from 'react';
import ReactFlow, { Background, Controls, Panel, useNodesState, useEdgesState } from 'reactflow';
import { motion } from 'framer-motion';
import 'reactflow/dist/style.css';

// Import our modular files
import { ThemeStyles } from './styles/ThemeStyles';
import { Sidebar } from './components/layout/Sidebar';
import { AICodePanel } from './components/layout/AICodePanel';
import { GlassCard } from './components/ui/GlassCard';
import { Icons } from './components/ui/Icons';

// --- DATA: Initial Nodes ---
const initialNodes = [
  { id: 'q0', type: 'input', data: { label: 'q[0]' }, position: { x: 50, y: 100 }, style: { background: 'transparent', border: 'none', color: '#94a3b8', fontFamily: 'JetBrains Mono', fontSize: '12px' } },
  { id: 'gate1', data: { label: 'H' }, position: { x: 180, y: 85 }, style: { background: 'rgba(34, 211, 238, 0.1)', backdropFilter: 'blur(5px)', border: '1px solid #22d3ee', color: '#22d3ee', width: 45, height: 45, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', boxShadow: '0 0 15px rgba(34, 211, 238, 0.2)' } },
];
const initialEdges = [{ id: 'e1', source: 'q0', target: 'gate1', animated: true, style: { stroke: '#475569', strokeWidth: 1 } }];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <>
      <ThemeStyles />
      
      {/* 1. BACKGROUND LAYER (Aceternity Aurora) */}
      <div className="fixed inset-0 z-0 bg-[#020617]">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 rounded-full aurora-blob" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-900/20 rounded-full aurora-blob" style={{ animationDelay: '-5s' }} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      </div>

      <div className="relative z-10 h-screen w-full flex overflow-hidden">
        
        <Sidebar />

        {/* 2. CENTER CANVAS */}
        <div className="flex-1 flex flex-col relative">
          {/* Header */}
          <motion.header 
            initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
            className="h-16 flex items-center justify-between px-8 border-b border-white/5 bg-black/10 backdrop-blur-md"
          >
            <h1 className="text-white font-medium tracking-tight flex items-center gap-2">
              Quantum Circuit <span className="text-slate-500">/</span> Bell State 
              <span className="text-[10px] px-2 py-0.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full ml-2">v2.4</span>
            </h1>
            <button className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-5 py-2 rounded-lg text-sm font-medium shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:scale-105 transition-transform">
              <Icons.Play /> Run Experiment
            </button>
          </motion.header>

          {/* Flow Canvas */}
          <div className="flex-1 relative">
            <ReactFlow 
              nodes={nodes} edges={edges} 
              onNodesChange={onNodesChange} onEdgesChange={onEdgesChange}
              fitView
              className="bg-transparent"
            >
              <Background color="#334155" gap={25} size={1} style={{ opacity: 0.2 }} />
              <Controls className="!bg-slate-900/80 !border-white/10 !fill-white backdrop-blur-md rounded-lg overflow-hidden" />
              
              {/* Bottom Probability Widget */}
              <Panel position="bottom-center" className="mb-8">
                <GlassCard className="p-6 w-[500px] flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Icons.Sparkles />
                      <span className="text-sm font-medium text-white">Probability Distribution</span>
                    </div>
                    <span className="text-xs font-mono text-emerald-400">Balanced</span>
                  </div>
                  {/* Probability Bars */}
                  <div className="h-16 flex items-end gap-1">
                     <div className="w-1/4 h-[10%] bg-slate-700/50 rounded-t-sm"></div>
                     <div className="w-1/4 h-[45%] bg-gradient-to-t from-cyan-500 to-blue-500 opacity-90 rounded-t-sm"></div>
                     <div className="w-1/4 h-[45%] bg-gradient-to-t from-cyan-500 to-blue-500 opacity-90 rounded-t-sm"></div>
                     <div className="w-1/4 h-[10%] bg-slate-700/50 rounded-t-sm"></div>
                  </div>
                </GlassCard>
              </Panel>
            </ReactFlow>
          </div>
        </div>

        <AICodePanel />
      
      </div>
    </>
  );
}
