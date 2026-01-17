import Sidebar from "./components/Sidebar";
import Canvas from "./components/Canvas";
import OutputPanel from "./components/OutputPanel";

export default function App() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <Canvas />
      <OutputPanel />
    </div>
  );
}
