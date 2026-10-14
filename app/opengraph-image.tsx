import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt =
  "CDPEMA — Comissão de Defesa e Preservação da Espécie e do Meio Ambiente";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(
    join(
      process.cwd(),
      "public/site/wp-content/uploads/2020/09/cropped-cdpema-logo-sem-texto.png",
    ),
  );
  const src = `data:image/png;base64,${logo.toString("base64")}`;
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        color: "white",
        background:
          "linear-gradient(135deg, #06140d 0%, #12362a 55%, #2f7a3e 100%)",
      }}
    >
      {/* biome-ignore lint/performance/noImgElement: ImageResponse não suporta next/image */}
      <img src={src} width={120} height={120} alt="" />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: 112,
            fontWeight: 800,
            letterSpacing: -3,
            color: "#c8f27a",
          }}
        >
          CDPEMA
        </div>
        <div
          style={{ fontSize: 40, marginTop: 8, maxWidth: 900, lineHeight: 1.2 }}
        >
          Comissão de Defesa e Preservação da Espécie e do Meio Ambiente
        </div>
        <div style={{ fontSize: 28, marginTop: 24, opacity: 0.75 }}>
          ONG ambientalista · em defesa da vida desde 1977
        </div>
      </div>
    </div>,
    size,
  );
}
