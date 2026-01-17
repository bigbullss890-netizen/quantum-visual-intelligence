import React, { useState, useCallback, useRef } from 'react';
import {
  Header, HeaderName, HeaderGlobalBar, HeaderGlobalAction,
  SideNav, SideNavItems, SideNavLink,
  Theme, Tile, Button, Grid, Column,
  Tabs, Tab, TabList, TabPanels, TabPanel,
  Loading, CodeSnippet
} from '@carbon/react';
import { LogoGithub, UserAvatar, Dashboard, Code, Gateway, PlayFilledAlt, Terminal } from '@carbon/icons-react';
import Editor from '@monaco-editor/react';
import ReactFlow, { Background, Controls, useNodesState, useEdgesState, addEdge } from 'reactflow';
import 'reactflow/dist/style.css';
import { QuantumSimulator } from './QuantumEngine'; // Importing our Custom Backend

// --- CARBON STYLE NODE ---
const GateNode = ({ data }) => (
  <Tile style={{ 
    width: '60px', height: '60px', padding: 0, 
    display: 'flex', alignItems: 'center', justifyContent: 'center', 
    background: '#393939', border: '1px solid #525252' 
  }}>
    <span style={{ color: '#A8A8A8', fontWeight: 'bold', fontSize: '14px' }}>{data.label}</span>
  </Tile>
);
const nodeTypes = { gate: GateNode };

export default function App() {
  // State
  const [nodes, setNodes, onNodesChange] = useNodesState([
    { id: 'q0', type: 'input', data: { label: 'q[0]' }, position: { x: 50, y: 100 }, draggable: false, style: { background: 'transparent', border: 'none', color: 'white' } },
    { id: 'gate1', type: 'gate', data: { label: 'H', type: 'gate' }, position: { x: 150, y: 80 } },
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState(null);
  const simulator = useRef(new QuantumSimulator(2));

  // Handlers
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const handleRun = () => {
    setIsRunning(true);
    setResult(null);

    // Call our Custom Backend Engine
    setTimeout(() => {
      const data = simulator.current.run(nodes);
      setResult(data);
      setIsRunning(false);
    }, 1500); // Fake network latency for realism
  };

  return (
    <Theme theme="g100">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        
        {/* 1. IBM GLOBAL HEADER */}
        <Header aria-label="IBM Quantum">
          <HeaderName href="#" prefix="IBM">Quantum Platform</HeaderName>
          <HeaderGlobalBar>
            <HeaderGlobalAction><Terminal size={20} /></HeaderGlobalAction>
            <HeaderGlobalAction><UserAvatar size={20} /></HeaderGlobalAction>
          </HeaderGlobalBar>
        </Header>

        <div style={{ display: 'flex', flex: 1, marginTop: '48px' }}>
          
          {/* 2. SIDE NAVIGATION */}
          <SideNav isFixedNav expanded aria-label="Side navigation">
            <SideNavItems>
              <SideNavLink renderIcon={Dashboard} onClick={() => setActiveTab(0)} isActive={activeTab === 0}>Dashboard</SideNavLink>
              <SideNavLink renderIcon={Gateway} onClick={() => setActiveTab(1)} isActive={activeTab === 1}>Composer</SideNavLink>
              <SideNavLink renderIcon={Code} onClick={() => setActiveTab(2)} isActive={activeTab === 2}>Lab (IDE)</SideNavLink>
            </SideNavItems>
          </SideNav>

          {/* 3. MAIN CONTENT AREA */}
          <main style={{ flex: 1, background: '#161616', padding: '1rem', marginLeft: '16rem' }}>
            {activeTab === 1 ? (
              <Grid fullWidth>
                {/* TOP BAR: ACTIONS */}
                <Column lg={16} style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                  <h2 style={{ color: 'white', fontWeight: '300' }}>Circuit Composer</h2>
                  <Button renderIcon={PlayFilledAlt} onClick={handleRun} disabled={isRunning}>
                    {isRunning ? 'Queued...' : 'Run on Simulator'}
                  </Button>
                </Column>

                {/* VISUAL COMPOSER */}
                <Column lg={12}>
                  <div style={{ height: '60vh', border: '1px solid #393939', marginBottom: '1rem' }}>
                    <ReactFlow 
                      nodes={nodes} edges={edges} 
                      onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} 
                      onConnect={onConnect} nodeTypes={nodeTypes} fitView
                    >
                      <Background color="#262626" gap={20} />
                      <Controls />
                    </ReactFlow>
                  </div>
                </Column>

                {/* RESULTS PANEL (Real Data from Engine) */}
                <Column lg={4}>
                  <Tile style={{ height: '60vh', background: '#262626' }}>
                    <h4 style={{ color: 'white', marginBottom: '1rem' }}>Job Results</h4>
                    {isRunning && <Loading description="Running quantum job..." withOverlay={false} />}
                    
                    {result && !isRunning && (
                      <div style={{ color: '#c6c6c6' }}>
                        <div style={{ marginBottom: '1rem' }}>
                          <span style={{ color: '#42be65' }}>● Completed</span>
                          <p style={{ fontSize: '12px' }}>Backend: Custom-Aer-1</p>
                        </div>
                        <p style={{ marginBottom: '0.5rem' }}>Probabilities:</p>
                        {result.probabilities.map((p, i) => (
                           p > 0 && (
                            <div key={i} style={{ marginBottom: '5px' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                                <span>|{i.toString(2).padStart(2, '0')}⟩</span>
                                <span>{(p * 100).toFixed(1)}%</span>
                              </div>
                              <div style={{ width: '100%', height: '4px', background: '#393939' }}>
                                <div style={{ width: `${p * 100}%`, height: '100%', background: '#0f62fe' }}></div>
                              </div>
                            </div>
                           )
                        ))}
                      </div>
                    )}
                  </Tile>
                </Column>
              </Grid>
            ) : (
              // CODE EDITOR VIEW (Monaco)
              <div style={{ height: '100%' }}>
                 <Editor 
                   height="85vh" 
                   defaultLanguage="python" 
                   defaultValue="# Qiskit Code (Running on Custom Backend)
from custom_backend import QuantumCircuit

qc = QuantumCircuit(2)
qc.h(0)
qc.cx(0, 1)
qc.measure_all()
" 
                   theme="vs-dark"
                 />
              </div>
            )}
          </main>
        </div>
      </div>
    </Theme>
  );
}
