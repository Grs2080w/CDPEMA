import { SITE } from "@/lib/config";

// Serializa o JSON-LD escapando "<" para não fechar a tag <script> por engano.
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON estático gerado por nós
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  "@id": `${SITE.url}/#organization`,
  name: SITE.name,
  legalName: SITE.fullName,
  alternateName: SITE.fullName,
  url: SITE.url,
  logo: `${SITE.url}/site/wp-content/uploads/2020/09/cropped-cdpema-logo-sem-texto.png`,
  foundingDate: "1977-09-07",
  taxID: SITE.cnpj,
  email: SITE.email,
  telephone: ["+55 18 3906-3131", "+55 18 99731-4379"],
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Rua Josino Felício dos Santos, 94 – Parque Residencial Mediterrâneo",
    addressLocality: "Presidente Prudente",
    addressRegion: "SP",
    postalCode: "19065-200",
    addressCountry: "BR",
  },
  sameAs: [SITE.facebook, SITE.youtube],
};

export const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE.url}/#website`,
  url: SITE.url,
  name: SITE.name,
  alternateName: SITE.fullName,
  inLanguage: "pt-BR",
  publisher: { "@id": `${SITE.url}/#organization` },
};
