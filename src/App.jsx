import React from 'react';
import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
import { Zap } from 'lucide-react';

const initialNodes = [
  { 
    id: '1', 
    data: { label: 'START HERE' }, 
    position: { x: 100, y: 100 },
    style: { background: '#6366f1', color: 'white', padding: '10px', borderRadius: '5px' }
  }
];

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* HEADER: If you see this, JavaScript is working */}
      <div style={{ height: '60px', background: '#1e293b', display: 'flex', alignItems: 'center', padding: '0 20px', borderBottom: '1px solid #334155' }}>
        <Zap color="#6366f1" style={{ marginRight: '10px' }} />
        <h2 style={{ color: 'white', margin: 0, fontSize: '18px' }}>QUANTUM SYSTEM ACTIVE</h2>
      </div>

      <div style={{ flex: 1, position: 'relative' }}>
        <ReactFlow nodes={initialNodes}>
          <Background color="#334155" gap={20} />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}
