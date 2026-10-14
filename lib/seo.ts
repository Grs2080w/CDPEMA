import type { Metadata } from "next";
import { SITE } from "@/lib/config";

// Imagem de compartilhamento (WhatsApp, Facebook, LinkedIn, X...): 1200x630, ~150 KB.
// O WhatsApp guarda a prévia por URL; ao trocar a imagem, mude o `?v=` para forçar a atualização.
export const OG_IMAGE = {
  url: "/opengraph-image.png?v=1",
  width: 1200,
  height: 630,
  alt: `${SITE.name} — ${SITE.fullName}`,
  type: "image/png",
};

// `openGraph` de uma página. Cada página que define o seu próprio `openGraph` substitui o do layout
// por inteiro, então a imagem precisa ser repetida aqui.
export const pageOg = (path: string): NonNullable<Metadata["openGraph"]> => ({
  type: "website",
  siteName: SITE.name,
  locale: "pt_BR",
  url: path,
  images: [OG_IMAGE],
});
