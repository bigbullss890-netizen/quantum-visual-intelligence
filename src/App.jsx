import React, { useState, useCallback } from 'react';
import ReactFlow, { Background, Controls, applyEdgeChanges, applyNodeChanges, addEdge } from 'reactflow';
import 'reactflow/dist/style.css';
import { Beaker, Cpu, Play, Zap } from 'lucide-react';

// INLINE STYLES to bypass CSS issues
const styles = {
  wrapper: { width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', background: '#0f172a', color: 'white', margin: 0, padding: 0, overflow: 'hidden' },
  header: { height: '60px', borderBottom: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' },
  main: { flex: 1, display: 'flex', overflow: 'hidden' },
  sidebar: { width: '250px', background: '#1e293b', padding: '20px', borderRight: '1px solid #334155' },
  canvas: { flex: 1, position: 'relative', background: '#0f172a' },
  block: { padding: '12px', marginBottom: '10px', background: '#0f172a', borderRadius: '8px', cursor: 'grab', border: '1px solid #6366f1', display: 'flex', alignItems: 'center', gap: '10px' }
};

export default function App() {
  const [nodes, setNodes] = useState([{ id: '1', data: { label: 'Quantum Start' }, position: { x: 100, y: 100 }, style: { background: '#6366f1', color: 'white' } }]);
  const [edges, setEdges] = useState([]);

  const onNodesChange = useCallback((chs) => setNodes((nds) => applyNodeChanges(chs, nds)), []);
  const onEdgesChange = useCallback((chs) => setEdges((eds) => applyEdgeChanges(chs, eds)), []);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  return (
    <div style={styles.wrapper}>
      <header style={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Zap color="#6366f1" />
          <span style={{ fontWeight: 'bold' }}>QUANTUM LABS</span>
        </div>
        <button style={{ background: '#6366f1', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px' }}>RUN DEMO</button>
      </header>

      <div style={styles.main}>
        <div style={styles.sidebar}>
          <p style={{ fontSize: '12px', color: '#94a3b8' }}>DRAG COMPONENTS</p>
          <div style={styles.block}><Beaker size={16}/> Molecule</div>
          <div style={styles.block}><Cpu size={16}/> Q-Processor</div>
        </div>

        <div style={styles.canvas}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
          >
            <Background color="#334155" />
            <Controls />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}
