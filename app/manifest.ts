import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} – ${SITE.fullName}`,
    short_name: SITE.name,
    description:
      "ONG ambientalista em defesa da natureza e da vida desde 1977.",
    lang: "pt-BR",
    start_url: "/",
    display: "standalone",
    background_color: "#fbf9f2",
    theme_color: "#0b2217",
    icons: [
      { src: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/brand/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
