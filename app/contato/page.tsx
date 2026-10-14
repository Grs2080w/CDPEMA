import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { Mail, MapPin, Phone } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { OFFICES, SITE } from "@/lib/config";
import { pageOg } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com a CDPEMA por telefone, e-mail, WhatsApp ou visite nosso escritório em Presidente Prudente.",
  alternates: { canonical: "/contato" },
  openGraph: pageOg("/contato"),
};

export default function Contato() {
  return (
    <>
      <PageHero
        title="Fale conosco"
        lead="Dúvidas, sugestões, denúncias ou vontade de participar? Escreva para a gente."
        crumbs={[{ label: "Contato" }]}
      />
      <section className="section" style={{ paddingTop: 40 }}>
        <div className="container contact-layout">
          <ContactForm />
          <aside className="info-card" data-reveal="right">
            <h2>Escritório regional</h2>
            <div className="info-line">
              <Phone />
              <div>
                <a className="info-big" href={SITE.phones[0].href}>
                  {SITE.phones[0].label}
                </a>
                <p style={{ marginTop: 8 }}>
                  <a href={SITE.phones[1].href}>{SITE.phones[1].label}</a> ·
                  WhatsApp
                </p>
              </div>
            </div>
            <div className="info-line">
              <MapPin />
              <a href={SITE.route} target="_blank" rel="noopener noreferrer">
                {SITE.address[0]}
                <br />
                {SITE.address[1]}
                <br />
                {SITE.address[2]}
              </a>
            </div>
            <div className="info-line">
              <Mail />
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </div>
          </aside>
        </div>
      </section>

      <section className="section section--sand">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="eyebrow">Nossas unidades</span>
            <h2>
              Presentes em <span className="hl">todo o país</span>.
            </h2>
          </div>
          <div className="offices">
            {OFFICES.map((o, i) => (
              <article
                className="office"
                key={o.city}
                data-reveal
                style={{ "--d": `${(i % 4) * 0.07}s` } as React.CSSProperties}
              >
                <h3>{o.city}</h3>
                {"note" in o && <p>{o.note}</p>}
                {"phone" in o && <p>{o.phone}</p>}
                <a href={`mailto:${o.email}`}>{o.email}</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="map" data-reveal="zoom">
            <iframe
              title="Mapa do escritório da CDPEMA em Presidente Prudente"
              src={SITE.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
