import React, { useState, useCallback, useEffect, useRef } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  Panel, 
  applyEdgeChanges, 
  applyNodeChanges, 
  addEdge,
  useReactFlow,
  ReactFlowProvider
} from 'reactflow';
import { motion, AnimatePresence } from 'framer-motion';
import { Beaker, Cpu, Zap, Factory, Play, BarChart3, Activity, Layers } from 'lucide-react';
import 'reactflow/dist/style.css';

const theme = {
  bg: '#020617',
  sidebar: 'rgba(15, 23, 42, 0.8)',
  accent: '#2DD4BF',
  border: '#1E293B',
};

// --- DRAGGABLE LIBRARY ITEMS ---
const NODE_TYPES = [
  { id: 'q-gate', label: '5-Qubit Gate', color: '#3B82F6', icon: <Layers size={14}/> },
  { id: 'op', label: 'Add Operator', color: '#8B5CF6', icon: <Zap size={14}/> },
  { id: 'shaper', label: 'Q-Shaper', color: '#EC4899', icon: <Cpu size={14}/> },
  { id: 'mol', label: 'Target Molecule', color: '#10B981', icon: <Beaker size={14}/> },
];

const QuantumArchitect = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes] = useState([
    { id: 'initial-1', type: 'input', data: { label: 'Quantum Input' }, position: { x: 250, y: 50 }, style: { background: '#2DD4BF', color: '#020617', fontWeight: 'bold', border: 'none', borderRadius: '4px' } },
  ]);
  const [edges, setEdges] = useState([]);
  const [isDeploying, setIsDeploying] = useState(false);
  const [probabilities, setProbabilities] = useState([60, 40, 90, 30, 70, 20, 50, 85]);
  
  const { project } = useReactFlow();

  // --- ANIMATION LOGIC ---
  useEffect(() => {
    const interval = setInterval(() => {
      setProbabilities(prev => prev.map(h => 
        isDeploying 
          ? Math.floor(Math.random() * 80) + 10 
          : Math.max(10, Math.min(100, h + (Math.random() > 0.5 ? 5 : -5)))
      ));
    }, isDeploying ? 100 : 500);
    return () => clearInterval(interval);
  }, [isDeploying]);

  // --- FLOW HANDLERS ---
  const onNodesChange = useCallback((chs) => setNodes((nds) => applyNodeChanges(chs, nds)), []);
  const onEdgesChange = useCallback((chs) => setEdges((eds) => applyEdgeChanges(chs, eds)), []);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#2DD4BF' } }, eds)), []);

  // --- DRAG AND DROP LOGIC ---
  const onDragStart = (event, nodeType, label, color) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({ nodeType, label, color }));
    event.dataTransfer.effectAllowed = 'move';
  };

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback((event) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const data = JSON.parse(event.dataTransfer.getData('application/reactflow'));

    // Check if the dropped element is valid
    if (!data.nodeType) return;

    const position = project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });

    const newNode = {
      id: `node_${Math.random()}`,
      type: 'default',
      position,
      data: { label: data.label },
      style: { 
        background: '#1E293B', 
        color: '#fff', 
        border: `1px solid ${data.color}`, 
        borderRadius: '8px',
        fontSize: '12px',
        padding: '10px',
        boxShadow: `0 0 10px ${data.color}33`
      },
    };

    setNodes((nds) => nds.concat(newNode));
  }, [project]);

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', background: theme.bg, color: '#f8fafc', fontFamily: 'monospace', overflow: 'hidden' }}>
      
      {/* 1. LEFT SIDEBAR: DRAGGABLE LIBRARY */}
      <aside style={{ width: '280px', background: theme.sidebar, backdropFilter: 'blur(10px)', borderRight: `1px solid ${theme.border}`, padding: '25px', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px' }}>
          <Zap size={20} color={theme.accent} fill={theme.accent} />
          <span style={{ fontWeight: 'bold', letterSpacing: '2px', fontSize: '1rem' }}>Q-ARCHITECT</span>
        </div>
        
        <h2 style={{ fontSize: '10px', color: '#64748b', letterSpacing: '1px', marginBottom: '20px' }}>NODE LIBRARY</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {NODE_TYPES.map((node) => (
            <div 
              key={node.id}
              draggable
              onDragStart={(e) => onDragStart(e, node.id, node.label, node.color)}
              style={{ 
                padding: '12px', 
                background: '#1e293b', 
                border: '1px solid #334155', 
                borderRadius: '8px', 
                fontSize: '12px', 
                cursor: 'grab', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px',
                transition: 'border 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = node.color}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#334155'}
            >
              <div style={{ color: node.color }}>{node.icon}</div>
              {node.label}
            </div>
          ))}
        </div>
        <div style={{ marginTop: '30px', padding: '15px', background: 'rgba(45, 212, 191, 0.05)', border: '1px dashed #2DD4BF44', borderRadius: '8px', fontSize: '11px', color: '#94a3b8', lineHeight: '1.4' }}>
          Tip: Drag nodes onto the canvas and connect them to build the circuit.
        </div>
      </aside>

      {/* 2. MAIN CANVAS AREA */}
      <main ref={reactFlowWrapper} style={{ flex: 1, position: 'relative' }}>
        <ReactFlow 
          nodes={nodes} 
          edges={edges} 
          onNodesChange={onNodesChange} 
          onEdgesChange={onEdgesChange} 
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
        >
          <Background color="#1e293b" gap={30} size={1} />
          <Controls />
          
          <Panel position="bottom-center" style={{ marginBottom: '30px' }}>
            <div style={{ background: 'rgba(15, 23, 42, 0.95)', border: `1px solid ${isDeploying ? theme.accent : '#334155'}`, padding: '15px', borderRadius: '12px', width: '400px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '10px' }}>
                <span style={{ color: theme.accent, display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Activity size={12} className={isDeploying ? 'animate-pulse' : ''} /> 
                    {isDeploying ? 'COMPUTING AMPLITUDES...' : 'PROBABILITY AMPLITUDE'}
                </span>
                <span style={{ color: '#64748b' }}>|ψ⟩ state</span>
              </div>
              <div style={{ height: '60px', display: 'flex', alignItems: 'end', gap: '4px' }}>
                {probabilities.map((h, i) => (
                  <div key={i} style={{ flex: 1, height: `${h}%`, background: isDeploying ? theme.accent : `linear-gradient(to top, #3b82f
