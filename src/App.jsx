import React, { useState, useCallback } from 'react';
import ReactFlow, { Background, Controls, applyEdgeChanges, applyNodeChanges, addEdge } from 'reactflow';
import 'reactflow/dist/style.css';
import { Beaker, Cpu, Zap, Factory, Play } from 'lucide-react';

const BLOCKS = [
  { type: 'molecule', label: 'Molecule', icon: <Beaker size={16}/>, color: '#10b981' },
  { type: 'intelligence', label: 'Intelligence', icon: <Cpu size={16}/>, color: '#6366f1' },
  { type: 'sector', label: 'Pharma Sector', icon: <Factory size={16}/>, color: '#ec4899' },
];

export default function App() {
  const [nodes, setNodes] = useState([
    { id: '1', data: { label: 'Quantum Core' }, position: { x: 250, y: 150 }, style: { background: '#6366f1', color: '#fff', borderRadius: '8px', padding: '10px' } }
  ]);
  const [edges, setEdges] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const onNodesChange = useCallback((chs) => setNodes((nds) => applyNodeChanges(chs, nds)), []);
  const onEdgesChange = useCallback((chs) => setEdges((eds) => applyEdgeChanges(chs, eds)), []);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)), []);

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* NAVIGATION */}
      <nav style={{ height: '60px', background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', borderBottom: '1px solid #334155' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Zap size={20} fill="#6366f1" color="#6366f1" />
          <span style={{ fontWeight: 'bold' }}>QUANTUM BUILDER</span>
        </div>
        <button onClick={() => setShowResult(true)} style={{ background: '#6366f1', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Play size={14} fill="white" /> RUN BUILD
        </button>
      </nav>

      <div style={{ flex: 1, display: 'flex' }}>
        {/* SIDEBAR */}
        <div style={{ width: '240px', background: '#1e293b', padding: '20px', borderRight: '1px solid #334155' }}>
          <p style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '20px' }}>COMPONENTS</p>
          {BLOCKS.map(b => (
            <div key={b.type} style={{ padding: '12px', marginBottom: '10px', background: '#0f172a', borderRadius: '6px', border: `1px solid ${b.color}`, display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
              {b.icon} {b.label}
            </div>
          ))}
        </div>

        {/* WORKSPACE */}
        <div style={{ flex: 1, position: 'relative' }}>
          <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} fitView>
            <Background color="#334155" />
            <Controls />
          </ReactFlow>
        </div>

        {/* MODAL OVERLAY */}
        {showResult && (
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '300px', background: '#1e293b', border: '2px solid #6366f1', padding: '30px', borderRadius: '15px', zIndex: 100, textAlign: 'center' }}>
            <h3 style={{ color: '#6366f1' }}>Intelligence Ready</h3>
            <p>Confidence: 98.4%</p>
            <p>Mode: Hybrid Quantum</p>
            <button onClick={() => setShowResult(false)} style={{ background: '#6366f1', border: 'none', color: 'white', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}
