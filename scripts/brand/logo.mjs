// Gera conceitos da logo da CDPEMA a partir da geometria da marca original
// (pinheiro + peixe + pássaro), com cantos arredondados.
// Uso: node scripts/brand/logo.mjs
import { mkdirSync, writeFileSync } from "node:fs";

// Geometria medida sobre a logo original (viewBox 0 0 200 200).
const G = {
  tree: [
    [55.6, 101],
    [100.4, 145.6],
    [76.7, 145.6],
    [88.9, 159],
    [64.4, 159],
    [74, 170.7],
    [38.9, 170.7],
    [47.8, 159],
    [25, 159],
    [35.5, 145.6],
    [10, 145.6],
  ],
  trunk: { x: 53.4, y: 171, w: 4.4, h: 18 },
  fish: [
    [99.6, 57],
    [144.9, 104.9],
    [104, 144.9],
    [57.3, 98.4],
  ],
  tail: [
    [148, 106],
    [173.8, 80.4],
    [173.8, 133.3],
  ],
  bird: [
    [96, 48],
    [101, 32],
    [113.8, 43],
    [147, 11],
    [149.3, 59.6],
    [190, 62.2],
    [147, 103.3],
  ],
  beak: [
    [79, 44.6],
    [95, 41.4],
    [95, 47.4],
  ],
  fishEye: { x: 87, y: 91.8, r: 4 },
  birdEye: { x: 101.8, y: 41.6, r: 2.7 },
};

const f = (n) => +n.toFixed(2);

// Polígono com cantos arredondados (curva quadrática em cada vértice).
function rounded(points, r, rConcave = r * 0.6) {
  const n = points.length;
  const area = points.reduce(
    (s, [x, y], i) =>
      s + x * points[(i + 1) % n][1] - points[(i + 1) % n][0] * y,
    0,
  );
  const sign = Math.sign(area);
  let d = "";
  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n],
      p1 = points[i],
      p2 = points[(i + 1) % n];
    const v1 = [p0[0] - p1[0], p0[1] - p1[1]],
      v2 = [p2[0] - p1[0], p2[1] - p1[1]];
    const l1 = Math.hypot(...v1),
      l2 = Math.hypot(...v2);
    const cross = v1[0] * v2[1] - v1[1] * v2[0];
    const concave = Math.sign(cross) === sign;
    const rr = Math.min(concave ? rConcave : r, l1 / 2.2, l2 / 2.2);
    const a = [p1[0] + (v1[0] / l1) * rr, p1[1] + (v1[1] / l1) * rr];
    const b = [p1[0] + (v2[0] / l2) * rr, p1[1] + (v2[1] / l2) * rr];
    d += `${i ? "L" : "M"}${f(a[0])} ${f(a[1])}Q${f(p1[0])} ${f(p1[1])} ${f(b[0])} ${f(b[1])}`;
  }
  return `${d}Z`;
}

const hole = ({ x, y, r }) =>
  `M${f(x - r)} ${f(y)}a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0 ${-r * 2} 0Z`;

function mark({ r, rc, colors, trunk = true }) {
  const t = G.trunk;
  const c = colors;
  return `
  <path fill="${c.green}" d="${rounded(G.tree, r, rc)}"/>
  ${trunk ? `<rect fill="${c.green}" x="${t.x}" y="${t.y}" width="${t.w}" height="${t.h}" rx="${t.w / 2}"/>` : ""}
  <path fill="${c.blue}" fill-rule="evenodd" d="${rounded(G.fish, r, rc)}${hole(G.fishEye)}"/>
  <path fill="${c.blueTail ?? c.blue}" d="${rounded(G.tail, r, rc)}"/>
  <path fill="${c.yellow}" fill-rule="evenodd" d="${rounded(G.bird, r, rc)}${hole(G.birdEye)}"/>
  <path fill="${c.yellow}" d="${rounded(G.beak, Math.min(r, 1.6), 1)}"/>`;
}

const svg = (body, { vb = "8 6 184 188", bg } = {}) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" fill="none" role="img" aria-label="CDPEMA">${bg ?? ""}${body}\n</svg>\n`;

const ORIGINAL = { green: "#098a3d", blue: "#0289d8", yellow: "#ffd200" };
const MODERN = {
  green: "#0f9d58",
  blue: "#1b8fe6",
  yellow: "#ffc20e",
  blueTail: "#4aa8f0",
};
const NEON = {
  green: "#4ade80",
  blue: "#38bdf8",
  yellow: "#facc15",
  blueTail: "#7dd3fc",
};

const variants = {
  // 1) Fiel: mesma geometria e cores da original, só com cantos arredondados
  "1-fiel": svg(mark({ r: 5, rc: 2.5, colors: ORIGINAL })),
  // 2) Suave: raios maiores e paleta mais viva, cauda mais clara
  "2-suave": svg(mark({ r: 9, rc: 4, colors: MODERN })),
  // 3) Ícone: marca clara sobre quadrado arredondado escuro (favicon, avatar, app)
  "3-icone": svg(
    `<g transform="translate(21 20) scale(.8)">${mark({ r: 8, rc: 3.5, colors: NEON })}</g>`,
    {
      vb: "0 0 200 200",
      bg: '<rect width="200" height="200" rx="46" fill="#0b2217"/>',
    },
  ),
  // 4) Monocromática: uma cor só (carimbo, documentos, impressão)
  "4-mono": svg(
    mark({
      r: 6,
      rc: 3,
      colors: { green: "#0b2217", blue: "#0b2217", yellow: "#0b2217" },
    }),
  ),
};

mkdirSync("public/brand/concepts", { recursive: true });
for (const [name, content] of Object.entries(variants))
  writeFileSync(`public/brand/concepts/${name}.svg`, content);
console.log(
  Object.keys(variants)
    .map((n) => `public/brand/concepts/${n}.svg`)
    .join("\n"),
);
