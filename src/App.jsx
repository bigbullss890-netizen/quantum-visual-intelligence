import React, { useState, useCallback, useRef } from 'react';
import ReactFlow, { 
  addEdge, 
  Background, 
  Controls, 
  applyEdgeChanges, 
  applyNodeChanges 
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Beaker, ShieldAlert, Cpu, Factory, Play, Database } from 'lucide-react';

// --- INITIAL DATA & CONSTANTS ---
const initialNodes = [
  { id: '1', type: 'input', data: { label: 'Target Molecule' }, position: { x: 250, y: 5 }, style: { background: '#10b981', color: '#fff' } },
];

const BLOCK_TYPES = [
  { type: 'molecule', label: 'Molecule', icon: <Beaker size={16}/>, color: '#10b981' },
  { type: 'constraint', label: 'Constraint', icon: <ShieldAlert size={16}/>, color: '#f59e0b' },
  { type: 'intelligence', label: 'Intelligence', icon: <Cpu size={16}/>, color: '#6366f1' },
  { type: 'sector', label: 'Sector', icon: <Factory size={16}/>, color: '#ec4899' },
  { type: 'output', label: 'Output', icon: <Database size={16}/>, color: '#64748b' },
];

export default function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState([]);
  const [result, setResult] = useState(null);

  // --- NODE LOGIC ---
  const onNodesChange = useCallback((chs) => setNodes((nds) => applyNodeChanges(chs, nds)), []);
  const onEdgesChange = useCallback((chs) => setEdges((eds) => applyEdgeChanges(chs, eds)), []);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  // --- DRAG & DROP LOGIC ---
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const onDrop = (event) => {
    event.preventDefault();
    const type = event.dataTransfer.getData('application/reactflow');
    const position = { x: event.clientX - 300, y: event.clientY - 50 };
    const newNode = {
      id: `${nodes.length + 1}`,
      type: 'default',
      position,
      data: { label: `${type.toUpperCase()}` },
      style: { background: BLOCK_TYPES.find(b => b.type === type).color, color: '#fff' }
    };
    setNodes((nds) => nds.concat(newNode));
  };

  // --- FAKE INTELLIGENCE ENGINE ---
  const runSimulation = () => {
    // Check if Sector node exists to determine logic
    const hasSectorNode = nodes.some(n => n.data.label.includes('SECTOR'));
    const isPharma = nodes.some(n => n.data.label.includes('Pharma')); // Basic check
    
    let intelligence = "Classical AI Cluster";
    let qubits = "0 (Classical)";
    let confidence = "82%";

    if (hasSectorNode) {
      intelligence = "Hybrid Quantum-Neural Engine";
      qubits = "128 CQubits";
      confidence = "94.8%";
    }

    setResult({
      intelligence,
      qubits,
      confidence,
      cost: `$${(Math.random() * 100).toFixed(2)} / compute hr`
    });
  };

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', background: '#0f172a', color: '#f8fafc' }}>
      {/* TOP BAR */}
      <div style={{ padding: '15px 25px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1e293b' }}>
        <h2 style={{ margin: 0, fontSize: '1.2rem' }}>Quantum<b>Builder</b> <span style={{fontSize: '0.7rem', opacity: 0.5}}>STAGE-1 PROTOTYPE</span></h2>
        <button 
          onClick={runSimulation}
          style={{ background: '#6366f1', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '5px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Play size={16}/> RUN ARCHITECTURE
        </button>
      </div>

      <div style={{ flex: 1, display: 'flex' }}>
        {/* SIDEBAR */}
        <div style={{ width: '250px', borderRight: '1px solid #1e293b', padding: '20px' }}>
          <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '15px' }}>DRAG BLOCKS TO CANVAS</p>
          {BLOCK_TYPES.map((block) => (
            <div 
              key={block.type}
              onDragStart={(e) => onDragStart(e, block.type)}
              draggable
              style={{ 
                padding: '12px', marginBottom: '10px', background: '#1e293b', borderRadius: '8px', cursor: 'grab', display: 'flex', alignItems: 'center', gap: '10px', border: `1px solid ${block.color}44`
              }}>
              {block.icon} {block.label}
            </div>
          ))}
        </div>

        {/* CANVAS */}
        <div style={{ flex: 1 }} onDragOver={(e) => e.preventDefault()} onDrop={onDrop}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            style={{ background: '#0f172a' }}
          >
            <Background color="#334155" gap={20} />
            <Controls />
          </ReactFlow>
        </div>

        {/* RESULTS PANEL */}
        {result && (
          <div style={{ width: '300px', background: '#1e293b', padding: '20px', borderLeft: '1px solid #6366f1' }}>
            <h3 style={{ color: '#6366f1' }}>Computation Results</h3>
            <hr style={{ borderColor: '#334155' }}/>
            <div style={{ marginTop: '20px' }}>
              <p><small>ENGINE:</small><br/><strong>{result.intelligence}</strong></p>
              <p><small>RESOURCES:</small><br/><strong>{result.qubits}</strong></p>
              <p><small>CONFIDENCE:</small><br/><strong>{result.confidence}</strong></p>
              <p><small>EST. COST:</small><br/><strong>{result.cost}</strong></p>
            </div>
            <button 
              onClick={() => setResult(null)}
              style={{ width: '100%', marginTop: '20px', background: 'transparent', border: '1px solid #475569', color: '#94a3b8', padding: '8px', cursor: 'pointer' }}>
              Dismiss
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
