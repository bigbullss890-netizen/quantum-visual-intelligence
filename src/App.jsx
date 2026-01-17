import React, { useState, useCallback } from 'react';
import ReactFlow, { Background, Controls, applyEdgeChanges, applyNodeChanges, addEdge } from 'reactflow';
import 'reactflow/dist/style.css';
import { Beaker, Cpu, Play, Zap, Factory, ShieldAlert, Database } from 'lucide-react';

const BLOCK_TYPES = [
  { type: 'molecule', label: 'Molecule', icon: <Beaker size={16}/>, color: '#10b981' },
  { type: 'intelligence', label: 'Intelligence', icon: <Cpu size={16}/>, color: '#6366f1' },
  { type: 'sector', label: 'Sector (Pharma)', icon: <Factory size={16}/>, color: '#ec4899' },
  { type: 'constraint', label: 'Constraint', icon: <ShieldAlert size={16}/>, color: '#f59e0b' },
];

export default function App() {
  const [nodes, setNodes] = useState([
    { id: '1', data: { label: 'Input: DNA Sequence' }, position: { x: 250, y: 50 }, style: { background: '#10b981', color: '#fff', borderRadius: '8px' } }
  ]);
  const [edges, setEdges] = useState([]);
  const [result, setResult] = useState(null);

  const onNodesChange = useCallback((chs) => setNodes((nds) => applyNodeChanges(chs, nds)), []);
  const onEdgesChange = useCallback((chs) => setEdges((eds) => applyEdgeChanges(chs, eds)), []);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)), []);

  const runSimulation = () => {
    const isPharma = nodes.some(n => n.data.label.includes('Pharma'));
    setResult({
      engine: isPharma ? "Hybrid Quantum Engine" : "Standard Neural Net",
      confidence: isPharma ? "98.2%" : "71.4%",
      cost: isPharma ? "$14.00" : "$0.50"
    });
  };

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', background: '#0f172a', color: 'white', fontFamily: 'sans-serif' }}>
      
      {/* HEADER */}
      <div style={{ height: '60px', padding: '0 20px', borderBottom: '1px solid #1e293b', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Zap color="#6366f1" fill="#6366f1" />
          <span style={{ fontWeight: 'bold', letterSpacing: '1px' }}>QUANTUM BUILDER</span>
        </div>
        <button onClick={runSimulation} style={{ background: '#6366f1', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
          RUN SIMULATION
        </button>
      </div>

      <div style={{ flex: 1, display: 'flex' }}>
        {/* SIDEBAR */}
        <div style={{ width: '260px', background: '#1e293b', padding: '20px', borderRight: '1px solid #334155' }}>
          <h4 style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '20px' }}>ASSETS</h4>
          {BLOCK_TYPES.map(block => (
            <div key={block.type} style={{ padding: '12px', marginBottom: '10px', background: '#0f172a', borderRadius: '8px', border: `1px solid ${block.color}`, display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
              {block.icon} {block.label}
            </div>
          ))}
        </div>

        {/* CANVAS */}
        <div style={{ flex: 1, position: 'relative' }}>
          <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} fitView>
            <Background color="#334155" gap={20} />
            <Controls />
          </ReactFlow>
        </div>

        {/* RESULTS PANEL */}
        {result && (
          <div style={{ width: '300px', background: '#1e293b', padding: '25px', borderLeft: '2px solid #6366f1' }}>
            <h3 style={{ color: '#6366f1' }}>Computation Result</h3>
            <p><small>ENGINE</small><br/><strong>{result.engine}</strong></p>
            <p><small>CONFIDENCE</small><br/><strong>{result.confidence}</strong></p>
            <p><small>COST</small><br/><strong>{result.cost}</strong></p>
            <button onClick={() => setResult(null)} style={{ width: '100%', marginTop: '20px', padding: '10px', background: 'transparent', border: '1px solid #475569', color: '#94a3b8' }}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}
