// Gera o kit de marca da CDPEMA (SVG + PNG) em /brand e copia para o site os arquivos usados.
// Uso: node scripts/brand/build.mjs   (precisa de internet na 1ª vez, para baixar as fontes)
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import opentype from "opentype.js";
import sharp from "sharp";
import { COLORS, INK, MARK_VIEWBOX, markSvg, nested, tileSvg } from "./lib.mjs";

const OUT = "brand";
const FONT_CACHE = "node_modules/.cache/brand-fonts";
const fmt = (n) => +n.toFixed(2);

// ---------- fontes (nome vira curvas, então o SVG não depende de fonte instalada) ----------
async function loadFont(family, weight) {
  const file = join(FONT_CACHE, `${family.replaceAll(" ", "")}-${weight}.ttf`);
  if (!existsSync(file)) {
    const css = await (
      await fetch(
        `https://fonts.googleapis.com/css2?family=${family.replaceAll(" ", "+")}:wght@${weight}`,
        { headers: { "User-Agent": "Mozilla/4.0" } },
      )
    ).text();
    const url = css.match(/url\((https:[^)]+\.ttf)\)/)?.[1];
    if (!url) throw new Error(`fonte não encontrada: ${family} ${weight}`);
    mkdirSync(FONT_CACHE, { recursive: true });
    writeFileSync(file, Buffer.from(await (await fetch(url)).arrayBuffer()));
  }
  const buf = readFileSync(file);
  return opentype.parse(
    buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength),
  );
}

const title = await loadFont("Bricolage Grotesque", 800);
const sans = await loadFont("Inter", 500);

// toPathData() do opentype.js devolve "NaN" em algumas coordenadas; converto os comandos manualmente.
function pathData(path) {
  const n = (v) => fmt(v);
  return path.commands
    .map((c) => {
      if (c.type === "M" || c.type === "L")
        return `${c.type}${n(c.x)} ${n(c.y)}`;
      if (c.type === "Q") return `Q${n(c.x1)} ${n(c.y1)} ${n(c.x)} ${n(c.y)}`;
      if (c.type === "C")
        return `C${n(c.x1)} ${n(c.y1)} ${n(c.x2)} ${n(c.y2)} ${n(c.x)} ${n(c.y)}`;
      return "Z";
    })
    .join("");
}

// Posiciona os glifos um a um (o motor de layout do opentype.js não lê as tabelas GSUB dessas fontes).
const widthOf = (font, text, size) =>
  [...text].reduce(
    (w, ch) => w + (font.charToGlyph(ch).advanceWidth * size) / font.unitsPerEm,
    0,
  );
function textPath(font, text, x, y, size, fill, extra = "") {
  let cx = x;
  let d = "";
  for (const ch of text) {
    const g = font.charToGlyph(ch);
    d += pathData(g.getPath(cx, y, size));
    cx += (g.advanceWidth * size) / font.unitsPerEm;
  }
  return `<path fill="${fill}"${extra} d="${d}"/>`;
}

const capHeight = (font, size) =>
  ((font.tables.os2?.sCapHeight ?? font.unitsPerEm * 0.7) / font.unitsPerEm) *
  size;

const TAGLINE = ["Defesa e preservação da espécie", "e do meio ambiente"];

// ---------- lockups (marca + nome + descritor) ----------
function lockup({ mark, aspect, layout, ink, tagOpacity = 0.72 }) {
  const pad = 8;
  if (layout === "h") {
    const markH = 120;
    const markW = markH * aspect;
    const gap = markH * 0.2;
    const tSize = 74;
    const gSize = 15.5;
    const lh = 20;
    const capH = capHeight(title, tSize);
    const blockH = capH + 20 + (TAGLINE.length - 1) * lh + gSize * 0.72;
    const top = pad + (markH - blockH) / 2;
    const x0 = pad + markW + gap;
    const tw = widthOf(title, "CDPEMA", tSize);
    const gw = Math.max(...TAGLINE.map((l) => widthOf(sans, l, gSize)));
    const W = x0 + Math.max(tw, gw) + pad;
    const H = markH + pad * 2;
    const body = [
      nested(mark, pad, pad, markW, markH),
      textPath(title, "CDPEMA", x0 - 3, top + capH, tSize, ink),
      ...TAGLINE.map((l, i) =>
        textPath(
          sans,
          l,
          x0,
          top + capH + 20 + gSize * 0.72 + i * lh,
          gSize,
          ink,
          ` fill-opacity="${tagOpacity}"`,
        ),
      ),
    ].join("\n  ");
    return wrap(W, H, body);
  }
  const markH = 150;
  const markW = markH * aspect;
  const tSize = 64;
  const gSize = 14.5;
  const lh = 19;
  const capH = capHeight(title, tSize);
  const tw = widthOf(title, "CDPEMA", tSize);
  const gw = Math.max(...TAGLINE.map((l) => widthOf(sans, l, gSize)));
  const W = Math.max(tw, gw, markW) + pad * 2;
  const cx = W / 2;
  const yTitle = pad + markH + 18 + capH;
  const body = [
    nested(mark, cx - markW / 2, pad, markW, markH),
    textPath(title, "CDPEMA", cx - tw / 2, yTitle, tSize, ink),
    ...TAGLINE.map((l, i) =>
      textPath(
        sans,
        l,
        cx - widthOf(sans, l, gSize) / 2,
        yTitle + 18 + gSize * 0.72 + i * lh,
        gSize,
        ink,
        ` fill-opacity="${tagOpacity}"`,
      ),
    ),
  ].join("\n  ");
  return wrap(
    W,
    yTitle + 18 + gSize * 0.72 + (TAGLINE.length - 1) * lh + pad + 4,
    body,
  );
}

const wrap = (w, h, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${fmt(w)} ${fmt(h)}" fill="none" role="img" aria-label="CDPEMA — Comissão de Defesa e Preservação da Espécie e do Meio Ambiente">\n  ${body}\n</svg>\n`;

// ---------- escrita ----------
const written = [];
function put(rel, data) {
  const file = join(OUT, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, data);
  written.push(rel);
}

async function png(svg, rel, width, { bg } = {}) {
  let img = sharp(Buffer.from(svg), { density: 384 }).resize({ width });
  if (bg) img = img.flatten({ background: bg });
  put(rel, await img.png({ compressionLevel: 9 }).toBuffer());
}

// grava o SVG e os PNGs de uma representação
async function emit(dir, name, svg, widths) {
  put(`${dir}/${name}.svg`, svg);
  for (const w of widths) await png(svg, `${dir}/png/${name}-${w}.png`, w);
}

const SQ = [16, 32, 64, 128, 256, 512, 1024];
const WIDE = [480, 960, 1920];

const aspectMark = MARK_VIEWBOX.w / MARK_VIEWBOX.h;

// ---------- 2 · Suave (colorida) ----------
const suave = markSvg("suave", COLORS.suave);
await emit("2-suave", "marca", suave, SQ);
for (const [layout, label] of [
  ["h", "horizontal"],
  ["v", "vertical"],
]) {
  await emit(
    "2-suave",
    label,
    lockup({ mark: suave, aspect: aspectMark, layout, ink: INK }),
    WIDE,
  );
  await emit(
    "2-suave",
    `${label}-fundo-escuro`,
    lockup({ mark: suave, aspect: aspectMark, layout, ink: "#ffffff" }),
    WIDE,
  );
}

// ---------- 3 · Ícone (quadrado arredondado) ----------
const icone = tileSvg({ scale: 0.8, rx: 46 });
await emit("3-icone", "icone", icone, SQ);
await emit("3-icone", "icone-quadrado", tileSvg({ scale: 0.8, rx: 0 }), SQ);
await emit(
  "3-icone",
  "icone-maskable",
  tileSvg({ scale: 0.62, rx: 0 }),
  [192, 512],
);
for (const [layout, label] of [
  ["h", "horizontal"],
  ["v", "vertical"],
]) {
  await emit(
    "3-icone",
    label,
    lockup({ mark: icone, aspect: 1, layout, ink: INK }),
    WIDE,
  );
  await emit(
    "3-icone",
    `${label}-fundo-escuro`,
    lockup({ mark: icone, aspect: 1, layout, ink: "#ffffff" }),
    WIDE,
  );
}

// ---------- 4 · Mono (uma cor) ----------
const monos = { escuro: INK, branco: "#ffffff", verde: "#0f9d58" };
for (const [label, color] of Object.entries(monos)) {
  const m = markSvg("mono", COLORS.mono(color));
  await emit("4-mono", `marca-${label}`, m, SQ);
  if (label !== "verde")
    for (const [layout, name] of [
      ["h", "horizontal"],
      ["v", "vertical"],
    ])
      await emit(
        "4-mono",
        `${name}-${label}`,
        lockup({
          mark: m,
          aspect: aspectMark,
          layout,
          ink: color,
          tagOpacity: 0.8,
        }),
        WIDE,
      );
}

// ---------- favicon e ícones de app (a partir do ícone 3) ----------
const fav = tileSvg({ scale: 0.92, rx: 40 }); // mais cheio, para ler em 16px
put("favicon/favicon.svg", fav);
const favPng = {};
for (const s of [16, 32, 48]) {
  await png(fav, `favicon/favicon-${s}.png`, s);
  favPng[s] = readFileSync(join(OUT, `favicon/favicon-${s}.png`));
}
// .ico com 3 imagens PNG embutidas
{
  const sizes = [16, 32, 48];
  const head = Buffer.alloc(6 + sizes.length * 16);
  head.writeUInt16LE(1, 2);
  head.writeUInt16LE(sizes.length, 4);
  let offset = head.length;
  sizes.forEach((s, i) => {
    const o = 6 + i * 16;
    head.writeUInt8(s, o);
    head.writeUInt8(s, o + 1);
    head.writeUInt16LE(1, o + 4);
    head.writeUInt16LE(32, o + 6);
    head.writeUInt32LE(favPng[s].length, o + 8);
    head.writeUInt32LE(offset, o + 12);
    offset += favPng[s].length;
  });
  put(
    "favicon/favicon.ico",
    Buffer.concat([head, ...sizes.map((s) => favPng[s])]),
  );
}
await png(tileSvg({ scale: 0.8, rx: 0 }), "favicon/apple-touch-icon.png", 180);
await png(
  tileSvg({ scale: 0.8, rx: 46 }),
  "favicon/android-chrome-192.png",
  192,
);
await png(
  tileSvg({ scale: 0.8, rx: 46 }),
  "favicon/android-chrome-512.png",
  512,
);
await png(tileSvg({ scale: 0.62, rx: 0 }), "favicon/maskable-512.png", 512);

// ---------- redes sociais ----------
{
  await png(tileSvg({ scale: 0.8, rx: 0 }), "social/avatar-512.png", 512);

  const tSize = 150;
  const sSize = 35;
  const og = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" fill="none">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#06140d"/><stop offset=".55" stop-color="#12362a"/><stop offset="1" stop-color="#2f7a3e"/></linearGradient>
    <radialGradient id="glow" cx=".82" cy=".1" r=".6"><stop offset="0" stop-color="#6cbf2a" stop-opacity=".45"/><stop offset="1" stop-color="#6cbf2a" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/><rect width="1200" height="630" fill="url(#glow)"/>
  ${nested(suave, 80, 126, 345, 353)}
  ${textPath(title, "CDPEMA", 470, 318, tSize, "#c8f27a")}
  ${textPath(sans, "Comissão de Defesa e Preservação", 474, 384, sSize, "#ffffff")}
  ${textPath(sans, "da Espécie e do Meio Ambiente", 474, 430, sSize, "#ffffff")}
  ${textPath(sans, "ONG ambientalista · em defesa da vida desde 1977", 474, 500, 26, "#ffffff", ' fill-opacity=".65"')}
</svg>
`;
  put("social/og-1200x630.svg", og);
  await png(og, "social/og-1200x630.png", 1200);

  const lk = lockup({
    mark: suave,
    aspect: aspectMark,
    layout: "h",
    ink: "#ffffff",
  });
  const [, lw, lh] = lk.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/).map(Number);
  const capaH = 300;
  const capaW = (lw * capaH) / lh;
  const capa = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1500 500" fill="none">
  <defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#06140d"/><stop offset=".6" stop-color="#12362a"/><stop offset="1" stop-color="#1f6b3a"/></linearGradient></defs>
  <rect width="1500" height="500" fill="url(#bg)"/>
  ${nested(lk, (1500 - capaW) / 2, (500 - capaH) / 2, capaW, capaH)}
</svg>
`;
  put("social/capa-1500x500.svg", capa);
  await png(capa, "social/capa-1500x500.png", 1500);
}

// ---------- arquivos usados pelo site ----------
const copy = (from, to) => {
  mkdirSync(dirname(to), { recursive: true });
  copyFileSync(from, to);
};
const brand = (p) => join(OUT, p);
copy(brand("2-suave/marca.svg"), "public/brand/cdpema-marca.svg");
copy(brand("2-suave/png/marca-512.png"), "public/brand/cdpema-marca-512.png");
copy(brand("3-icone/icone.svg"), "public/brand/cdpema-icone.svg");
copy(brand("4-mono/marca-branco.svg"), "public/brand/cdpema-marca-branco.svg");
copy(brand("favicon/android-chrome-192.png"), "public/brand/icon-192.png");
copy(brand("favicon/android-chrome-512.png"), "public/brand/icon-512.png");
copy(brand("favicon/maskable-512.png"), "public/brand/icon-maskable-512.png");
copy(brand("favicon/favicon.svg"), "app/icon.svg");
copy(brand("favicon/favicon.ico"), "app/favicon.ico");
copy(brand("favicon/apple-touch-icon.png"), "app/apple-icon.png");
copy(brand("social/og-1200x630.png"), "app/opengraph-image.png");

console.log(`${written.length} arquivos em ${OUT}/`);
