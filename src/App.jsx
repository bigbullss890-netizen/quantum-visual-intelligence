import React, { useState, useCallback } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  applyEdgeChanges, 
  applyNodeChanges, 
  addEdge 
} from 'reactflow';

// This is critical for the nodes to appear!
import 'reactflow/dist/style.css';
import { Beaker, Cpu, Play, Zap, Factory } from 'lucide-react';

const BLOCK_TYPES = [
  { type: 'molecule', label: 'Molecule', icon: <Beaker size={16}/>, color: '#10b981' },
  { type: 'intelligence', label: 'Intelligence', icon: <Cpu size={16}/>, color: '#6366f1' },
  { type: 'sector', label: 'Sector (Pharma)', icon: <Factory size={16}/>, color: '#ec4899' },
];

export default function App() {
  // We define initial nodes inside the component to ensure they refresh on load
  const [nodes, setNodes] = useState([
    { 
      id: '1', 
      data: { label: 'Quantum Input' }, 
      position: { x: 250, y: 150 }, 
      style: { background: '#10b981', color: '#fff', padding: '10px', borderRadius: '8px', border: 'none', width: 150 } 
    }
  ]);
  const [edges, setEdges] = useState([]);
  const [result, setResult] = useState(null);

  const onNodesChange = useCallback((chs) => setNodes((nds) => applyNodeChanges(chs, nds)), []);
  const onEdgesChange = useCallback((chs) => setEdges((eds) => applyEdgeChanges(chs, eds)), []);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)), []);

  const runSimulation = () => {
    setResult({
      engine: "Hybrid Quantum-Neural Engine",
      confidence: "94.8%",
      cost: "$12.40 / compute hr"
    });
  };

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', background: '#0f172a', color: 'white', fontFamily: 'sans-serif' }}>
      
      {/* HEADER */}
      <div style={{ height: '60px', padding: '0 20px', borderBottom: '1px solid #1e293b', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Zap color="#6366f1" fill="#6366f1" />
          <span style={{ fontWeight: 'bold', letterSpacing: '1px' }}>QUANTUM BUILDER</span>
        </div>
        <button onClick={runSimulation} style={{ background: '#6366f1', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
          RUN SIMULATION
        </button>
      </div>

      <div style={{ flex: 1, display: 'flex', position: 'relative' }}>
        {/* SIDEBAR */}
        <div style={{ width: '260px', background: '#1e293b', padding: '20px', borderRight: '1px solid #334155', zIndex: 5 }}>
          <h4 style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '20px', letterSpacing: '1px' }}>DRAG COMPONENTS</h4>
          {BLOCK_TYPES.map(block => (
            <div key={block.type} style={{ padding: '12px', marginBottom: '10px', background: '#0f172a', borderRadius: '8px', border: `1px solid ${block.color}`, display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', cursor: 'pointer' }}>
              {block.icon} {block.label}
            </div>
          ))}
        </div>

        {/* CANVAS - This must have a container with height/width */}
        <div style={{ flex: 1, height: '100%', position: 'relative' }}>
          <ReactFlow 
            nodes={nodes} 
            edges={edges} 
            onNodesChange={onNodesChange} 
            onEdgesChange={onEdgesChange} 
            onConnect={onConnect}
            fitView
          >
            <Background color="#334155" gap={20} />
            <Controls />
          </ReactFlow>
        </div>

        {/* RESULTS OVERLAY */}
        {result && (
          <div style={{ position: 'absolute', right: '20px', top: '20px', width: '280px', background: '#1e293b', padding: '20px', borderRadius: '12px', border: '2px solid #6366f1', zIndex: 20, boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#6366f1', fontSize: '1.1rem' }}>Computation Result</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div><small style={{ color: '#94a3b8' }}>ENGINE</small><br/><strong>{result.engine}</strong></div>
              <div><small style={{ color: '#94a3b8' }}>CONFIDENCE</small><br/><strong>{result.confidence}</strong></div>
              <div><small style={{ color: '#94a3b8' }}>EST. COST</small><br/><strong>{result.cost}</strong></div>
            </div>
            <button onClick={() => setResult(null)} style={{ width: '100%', marginTop: '15px', padding: '8px', background: 'transparent', border: '1px solid #475569', color: '#94a3b8', borderRadius: '4px', cursor: 'pointer' }}>Dismiss</button>
          </div>
        )}
      </div>
    </div>
  );
}
