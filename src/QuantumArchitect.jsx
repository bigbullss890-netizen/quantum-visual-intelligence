import React, { useState } from 'react';
import ReactFlow, { Background, Controls, Panel, useNodesState, useEdgesState } from 'reactflow';
import { motion } from 'framer-motion';
import 'reactflow/dist/style.css';

// --- ICONS (SVG) ---
const Icons = {
  Dashboard: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>,
  Composer: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>,
  Code: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>,
  Play: () => <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>,
  Settings: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
};

// --- THEME CONFIG ---
const theme = {
  bg: 'bg-[#020617]',       // Rich Obsidian
  sidebar: 'bg-[#0B1120]',  // Darker Slate
  panel: 'bg-[#1e293b]',    // Panel Grey
  accent: 'text-[#2DD4BF]', // Cyan/Teal
  border: 'border-[#1E293B]',
  text: 'text-slate-300',
  glow: 'shadow-[0_0_15px_rgba(45,212,191,0.1)]'
};

const QuantumArchitect = () => {
  // Mock ReactFlow Nodes
  const [nodes, setNodes, onNodesChange] = useNodesState([
    { id: 'q0', type: 'input', data: { label: 'q[0]' }, position: { x: 50, y: 100 }, style: { background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '14px', fontFamily: 'monospace' } },
    { id: 'q1', type: 'input', data: { label: 'q[1]' }, position: { x: 50, y: 180 }, style: { background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '14px', fontFamily: 'monospace' } },
    { id: 'gate1', data: { label: 'H' }, position: { x: 150, y: 85 }, style: { background: '#f59e0b', color: 'black', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', borderRadius: '4px', border: 'none' } },
    { id: 'gate2', data: { label: 'X' }, position: { x: 250, y: 165 }, style: { background: '#3b82f6', color: 'white', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', borderRadius: '4px', border: 'none' } },
    { id: 'gate3', data: { label: '●' }, position: { x: 350, y: 85 }, style: { background: '#6366f1', color: 'white', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', borderRadius: '50%', border: 'none' } },
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([
    { id: 'e1', source: 'q0', target: 'gate1', animated: true, style: { stroke: '#334155' } },
    { id: 'e2', source: 'q1', target: 'gate2', animated: true, style: { stroke: '#334155' } },
  ]);

  return (
    <div className={`h-screen w-full ${theme.bg} ${theme.text} flex overflow-hidden font-sans`}>
      
      {/* 1. LEFT SIDEBAR: Navigation */}
      <nav className={`w-16 ${theme.sidebar} border-r ${theme.border} flex flex-col items-center py-6 gap-8 z-20`}>
        <div className="text-cyan-400 mb-4"><Icons.Composer /></div> {/* Logo Placeholder */}
        <NavItem icon={<Icons.Dashboard />} active={false} />
        <NavItem icon={<Icons.Composer />} active={true} />
        <NavItem icon={<Icons.Code />} active={false} />
        <div className="mt-auto"><NavItem icon={<Icons.Settings />} active={false} /></div>
      </nav>

      {/* 2. MAIN CONTENT: Circuit Composer */}
      <div className="flex-1 flex flex-col relative">
        {/* Top Header */}
        <header className={`h-14 ${theme.sidebar} border-b ${theme.border} flex items-center justify-between px-6`}>
          <div className="flex items-center gap-4">
            <h1 className="font-semibold text-white tracking-wide">Untitled Circuit</h1>
            <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-500">Draft</span>
          </div>
          <button className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-1.5 rounded text-sm font-medium transition-all shadow-[0_0_15px_rgba(45,212,191,0.4)]">
            <Icons.Play /> Run Experiment
          </button>
        </header>

        {/* Canvas Area */}
        <div className="flex-1 relative bg-gradient-to-br from-[#020617] to-[#0f172a]">
           {/* Decorative Grid Lines (Simulating Circuit Lines) */}
           <div className="absolute top-[120px] left-0 w-full h-[1px] bg-slate-800/50 z-0 pointer-events-none"></div>
           <div className="absolute top-[200px] left-0 w-full h-[1px] bg-slate-800/50 z-0 pointer-events-none"></div>

          <ReactFlow 
            nodes={nodes} 
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            fitView
            panOnScroll
            zoomOnScroll={false}
          >
            <Background color="#1e293b" gap={20} size={1} />
            <Controls className="bg-slate-800 border-slate-700 fill-white" />
            
            {/* Overlay: Probability Graph */}
            <Panel position="bottom-center" className="mb-4 w-full flex justify-center">
               <ProbabilityPanel />
            </Panel>
          </ReactFlow>
        </div>
      </div>

      {/* 3. RIGHT SIDEBAR: Live Code Editor (Not Terminal) */}
      <aside className={`w-80 ${theme.sidebar} border-l ${theme.border} flex flex-col`}>
        <div className="h-10 border-b border-slate-800 flex items-center px-4 justify-between bg-[#0f172a]">
          <span className="text-xs font-mono font-bold text-cyan-400">OPENQASM 2.0</span>
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500/20"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500/20"></div>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
          </div>
        </div>
        
        {/* Editor Area */}
        <div className="flex-1 overflow-auto p-4 font-mono text-sm leading-6">
          <div className="text-slate-500 select-none">1</div>
          <div className="text-slate-500 select-none">2</div>
          <div className="pl-6 -mt-12 text-slate-300">
            <p><span className="text-pink-400">OPENQASM</span> <span className="text-amber-300">2.0</span>;</p>
            <p><span className="text-pink-400">include</span> <span className="text-green-400">"qelib1.inc"</span>;</p>
            <p>&nbsp;</p>
            <p><span className="text-pink-400">qreg</span> q[2];</p>
            <p><span className="text-pink-400">creg</span> c[2];</p>
            <p>&nbsp;</p>
            <p><span className="text-cyan-400">h</span> q[0];</p>
            <p><span className="text-cyan-400">x</span> q[1];</p>
            <p><span className="text-cyan-400">cx</span> q[0],q[1];</p>
            <p><span className="text-cyan-400">measure</span> q -> c;</p>
            <p className="animate-pulse opacity-50">|</p>
          </div>
        </div>

        {/* Bottom Status */}
        <div className="p-3 border-t border-slate-800 text-[10px] text-slate-500 flex justify-between">
            <span>Ln 10, Col 4</span>
            <span>UTF-8</span>
        </div>
      </aside>

    </div>
  );
};

// --- SUBCOMPONENTS ---

const NavItem = ({ icon, active }) => (
  <button className={`p-3 rounded-xl transition-all ${active ? 'bg-cyan-500/10 text-cyan-400' : 'text-slate-500 hover:bg-slate-800 hover:text-slate-200'}`}>
    {icon}
  </button>
);

const ProbabilityPanel = () => (
    <div className="bg-[#0f172a]/90 backdrop-blur border border-slate-700 p-5 rounded-xl shadow-2xl w-[600px]">
        <div className="flex justify-between items-end mb-4">
            <div>
                <h3 className="text-sm font-semibold text-white">Measurement Probabilities</h3>
                <p className="text-xs text-slate-500">System State |ψ⟩</p>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">Balanced</span>
        </div>
        <div className="h-32 flex items-end justify-around gap-2">
            <Bar label="00" height="45%" color="bg-cyan-500" percent="45" />
            <Bar label="01" height="5%" color="bg-slate-700" percent="5" />
            <Bar label="10" height="5%" color="bg-slate-700" percent="5" />
            <Bar label="11" height="45%" color="bg-blue-500" percent="45" />
        </div>
    </div>
);

const Bar = ({ label, height, color, percent }) => (
    <div className="flex flex-col items-center gap-2 group w-full">
        <div className="relative w-full h-32 flex items-end bg-slate-800/30 rounded-t overflow-hidden">
            <motion.div 
                initial={{ height: 0 }} 
                animate={{ height }} 
                transition={{ duration: 1, type: "spring" }}
                className={`w-full ${color} opacity-80 group-hover:opacity-100 transition-opacity`}
            />
        </div>
        <span className="text-xs font-mono text-slate-400">{label}</span>
        <span className="text-[10px] text-slate-600 absolute -bottom-4 opacity-0 group-hover:opacity-100 transition-opacity">{percent}%</span>
    </div>
);

export default QuantumArchitect;
