export default function Sidebar() {
  const blocks = [
    "🧬 Molecule",
    "⚙️ Constraint",
    "🧠 Intelligence",
    "🏭 Sector",
    "📤 Output"
  ];

  return (
    <div style={{ width: "20%", padding: 12, borderRight: "1px solid #ddd" }}>
      <h3>Blocks</h3>
      {blocks.map((b) => (
        <div
          key={b}
          style={{
            padding: 8,
            marginBottom: 8,
            background: "#f2f2f2",
            borderRadius: 4
          }}
        >
          {b}
        </div>
      ))}
    </div>
  );
}
