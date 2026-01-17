import Sidebar from "../components/Sidebar";
import Canvas from "../components/Canvas";
import OutputPanel from "../components/OutputPanel";

export default function Home() {
  return (
    <main style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <Canvas />
      <OutputPanel />
    </main>
  );
}
