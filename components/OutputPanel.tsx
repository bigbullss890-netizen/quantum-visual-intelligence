"use client";

export default function OutputPanel() {
  return (
    <div style={{ width: "20%", padding: 12, borderLeft: "1px solid #ddd" }}>
      <h3>Execution Output</h3>

      <p><strong>Selected Intelligence:</strong> Hybrid Quantum</p>
      <p><strong>Estimated Qubits:</strong> 12</p>
      <p><strong>Expected Advantage:</strong> 1.7×</p>
      <p><strong>Confidence:</strong> 72%</p>

      <button
        style={{
          marginTop: 12,
          padding: 8,
          width: "100%",
          cursor: "pointer"
        }}
      >
        RUN
      </button>
    </div>
  );
}
