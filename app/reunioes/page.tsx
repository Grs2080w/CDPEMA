import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Video } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { SITE } from "@/lib/config";
import { pageOg } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Reuniões",
  description:
    "Encontros online da CDPEMA realizados pelas plataformas Zoom e Google Meet.",
  alternates: { canonical: "/reunioes" },
  openGraph: pageOg("/reunioes"),
};

export default function Reunioes() {
  return (
    <>
      <PageHero
        title="Reuniões"
        lead="Encontros online realizados pelas plataformas Zoom e Google Meet. Participe e colabore com as nossas ações."
        crumbs={[{ label: "Reuniões" }]}
        image="/site/wp-content/uploads/2020/09/reuniao-online.jpg"
      />
      <section className="section">
        <div className="container split">
          <div data-reveal="left">
            <span className="eyebrow">Participe</span>
            <div className="section-head" style={{ margin: "18px 0 0" }}>
              <h2 style={{ marginTop: 0 }}>
                Vamos <span className="hl">conversar</span>?
              </h2>
            </div>
            <div className="prose-lg" style={{ marginTop: 22 }}>
              <p>
                Nossas reuniões são abertas a quem se interessa pela defesa da
                natureza e do meio ambiente. Fale com a equipe para saber a data
                do próximo encontro e receber o link de acesso.
              </p>
            </div>
            <ul className="checklist" style={{ marginTop: 28 }}>
              <li>
                <Video width={20} height={20} />
                <span>Encontros online pelo Zoom e pelo Google Meet</span>
              </li>
              <li>
                <Calendar width={20} height={20} />
                <span>Pergunte a data do próximo encontro pelo WhatsApp</span>
              </li>
            </ul>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <a
                href={SITE.whatsapp}
                className="btn btn--leaf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Perguntar no WhatsApp <ArrowRight width={18} height={18} />
              </a>
              <Link href="/contato" className="btn">
                Enviar mensagem
              </Link>
            </div>
          </div>
          <div className="split__media split__media--frame" data-reveal="right">
            <Image
              src="/site/wp-content/uploads/2020/09/reuniao-online.jpg"
              alt="Reunião online da CDPEMA"
              width={600}
              height={400}
              sizes="(max-width: 860px) 100vw, 45vw"
            />
          </div>
        </div>
      </section>
    </>
  );
}
