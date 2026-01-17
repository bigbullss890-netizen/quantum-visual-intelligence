import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, { Background, Controls, Panel, applyEdgeChanges, applyNodeChanges, addEdge } from 'reactflow';
import { motion, AnimatePresence } from 'framer-motion';
import { Beaker, Cpu, Zap, Factory, Play, ShieldCheck, Code, BarChart3, Activity } from 'lucide-react';
import 'reactflow/dist/style.css';

const theme = {
  bg: '#020617',
  sidebar: 'rgba(15, 23, 42, 0.8)',
  accent: '#2DD4BF',
  border: '#1E293B',
};

export default function App() {
  const [nodes, setNodes] = useState([
    { id: '1', type: 'input', data: { label: 'Quantum Input' }, position: { x: 250, y: 50 }, style: { background: '#2DD4BF', color: '#020617', fontWeight: 'bold', border: 'none', borderRadius: '4px' } },
  ]);
  const [edges, setEdges] = useState([]);
  const [isDeploying, setIsDeploying] = useState(false);
  
  // State for the moving bars
  const [probabilities, setProbabilities] = useState([60, 40, 90, 30, 70, 20, 50, 85]);

  // --- ANIMATION LOGIC ---
  useEffect(() => {
    let interval;
    if (isDeploying) {
      // Jitter the bars every 100ms when deploying
      interval = setInterval(() => {
        setProbabilities(prev => prev.map(() => Math.floor(Math.random() * 80) + 10));
      }, 100);
    } else {
      // Slow "idle" movement
      interval = setInterval(() => {
        setProbabilities(prev => prev.map(h => Math.max(10, Math.min(100, h + (Math.random() > 0.5 ? 5 : -5)))));
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isDeploying]);

  const onNodesChange = useCallback((chs) => setNodes((nds) => applyNodeChanges(chs, nds)), []);
  const onEdgesChange = useCallback((chs) => setEdges((eds) => applyEdgeChanges(chs, eds)), []);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#2DD4BF' } }, eds)), []);

  const handleDeploy = () => {
    setIsDeploying(true);
    setTimeout(() => setIsDeploying(false), 3000); // Stop after 3 seconds
  };

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', background: theme.bg, color: '#f8fafc', fontFamily: 'monospace', overflow: 'hidden' }}>
      
      {/* 1. LEFT SIDEBAR */}
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
          
          <Panel position="bottom-center" style={{ marginBottom: '30px' }}>
            <div style={{ background: 'rgba(15, 23, 42, 0.95)', border: `1px solid ${isDeploying ? theme.accent : '#334155'}`, padding: '15px', borderRadius: '12px', width: '400px', transition: 'border 0.3s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '10px' }}>
                <span style={{ color: theme.accent, display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Activity size={12} className={isDeploying ? 'animate-pulse' : ''} /> 
                    {isDeploying ? 'COMPUTING AMPLITUDES...' : 'PROBABILITY AMPLITUDE'}
                </span>
                <span style={{ color: '#64748b' }}>|ψ⟩ = α|0⟩ + β|1⟩</span>
              </div>
              <div style={{ height: '60px', display: 'flex', alignItems: 'end', gap: '4px' }}>
                {probabilities.map((h, i) => (
                  <div 
                    key={i}
                    style={{ 
                        flex: 1, 
                        height: `${h}%`, 
                        background: isDeploying ? theme.accent : `linear-gradient(to top, #3b82f6, ${theme.accent})`, 
                        borderRadius: '2px 2px 0 0',
                        transition: isDeploying ? 'none' : 'height 0.5s ease'
                    }} 
                  />
                ))}
              </div>
            </div>
          </Panel>
        </ReactFlow>
      </main>

      {/* 3. RIGHT SIDEBAR */}
      <aside style={{ width: '320px', background: theme.sidebar, backdropFilter: 'blur(10px)', borderLeft: `1px solid ${theme.border}`, padding: '25px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '12px', color: theme.accent, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <BarChart3 size={16} /> BUILD METRICS
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <Metric label="Coherence" value={isDeploying ? "94.2%" : "98.2%"} color={theme.accent} />
            <Metric label="Qubits" value="5" color="#fff" />
            <Metric label="Cost" value="$0.12" color="#f59e0b" />
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '10px', color: '#64748b', marginBottom: '10px' }}>KERNEL OUTPUT (QISKIT)</h3>
          <div style={{ flex: 1, background: '#000', borderRadius: '8px', padding: '15px', fontSize: '11px', color: '#93c5fd', border: '1px solid #1e293b', overflowY: 'auto', borderLeft: isDeploying ? `2px solid ${theme.accent}` : '1px solid #1e293b' }}>
            <p><span style={{ color: '#f472b6' }}>import</span> qiskit</p>
            <p style={{ color: theme.accent }}>qc = QuantumCircuit(5)</p>
            <p>qc.h(0)</p>
            <p>qc.cx(0, 1)</p>
            {isDeploying && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: theme.accent }}>qc.execute(backend='ibm_oslo')</motion.p>}
            <p style={{ color: '#475569', marginTop: '10px' }}>{isDeploying ? '> Running on hardware...' : '// Kernel Ready'}</p>
          </div>
          
          <button 
            onClick={handleDeploy}
            disabled={isDeploying}
            style={{ 
                marginTop: '20px', 
                width: '100%', 
                padding: '15px', 
                background: isDeploying ? '#1e293b' : theme.accent, 
                color: isDeploying ? '#94a3b8' : '#020617', 
                border: 'none', 
                borderRadius: '8px', 
                fontWeight: 'bold', 
                cursor: isDeploying ? 'not-allowed' : 'pointer', 
                boxShadow: isDeploying ? 'none' : `0 0 20px ${theme.accent}44`,
                transition: '0.3s'
            }}
          >
            {isDeploying ? 'SYNTHESIZING...' : 'DEPLOY ENGINE'}
          </button>
        </div>
      </aside>

      {/* STATUS NOTIFICATION */}
      <AnimatePresence>
        {isDeploying && (
          <motion.div 
            initial={{ opacity: 0, x: 50 }} 
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            style={{ position: 'absolute', top: '80px', right: '340px', background: '#064e3b', color: '#10b981', padding: '10px 20px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', border: '1px solid #10b981', zIndex: 100 }}
          >
            ✓ QUANTUM STATE INITIALIZED
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const Metric = ({ label, value, color }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1e293b', paddingBottom: '8px' }}>
    <span style={{ fontSize: '12px', color: '#94a3b8' }}>{label}</span>
    <span style={{ fontWeight: 'bold', color: color }}>{value}</span>
  </div>
);
