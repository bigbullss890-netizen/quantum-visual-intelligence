"use client";

import ReactFlow, { Background } from "reactflow";
import "reactflow/dist/style.css";

const nodes = [
  {
    id: "1",
    position: { x: 100, y: 100 },
    data: { label: "🧬 Molecule" }
  },
  {
    id: "2",
    position: { x: 350, y: 200 },
    data: { label: "🧠 Intelligence" }
  }
];

const edges = [{ id: "e1-2", source: "1", target: "2" }];

export default function Canvas() {
  return (
    <div style={{ width: "60%", height: "100%" }}>
      <ReactFlow nodes={nodes} edges={edges}>
        <Background />
      </ReactFlow>
    </div>
  );
}
