import React, { useState, useCallback } from 'react';
import ReactFlow, { 
  addEdge, 
  Background, 
  Controls, 
  applyEdgeChanges, 
  applyNodeChanges 
} from 'reactflow';

// IMPORTANT: This import is required for the lines and nodes to show up!
import 'reactflow/dist/style.css';

// Using Lucide icons for that "Deep Tech" look
import { Beaker, ShieldAlert, Cpu, Factory, Play, Database, Zap } from 'lucide-react';

// --- INITIAL STATE ---
const initialNodes = [
  { 
    id: '1', 
    type: 'input', 
    data: { label: 'Target Molecule: HC-01' }, 
    position: { x: 250, y: 50 }, 
    style: { background: '#10b981', color: '#fff', borderRadius: '8px', padding: '10px', width: 180 } 
  },
];

const BLOCK_TYPES = [
  { type: 'molecule', label: 'Molecule', icon: <Beaker size={16}/>, color: '#10b981' },
  { type: 'constraint', label: 'Constraint', icon: <ShieldAlert size={16}/>, color: '#f59e0b' },
  { type: 'intelligence', label: 'Intelligence', icon: <Cpu size={16}/>, color: '#6366f1' },
  { type: 'sector', label: 'Sector (Pharma)', icon: <Factory size={16}/>, color: '#ec4899' },
  { type: 'output', label: 'Final Output', icon: <Database size={16}/>, color: '#64748b' },
];

export default function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState([]);
  const [result, setResult] = useState(null);

  // --- FLOW HANDLERS ---
  const onNodesChange = useCallback((chs) => setNodes((nds) => applyNodeChanges(chs, nds)), []);
  const onEdgesChange = useCallback((chs) => setEdges((eds) => applyEdgeChanges(chs, eds)), []);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)), []);

  // --- DRAG & DROP LOGIC ---
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const onDrop = (event) => {
    event.preventDefault();
    const type = event.dataTransfer.getData('application/reactflow');
    const block = BLOCK_TYPES.find(b => b.type === type);
    
    // Calculate position relative to canvas
    const position = { x: event.clientX - 400, y: event.clientY - 100 };
    
    const newNode = {
      id: `${nodes.length + 1}`,
      type: 'default',
      position,
      data: { label: `${block.label}` },
      style: { background: block.color, color: '#fff', borderRadius: '8px', padding: '10px', width: 150 }
    };
    setNodes((nds) => nds.concat(newNode));
  };

  // --- FAKE "QUANTUM" ENGINE ---
  const runSimulation = () => {
    // Check if "Sector (Pharma)" is on the board
    const isPharma = nodes.some(n => n.data.label.includes('Pharma'));
    
    if (isPharma) {
      setResult({
        intelligence: "Hybrid Quantum-Neural Engine",
        qubits: "128 CQubits (Active)",
        confidence: "98.4%",
        latency: "14ms",
        cost: "$42.50 / run"
      });
    } else {
      setResult({
        intelligence: "Classical AI (Standard)",
        qubits: "N/A",
        confidence: "74.2%",
        latency: "450ms",
        cost: "$2.10 / run"
      });
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', background: '#0f172a', color: '#f8fafc', fontFamily: 'sans-serif' }}>
      
      {/* HEADERBAR */}
      <header style={{ height: '60px', borderBottom: '1px solid #1e293b', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', background: '#0f172a' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ background: '#6366f1', padding: '5px', borderRadius: '5px' }}><Zap size={20} color="white" /></div>
          <h2 style={{ margin: 0, fontSize: '1.1rem', letterSpacing: '1px' }}>QUANTUM <span style={{ fontWeight: 300, color: '#94a3b8' }}>ARCHITECT</span></h2>
        </div>
        <button 
          onClick={runSimulation}
          style={{ background: '#6366f1', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', transition: '0.2s' }}
          onMouseEnter={(e) => e.target.style.background = '#4f46e5'}
          onMouseLeave={(e) => e.target.style.background = '#6366f1'}
        >
          <Play size={16} fill="white"/> DEPLOY HYBRID LOGIC
        </button>
      </header>

      <main style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        
        {/* LEFT TOOLBOX */}
        <aside style={{ width: '280px', background: '#1e293b', padding: '20px', borderRight: '1px solid #334155' }}>
          <h4 style={{ color: '#94a3b8', textTransform: 'uppercase', fontSize: '0.75rem', marginBottom: '20px' }}>Components Library</h4>
          {BLOCK_TYPES.map((block) => (
            <div 
              key={block.type}
              onDragStart={(e) => onDragStart(e, block.type)}
              draggable
              style={{ 
                padding: '14px', marginBottom: '12px', background: '#0f172a', borderRadius: '8px', cursor: 'grab', display: 'flex', alignItems: 'center', gap: '12px', border: `1px solid ${block.color}66`, fontSize: '0.9rem'
              }}>
              <span style={{ color: block.color }}>{block.icon}</span>
              {block.label}
            </div>
          ))}
          <div style={{ marginTop: '40px', padding: '15px', background: '#334155', borderRadius: '8px', fontSize: '0.8rem', color: '#cbd5e1' }}>
            <strong>Pro Tip:</strong> Drag "Sector (Pharma)" to the canvas to trigger Quantum processing.
          </div>
        </aside>

        {/* CANVAS AREA */}
        <section style={{ flex: 1, position: 'relative' }} onDragOver={(e) => e.preventDefault()} onDrop={onDrop}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
          >
            <Background color="#334155" gap={25} size={1} />
            <Controls />
          </ReactFlow>
        </section>

        {/* RIGHT RESULTS PANEL */}
        {result && (
          <aside style={{ width: '320px', background: '#0f172a', borderLeft: '2px solid #6366f1', padding: '24px', boxShadow: '-10px 0 30px rgba(0,0,0,0.5)' }}>
            <h3 style={{ marginTop: 0, color: '#6366f1', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Cpu size={20}/> Analysis
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '30px' }}>
              <div>
                <label style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>Selected Intelligence</label>
                <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#f8fafc' }}>{result.intelligence}</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>Qubits</label>
                  <div style={{ fontWeight: 'bold' }}>{result.qubits}</div>
                </div>
                <div>
                  <label style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>Confidence</label>
                  <div style={{ fontWeight: 'bold', color: '#10b981' }}>{result.confidence}</div>
                </div>
              </div>
              <div style={{ padding: '15px', background: '#1e293b', borderRadius: '8px' }}>
                <label style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>Estimated Cost</label>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#f59e0b' }}>{result.cost}</div>
              </div>
            </div>
            <button 
              onClick={() => setResult(null)}
              style={{ width: '100%', marginTop: '40px', padding: '12px', background: 'transparent', border: '1px solid #334155', color: '#94a3b8', borderRadius: '6px', cursor: 'pointer' }}>
              Reset Dashboard
            </button>
          </aside>
        )}
      </main>
    </div>
  );
}
