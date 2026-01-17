import React from 'react';
import ReactFlow, { Background } from 'reactflow';
import 'reactflow/dist/style.css';

export default function App() {
  const initialNodes = [
    { 
      id: '1', 
      data: { label: 'SYSTEM ONLINE' }, 
      position: { x: 250, y: 150 },
      style: { background: '#6366f1', color: 'white', padding: '20px', borderRadius: '10px', width: 200, textAlign: 'center' }
    }
  ];

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', background: '#0f172a' }}>
      
      {/* Test Header */}
      <div style={{ padding: '20px', borderBottom: '1px solid #334155', color: 'white', fontWeight: 'bold' }}>
        REACT IS WORKING - QUANTUM PROTOTYPE
      </div>

      {/* React Flow Container */}
      <div style={{ flex: 1, height: '100%' }}>
        <ReactFlow nodes={initialNodes}>
          <Background color="#334155" variant="dots" gap={20} />
        </ReactFlow>
      </div>
    </div>
  );
}
