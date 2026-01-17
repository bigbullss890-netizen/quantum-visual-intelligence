"use client";

export default function OutputPanel() {
  return (
    <div
      style={{
        width: "20%",
        padding: 16,
        borderLeft: "1px solid #ddd",
      }}
    >
      <h3>Execution Output</h3>
      <p>Selected Intelligence: Hybrid</p>
      <p>Confidence: 72%</p>

      <button style={{ marginTop: 10 }}>RUN</button>
    </div>
  );
}
