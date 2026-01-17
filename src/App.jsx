import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  Panel, 
  applyEdgeChanges, 
  applyNodeChanges, 
  addEdge, 
  useReactFlow, 
  ReactFlowProvider,
  getBezierPath,
  BaseEdge
} from 'reactflow';
import { motion, AnimatePresence } from 'framer-motion';
import { Beaker, Cpu, Zap, Layers, RotateCcw, Shield, BarChart3, Activity } from 'lucide-react';
import 'reactflow/dist/style.css';

// --- THEME & STYLES ---
const theme = {
  bg: '#020617',
  sidebar: '#070a13',
  accent: '#2DD4BF',
  card: '#0f172a',
  border: '#1e293b',
  stream: '#2DD4BF' // Color of the data particles
};

// Inject CSS for the stream animation directly
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
  @keyframes dashdraw {
    from { stroke-dashoffset: 50; }
    to { stroke-dashoffset: 0; }
  }
  .quantum-stream {
    animation: dashdraw 0.8s linear infinite;
  }
`;
document.head.appendChild(styleSheet);

// --- CUSTOM EDGE COMPONENT ---
// This draws a base line AND an animated dashed line on top
const QuantumDataEdge = ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style = {}, markerEnd, data }) => {
  const [edgePath] = getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });
  const isAnimating = data?.isAnimating;

  return (
    <>
      {/* Base structural line (darker) */}
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={{ ...style, strokeWidth: 1, stroke: theme.border }} />
      
      {/* Animated data stream overlay (only shows when deploying) */}
      {isAnimating && (
        <BaseEdge 
          path={edgePath} 
          style={{ 
            strokeWidth: 3, 
            stroke: theme.stream, 
            strokeDasharray: "5 15", // Creates the "particles"
            opacity: 0.8 
          }} 
          className="quantum-stream" // Applies the CSS animation
        />
      )}
    </>
  );
};

const NODE_TYPES_CONFIG = [
  { id: 'q-gate', label: '5-Qubit Gate', color: '#3B82F6', icon: <Layers size={14}/> },
  { id: 'op', label: 'Add Operator', color: '#8B5CF6', icon: <Zap size={14}/> },
  { id: 'shaper', label: 'Q-Shaper', color: '#EC4899', icon: <Cpu size={14}/> },
  { id: 'mol', label: 'Target Molecule', color: '#10B981', icon: <Beaker size={14}/> },
];

const AlphaParadoxQC = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes] = useState([{ id: '1', type: 'input', data: { label: 'Quantum Core' }, position: { x: 250, y: 50 }, style: { background: theme.accent, color: '#000', fontWeight: 'bold', border: 'none' } }]);
  const [edges, setEdges] = useState([]);
  const [isDeploying, setIsDeploying] = useState(false);
  const [probs, setProbs] = useState([60, 40, 90, 30, 70, 20, 50, 85]);
  const { project } = useReactFlow();

  // Register custom edge type
  const edgeTypes = useMemo(() => ({ quantum: QuantumDataEdge }), []);

  // --- ANIMATION & STATE LOGIC ---
  
  // 1. Probability bar jitter
  useEffect(() => {
    const interval = setInterval(() => {
      setProbs(prev => prev.map(() => isDeploying ? Math.random() * 90 + 10 : Math.max(10, Math.min(100, Math.random() * 100))));
    }, isDeploying ? 100 : 800);
    return () => clearInterval(interval);
  }, [isDeploying]);

  // 2. Update edges when deployment state changes to trigger animation
  useEffect(() => {
    setEdges((eds) => 
      eds.map((e) => ({
        ...e,
        data: { ...e.data, isAnimating: isDeploying }, // Pass state to custom edge
        animated: !isDeploying // Use default slow animation when idle
      }))
    );
  }, [isDeploying]);

  const onNodesChange = useCallback((chs) => setNodes((nds) => applyNodeChanges(chs, nds)), []);
  const onEdgesChange = useCallback((chs) => setEdges((eds) => applyEdgeChanges(chs, eds)), []);
  
  // Connect using custom 'quantum' type
  const onConnect = useCallback((p) => setEdges((eds) => addEdge({ ...p, type: 'quantum', data: { isAnimating: isDeploying } }, eds)), [isDeploying]);

  const onDrop = (event) => {
    event.preventDefault();
    const data = JSON.parse(event.dataTransfer.getData('application/reactflow'));
    const bounds = reactFlowWrapper.current.getBoundingClientRect();
    const position = project({ x: event.clientX - bounds.left, y: event.clientY - bounds.top });
    const newNode = {
      id: Math.random().toString(),
      position,
      data: { label: data.label },
      style: { background: '#111827', color: '#fff', border: `1px solid ${data.color}`, borderRadius: '6px', fontSize: '11px', padding: '10px' }
    };
    setNodes((nds) => nds.concat(newNode));
  };

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', background: theme.bg, color: '#fff', fontFamily: 'monospace' }}>
      <aside style={{ width: '260px', background: theme.sidebar, borderRight: `1px solid ${theme.border}`, padding: '20px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px' }}>
          <Shield size={20} color={theme.accent} />
          <span style={{ fontWeight: 'bold', letterSpacing: '1px' }}>ALPHA PARADOX QC</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {NODE_TYPES_CONFIG.map(n => (
            <div key={n.id} draggable onDragStart={(e) => e.dataTransfer.setData('application/reactflow', JSON.stringify({ label: n.label, color: n.color }))} style={{ padding: '12px', background: theme.card, border: '1px solid #1e293b', borderRadius: '6px', fontSize: '12px', cursor: 'grab', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ color: n.color }}>{n.icon}</div> {n.label}
            </div>
          ))}
        </div>
        <button onClick={() => { setNodes([{ id: '1', type: 'input', data: { label: 'Quantum Core' }, position: { x: 250, y: 50 }, style: { background: theme.accent, color: '#000', fontWeight: 'bold', border: 'none' } }]); setEdges([]); }} style={{ marginTop: 'auto', background: 'transparent', border: '1px solid #1e293b', color: '#4b5563', padding: '10px', borderRadius: '6px', cursor: 'pointer', fontSize: '10px' }}>
          <RotateCcw size={12} /> RESET WORKSPACE
        </button>
      </aside>

      <main ref={reactFlowWrapper} style={{ flex: 1, position: 'relative' }}>
        <ReactFlow 
          nodes={nodes} edges={edges} edgeTypes={edgeTypes}
          onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} onDrop={onDrop} onDragOver={(e) => e.preventDefault()} fitView
        >
          <Background color="#1e293b" gap={25} />
          <Controls />
          <Panel position="bottom-center" style={{ marginBottom: '20px' }}>
            <div style={{ background: 'rgba(2,6,23,0.8)', border: '1px solid #1e293b', padding: '15px', borderRadius: '12px', width: '350px' }}>
              <div style={{ height: '50px', display: 'flex', alignItems: 'end', gap: '3px' }}>
                {probs.map((h, i) => ( <div key={i} style={{ flex: 1, height: `${h}%`, background: isDeploying ? theme.accent : '#3b82f6', borderRadius: '1px', transition: 'height 0.2s' }} /> ))}
              </div>
            </div>
          </Panel>
        </ReactFlow>
      </main>

      <aside style={{ width: '300px', background: theme.sidebar, borderLeft: `1px solid ${theme.border}`, padding: '20px', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ fontSize: '11px', color: theme.accent, marginBottom: '15px' }}>SYSTEM TELEMETRY</h2>
        <div style={{ marginBottom: '20px', borderBottom: '1px solid #1e293b', paddingBottom: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
            <span style={{ color: '#64748b' }}>Gates</span> <span>{nodes.length - 1}</span>
          </div>
        </div>
        <div style={{ flex: 1, background: '#000', padding: '15px', borderRadius: '6px', fontSize: '11px', color: '#93c5fd', border: '1px solid #1e293b', overflowY: 'auto' }}>
          <p style={{ color: '#f472b6' }}>import paradox_qc</p>
          <p>qc = paradox_qc.Circuit({nodes.length})</p>
          {nodes.slice(1).map((n, i) => ( <p key={i}>qc.gate('{n.data.label}', {i})</p> ))}
        </div>
        <button onClick={() => { setIsDeploying(true); setTimeout(() => setIsDeploying(false), 3000); }} style={{ marginTop: '20px', width: '100%', padding: '15px', background: theme.accent, color: '#000', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
          {isDeploying ? 'COMPUTING...' : 'EXECUTE SIMULATION'}
        </button>
      </aside>
    </div>
  );
};

export default function App() {
  return (
    <ReactFlowProvider>
      <AlphaParadoxQC />
    </ReactFlowProvider>
  );
}
