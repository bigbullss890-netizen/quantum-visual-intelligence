import React, { useState, useCallback } from 'react';
import ReactFlow, { Background, Controls, applyEdgeChanges, applyNodeChanges, addEdge } from 'reactflow';
import 'reactflow/dist/style.css';
import { Beaker, Cpu, Zap, Factory, Play, ShieldCheck, Activity } from 'lucide-react';

const BLOCKS = [
  { type: 'molecule', label: 'Target Molecule', icon: <Beaker size={16}/>, color: '#10b981' },
  { type: 'intelligence', label: 'Intelligence Core', icon: <Cpu size={16}/>, color: '#6366f1' },
  { type: 'sector', label: 'Sector: Pharma', icon: <Factory size={16}/>, color: '#ec4899' },
  { type: 'constraint', label: 'Legal Constraint', icon: <ShieldCheck size={16}/>, color: '#f59e0b' },
];

export default function App() {
  const [nodes, setNodes] = useState([
    { id: '1', data: { label: 'Quantum Input' }, position: { x: 250, y: 100 }, style: { background: '#6366f1', color: '#fff', borderRadius: '8px', padding: '10px' } }
  ]);
  const [edges, setEdges] = useState([]);
  const [result, setResult] = useState(null);

  const onNodesChange = useCallback((chs) => setNodes((nds) => applyNodeChanges(chs, nds)), []);
  const onEdgesChange = useCallback((chs) => setEdges((eds) => applyEdgeChanges(chs, eds)), []);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#6366f1' } }, eds)), []);

  const runSimulation = () => {
    // Logic: If Pharma sector node is present, use Hybrid Quantum
    const isPharma = nodes.some(n => n.data.label.includes('Pharma'));
    setResult({
      engine: isPharma ? "Hybrid Quantum-Neural V2" : "Classical AI Cluster",
      confidence: isPharma ? "98.4%" : "72.1%",
      qubits: isPharma ? "128 CQ" : "0",
      cost: isPharma ? "$12.40" : "$0.85"
    });
  };

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', background: '#0f172a', color: 'white', fontFamily: 'sans-serif' }}>
      
      {/* HEADER */}
      <nav style={{ height: '65px', background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 25px', borderBottom: '1px solid #334155', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: '#6366f1', padding: '6px', borderRadius: '6px' }}><Zap size={20} fill="white" color="white" /></div>
          <span style={{ fontWeight: 'bold', fontSize: '1.2rem', letterSpacing: '1px' }}>QUANTUM<span style={{fontWeight: 300, color: '#94a3b8'}}>ARCHITECT</span></span>
        </div>
        <button onClick={runSimulation} style={{ background: '#6366f1', color: 'white', border: 'none', padding: '10px 22px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.39)' }}>
          <Play size={16} fill="white" /> DEPLOY ENGINE
        </button>
      </nav>

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* SIDEBAR */}
        <div style={{ width: '280px', background: '#1e293b', padding: '25px', borderRight: '1px solid #334155', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <p style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px' }}>Nodes Library</p>
            {BLOCKS.map(b => (
              <div key={b.type} style={{ padding: '14px', marginBottom: '12px', background: '#0f172a', borderRadius: '8px', border: `1px solid ${b.color}44`, display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', cursor: 'pointer', transition: '0.2s' }}>
                <span style={{color: b.color}}>{b.icon}</span> {b.label}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 'auto', padding: '15px', background: '#0f172a', borderRadius: '8px', fontSize: '12px', border: '1px solid #334155' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', marginBottom: '5px' }}>
              <Activity size={14} /> System Status: Optimal
            </div>
            Ready for Hybrid Synthesis.
          </div>
        </div>

        {/* WORKSPACE */}
        <div style={{ flex: 1, position: 'relative' }}>
          <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} fitView>
            <Background color="#334155" gap={25} size={1} />
            <Controls />
          </ReactFlow>
        </div>

        {/* RESULTS PANEL */}
        {result && (
          <div style={{ width: '320px', background: '#1e293b', padding: '30px', borderLeft: '2px solid #6366f1', boxShadow: '-10px 0 30px rgba(0,0,0,0.3)', zIndex: 20 }}>
            <h3 style={{ margin: '0 0 25px 0', color: '#6366f1', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Cpu size={20} /> Build Metrics
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              <div>
                <label style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase' }}>Intelligence Mode</label>
                <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{result.engine}</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div>
                  <label style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase' }}>Confidence</label>
                  <div style={{ fontWeight: 'bold', color: '#10b981' }}>{result.confidence}</div>
                </div>
                <div>
                  <label style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase' }}>Active Qubits</label>
                  <div style={{ fontWeight: 'bold' }}>{result.qubits}</div>
                </div>
              </div>
              <div style={{ background: '#0f172a', padding: '15px', borderRadius: '8px' }}>
                <label style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase' }}>Est. Compute Cost</label>
                <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#f59e0b' }}>{result.cost}</div>
              </div>
            </div>
            <button onClick={() => setResult(null)} style={{ width: '100%', marginTop: '30px', padding: '12px', background: 'transparent', border: '1px solid #475569', color: '#94a3b8', borderRadius: '6px', cursor: 'pointer' }}>
              Clear Analysis
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
