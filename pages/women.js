import WomenGallery from "../components/WomenGallery";
export default function WomenPage() {
  return (
    <div style={{ textAlign: "center", padding: 30 }}>
      <h1>معرض قصات شعر نسائية</h1>
      <WomenGallery />
    </div>
  );
}
// /components/WomenGallery.js
// بديل بسيط للعرض الثلاثي الأبعاد (صور فقط):
function HairModel({ modelPath }) {
  return <img src={modelPath} alt="قصة شعر" style={{ width: 120, height: 180, borderRadius: 12 }} />;
}

const models = [
  { path: "/models/long-hair.jpg", label: "شعر طويل" },
  { path: "/models/bob-style.jpg", label: "بوب نسائي" }
];

export default function WomenGallery() {
  return (
    <div style={{ width: "100%", minHeight: "240px", background: "#fcf8fb", borderRadius: 12, padding: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 25 }}>
        {models.map((m, i) => (
          <div key={i} style={{textAlign:"center"}}>
            <HairModel modelPath={m.path} />
            <span style={{display:"block", marginTop:5}}>{m.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
