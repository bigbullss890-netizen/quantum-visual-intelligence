import ReactFlow, { Background } from "reactflow";
import "reactflow/dist/style.css";

const nodes = [
  {
    id: "1",
    data: { label: "🧬 Molecule" },
    position: { x: 100, y: 100 }
  },
  {
    id: "2",
    data: { label: "🧠 Intelligence" },
    position: { x: 300, y: 200 }
  }
];

const edges = [
  { id: "e1-2", source: "1", target: "2" }
];

export default function Canvas() {
  return (
    <div style={{ width: "60%", height: "100%" }}>
      <ReactFlow nodes={nodes} edges={edges}>
        <Background />
      </ReactFlow>
    </div>
  );
}
