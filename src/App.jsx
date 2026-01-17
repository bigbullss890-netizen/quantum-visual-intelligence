import React, { useState, useCallback } from 'react';
import ReactFlow, { Background, Controls, Panel, applyEdgeChanges, applyNodeChanges, addEdge } from 'reactflow';
import { motion } from 'framer-motion';
import { Beaker, Cpu, Zap, Factory, Play, ShieldCheck, Code, BarChart3 } from 'lucide-react';
import 'reactflow/dist/style.css';

// --- THEME CONSTANTS ---
const theme = {
  bg: '#020617',
  sidebar: 'rgba(15, 23, 42, 0.8)',
  accent: '#2DD4BF',
  border: '#1E293B',
};

export default function App() {
  const [nodes, setNodes] = useState([
    { id: '1', type: 'input', data: { label: 'Quantum Input' }, position: { x: 250, y: 50 }, style: { background: '#2DD4BF', color: '#020617', fontWeight: 'bold', border: 'none' } },
  ]);
  const [edges, setEdges] = useState([]);
  const [isDeploying, setIsDeploying] = useState(false);

  const onNodesChange = useCallback((chs) => setNodes((nds) => applyNodeChanges(chs, nds)), []);
  const onEdgesChange = useCallback((chs) => setEdges((eds) => applyEdgeChanges(chs, eds)), []);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#2DD4BF' } }, eds)), []);

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', background: theme.bg, color: '#f8fafc', fontFamily: 'monospace', overflow: 'hidden' }}>
      
      {/* 1. LEFT SIDEBAR: NODE LIBRARY */}
      <aside style={{ width: '280px', background: theme.sidebar, backdropFilter: 'blur(10px)', borderRight: `1px solid ${theme.border}`, padding: '25px', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px' }}>
          <Zap size={20} color={theme.accent} fill={theme.accent} />
          <span style={{ fontWeight: 'bold', letterSpacing: '2px', fontSize: '1rem' }}>Q-ARCHITECT</span>
        </div>
        
        <h2 style={{ fontSize: '10px', color: '#64748b', letterSpacing: '1px', marginBottom: '20px' }}>NODE LIBRARY</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {['5-Qubit Gate', 'Add Operator', 'Q-Shaper', 'Target Molecule'].map((item) => (
            <motion.div 
              key={item}
              whileHover={{ scale: 1.02, x: 5 }}
              style={{ padding: '12px', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', fontSize: '12px', cursor: 'grab', display: 'flex', alignItems: 'center', gap: '10px' }}
            >
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: theme.accent }} /> {item}
            </motion.div>
          ))}
        </div>
      </aside>

      {/* 2. MAIN CANVAS */}
      <main style={{ flex: 1, position: 'relative' }}>
        <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} fitView>
          <Background color="#1e293b" gap={30} size={1} />
          <Controls />
          
          {/* PROBABILITY GRAPH OVERLAY */}
          <Panel position="bottom-center" style={{ marginBottom: '30px' }}>
            <div style={{ background: 'rgba(15, 23, 42, 0.9)', border: '1px solid #334155', padding: '15px', borderRadius: '12px', width: '400px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '10px' }}>
                <span style={{ color: theme.accent }}>PROBABILITY AMPLITUDE</span>
                <span style={{ color: '#64748b' }}>|ψ⟩ state</span>
              </div>
              <div style={{ height: '60px', display: 'flex', alignItems: 'end', gap: '4px' }}>
                {[60, 40, 90, 30, 70, 20, 50, 85].map((h, i) => (
                  <motion.div 
                    key={i}
                    initial={{ height: 0 }} 
                    animate={{ height: `${h}%` }} 
                    style={{ flex: 1, background: `linear-gradient(to top, #3b82f6, ${theme.accent})`, borderRadius: '2px 2px 0 0' }} 
                  />
                ))}
              </div>
            </div>
          </Panel>
        </ReactFlow>
      </main>

      {/* 3. RIGHT SIDEBAR: CODE BAR & METRICS */}
      <aside style={{ width: '320px', background: theme.sidebar, backdropFilter: 'blur(10px)', borderLeft: `1px solid ${theme.border}`, padding: '25px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '12px', color: theme.accent, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <BarChart3 size={16} /> BUILD METRICS
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <Metric label="Confidence" value="98.2%" color={theme.accent} />
            <Metric label="Qubits" value="5" color="#fff" />
            <Metric label="Cost" value="$0.12" color="#f59e0b" />
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '10px', color: '#64748b', marginBottom: '10px' }}>KERNEL OUTPUT (QISKIT)</h3>
          <div style={{ flex: 1, background: '#000', borderRadius: '8px', padding: '15px', fontSize: '11px', color: '#93c5fd', border: '1px solid #1e293b', overflowY: 'auto' }}>
            <p><span style={{ color: '#f472b6' }}>import</span> qiskit</p>
            <p style={{ color: theme.accent }}>qc = QuantumCircuit(5)</p>
            <p>qc.h(0)</p>
            <p>qc.cx(0, 1)</p>
            <p>qc.measure_all()</p>
            <p style={{ color: '#475569', marginTop: '10px' }}>// Executing on ibm_oslo...</p>
          </div>
          
          <button 
            onClick={() => setIsDeploying(true)}
            style={{ marginTop: '20px', width: '100%', padding: '15px', background: theme.accent, color: '#020617', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', boxShadow: `0 0 20px ${theme.accent}44` }}
          >
            {isDeploying ? 'RUNNING SYSTHESIS...' : 'DEPLOY ENGINE'}
          </button>
        </div>
      </aside>

      {/* SUCCESS NOTIFICATION */}
      {isDeploying && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ position: 'absolute', top: '20px', right: '340px', background: '#10b981', padding: '10px 20px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold' }}
        >
          ✓ QUANTUM KERNEL DEPLOYED
        </motion.div>
      )}
    </div>
  );
}

const Metric = ({ label, value, color }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1e293b', paddingBottom: '8px' }}>
    <span style={{ fontSize: '12px', color: '#94a3b8' }}>{label}</span>
    <span style={{ fontWeight: 'bold', color: color }}>{value}</span>
  </div>
);
