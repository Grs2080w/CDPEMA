import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import type { ReactNode } from "react";
import { Effects } from "@/components/effects";
import { FloatingActions } from "@/components/floating-actions";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SITE } from "@/lib/config";
import { JsonLd, organizationLd, websiteLd } from "@/lib/jsonld";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const text = Inter({
  subsets: ["latin"],
  variable: "--font-text",
  display: "swap",
});

const DESCRIPTION =
  "ONG ambientalista sem fins lucrativos, em atividade desde 1977. Atuamos na defesa dos animais, da fauna e da flora, na recuperação de rios e nascentes e no uso consciente dos recursos naturais.";
const TITLE = `${SITE.name} – ${SITE.fullName}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: TITLE, template: `%s · ${SITE.name}` },
  description: DESCRIPTION,
  applicationName: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "pt_BR",
    url: "/",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  icons: { icon: "/site/wp-content/uploads/2020/09/cropped-favicon-32x32.png" },
};

export const viewport: Viewport = { themeColor: "#0d2418" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${text.variable}`}>
      <body>
        <a className="skip-link" href="#conteudo">
          Ir para o conteúdo
        </a>
        <SiteHeader />
        <main id="conteudo">{children}</main>
        <SiteFooter />
        <FloatingActions />
        <Effects />
        <JsonLd data={[organizationLd, websiteLd]} />
      </body>
    </html>
  );
}
