"use client";

import ReactFlow from "reactflow";
import "reactflow/dist/style.css";

const nodes = [
  {
    id: "1",
    position: { x: 100, y: 100 },
    data: { label: "🧬 Molecule" },
  },
];

export default function Canvas() {
  return (
    <div style={{ height: "100%", background: "#fff" }}>
      <ReactFlow nodes={nodes} />
    </div>
  );
}
