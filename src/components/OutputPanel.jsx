export default function OutputPanel() {
  return (
    <div style={{ width: "20%", padding: 10, borderLeft: "1px solid #ddd" }}>
      <h3>Execution Output</h3>
      <p>Selected Intelligence: Hybrid Quantum</p>
      <p>Estimated Qubits: 12</p>
      <p>Expected Advantage: 1.7x</p>
      <p>Confidence: 72%</p>
      <button style={{ marginTop: 10 }}>RUN</button>
    </div>
  );
}
