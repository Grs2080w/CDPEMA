// Geometria da marca CDPEMA (pinheiro + peixe + pássaro), com cantos arredondados.
// A geometria foi medida sobre a logo original, num viewBox de 200 x 200.

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

export const MARK_VIEWBOX = { x: 8, y: 6, w: 184, h: 188 };

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
    const concave = Math.sign(v1[0] * v2[1] - v1[1] * v2[0]) === sign;
    const rr = Math.min(concave ? rConcave : r, l1 / 2.2, l2 / 2.2);
    const a = [p1[0] + (v1[0] / l1) * rr, p1[1] + (v1[1] / l1) * rr];
    const b = [p1[0] + (v2[0] / l2) * rr, p1[1] + (v2[1] / l2) * rr];
    d += `${i ? "L" : "M"}${f(a[0])} ${f(a[1])}Q${f(p1[0])} ${f(p1[1])} ${f(b[0])} ${f(b[1])}`;
  }
  return `${d}Z`;
}

const hole = ({ x, y, r }) =>
  `M${f(x - r)} ${f(y)}a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0 ${-r * 2} 0Z`;

// Corpo da marca (sem <svg>), nas coordenadas de 200 x 200.
export function markBody({ r, rc, colors }) {
  const t = G.trunk;
  const c = colors;
  return [
    `<path fill="${c.green}" d="${rounded(G.tree, r, rc)}"/>`,
    `<rect fill="${c.green}" x="${t.x}" y="${t.y}" width="${t.w}" height="${t.h}" rx="${t.w / 2}"/>`,
    `<path fill="${c.blue}" fill-rule="evenodd" d="${rounded(G.fish, r, rc)}${hole(G.fishEye)}"/>`,
    `<path fill="${c.blueTail ?? c.blue}" d="${rounded(G.tail, r, rc)}"/>`,
    `<path fill="${c.yellow}" fill-rule="evenodd" d="${rounded(G.bird, r, rc)}${hole(G.birdEye)}"/>`,
    `<path fill="${c.yellow}" d="${rounded(G.beak, Math.min(r, 1.6), 1)}"/>`,
  ].join("\n  ");
}

export const COLORS = {
  suave: {
    green: "#0f9d58",
    blue: "#1b8fe6",
    yellow: "#ffc20e",
    blueTail: "#4aa8f0",
  },
  neon: {
    green: "#4ade80",
    blue: "#38bdf8",
    yellow: "#facc15",
    blueTail: "#7dd3fc",
  },
  mono: (c) => ({ green: c, blue: c, yellow: c }),
};
export const INK = "#0b2217"; // verde-floresta escuro (fundo do ícone e texto em fundo claro)

export const RADII = { suave: [9, 4], icone: [8, 3.5], mono: [6, 3] };

const svgOpen = (vb) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" fill="none" role="img" aria-label="CDPEMA">`;

// Marca sozinha, fundo transparente.
export function markSvg(kind, colors) {
  const [r, rc] = RADII[kind];
  const { x, y, w, h } = MARK_VIEWBOX;
  return `${svgOpen(`${x} ${y} ${w} ${h}`)}\n  ${markBody({ r, rc, colors })}\n</svg>\n`;
}

// Ícone: marca clara sobre quadrado escuro. `rx` 0 = sangria total (iOS/Android aplicam a máscara).
export function tileSvg({ scale = 0.8, rx = 46, bg = INK } = {}) {
  const [r, rc] = RADII.icone;
  const tx = f(100 - scale * 99);
  const ty = f(100 - scale * 100);
  return `${svgOpen("0 0 200 200")}\n  <rect width="200" height="200" rx="${rx}" fill="${bg}"/>\n  <g transform="translate(${tx} ${ty}) scale(${scale})">\n  ${markBody({ r, rc, colors: COLORS.neon })}\n  </g>\n</svg>\n`;
}

// Trecho <svg> aninhado, para compor a marca dentro de lockups.
export function nested(svgString, x, y, w, h) {
  return svgString.replace(
    "<svg ",
    `<svg x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" `,
  );
}
