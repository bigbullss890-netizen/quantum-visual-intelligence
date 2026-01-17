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
import { Beaker, Cpu, Zap, Factory, Play, BarChart3, Activity, Layers, RotateCcw, Shield } from 'lucide-react';
import 'reactflow/dist/style.css';

const theme = {
  bg: '#020617',
  sidebar: 'rgba(15, 23, 42, 0.85)',
  accent: '#2DD4BF',
  border: '#1E293B',
  neonBlue: '#3B82F6',
};

const NODE_TYPES = [
  { id: 'q-gate', label: '5-Qubit Gate', color: '#3B82F6', icon: <Layers size={14}/> },
  { id: 'op', label: 'Add Operator', color: '#8B5CF6', icon: <Zap size={14}/> },
  { id: 'shaper', label: 'Q-Shaper', color: '#EC4899', icon: <Cpu size={14}/> },
  { id: 'mol', label: 'Target Molecule', color: '#10B981', icon: <Beaker size={14}/> },
];

const AlphaParadoxQC = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes] = useState([
    { id: 'initial-1', type: 'input', data: { label: 'Quantum Input' }, position: { x: 250, y: 50 }, style: { background: '#2DD4BF', color: '#020617', fontWeight: 'bold', border: 'none', borderRadius: '4px' } },
  ]);
  const [edges, setEdges] = useState([]);
  const [isDeploying, setIsDeploying] = useState(false);
  const [probabilities, setProbabilities] = useState([60, 40, 90, 30, 70, 20, 50, 85]);
  
  const { project } = useReactFlow();

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

  const onNodesChange = useCallback((chs) => setNodes((nds) => applyNodeChanges(chs, nds)), []);
  const onEdgesChange = useCallback((chs) => setEdges((eds) => applyEdgeChanges(chs, eds)), []);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: theme.accent } }, eds)), []);

  const onReset = () => {
    setNodes([{ id: 'initial-1', type: 'input', data: { label: 'Quantum Input' }, position: { x: 250, y: 50 }, style: { background: theme.accent, color: '#020617', fontWeight: 'bold', border: 'none', borderRadius: '4px' } }]);
    setEdges([]);
  };

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
      style: { background: '#0F172A', color: '#fff', border: `1px solid ${data.color}`, borderRadius: '8px', fontSize: '11px', padding: '10px', boxShadow: `0 0 15px ${data.color}33` },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [project]);

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', background: theme.bg, color: '#f8fafc', fontFamily: 'monospace', overflow: 'hidden' }}>
      
      {/* 1. LEFT SIDEBAR */}
      <aside style={{ width: '280px', background: theme.sidebar, backdropFilter: 'blur(12px)', borderRight: `1px solid ${theme.border}`, padding: '25px', zIndex: 10, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px' }}>
          <Shield size={24} color={theme.accent} fill={`${theme.accent}33`} />
          <span style={{ fontWeight: 'bold', letterSpacing: '2px', fontSize: '1rem', color: '#fff' }}>ALPHA PARADOX <span style={{color: theme.accent}}>QC</span></span>
        </div>
        
        <h2 style={{ fontSize: '10px', color: '#64748b', letterSpacing: '1.5px', marginBottom: '20px' }}>MODULE LIBRARY</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {NODE_TYPES.map((node) => (
            <div 
              key={node.id}
              draggable
              onDragStart={(e) => onDragStart(e, node.id, node.label, node.color)}
              style={{ padding: '14px', background: 'rgba(30, 41, 59, 0.5)', border: '1px solid #334155', borderRadius: '8px', fontSize: '12px', cursor: 'grab', display: 'flex', alignItems: 'center', gap: '10px', transition: 'all 0.2s' }}
              onMouseOver={(e) => e.currentTarget.style.borderColor = node.color}
              onMouseOut={(e) => e.currentTarget.style.borderColor = '#334155'}
            >
              <div style={{ color: node.color }}>{node.icon}</div>
              {node.label}
            </div>
          ))}
        </div>

        <button 
          onClick={onReset}
          style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent', border: '1px solid #334155', color: '#64748b', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontSize: '11px', transition: '0.2s' }}
        >
          <RotateCcw size={14} /> RESET LAB ENVIRONMENT
        </button>
      </aside>

      {/* 2. MAIN CANVAS */}
      <main ref={reactFlowWrapper} style={{ flex: 1, position: 'relative' }}>
        <ReactFlow 
          nodes={nodes} edges={edges} 
          onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} 
          onConnect={onConnect} onDrop={onDrop
