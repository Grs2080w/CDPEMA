import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import conheca from "@/lib/data/conheca.json";

export const metadata: Metadata = {
  title: "Conheça a CDPEMA",
  description:
    "Histórico, finalidades, grupos de atuação, cursos, projetos e áreas de abrangência da CDPEMA.",
  alternates: { canonical: "/conheca-a-cdpema" },
  openGraph: { url: "/conheca-a-cdpema" },
};

type Item = (typeof conheca)[number];
type Section = { id: string; title: string; items: Item[] };

const slug = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

// agrupa os blocos extraídos em seções, cada uma iniciada por um título (h2)
const sections: Section[] = [
  { id: "quem-somos", title: "Quem somos", items: [] },
];
for (const item of conheca as Item[]) {
  if (item.type === "h2") {
    // o primeiro "h2" extraído é o próprio "Quem somos"
    if (
      sections.length === 1 &&
      sections[0].items.length === 0 &&
      item.text === "Quem somos"
    )
      continue;
    sections.push({
      id: slug(item.text ?? ""),
      title: item.text ?? "",
      items: [],
    });
  } else sections[sections.length - 1].items.push(item);
}

function Block({ item }: { item: Item }) {
  if (item.type === "html")
    return (
      <div
        className="prose"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: HTML estático e confiável extraído do site original
        dangerouslySetInnerHTML={{ __html: item.html ?? "" }}
      />
    );
  if (item.type === "img")
    return (
      <figure className="doc-figure">
        <Image
          src={item.src ?? ""}
          alt="Proteção do meio ambiente"
          width={534}
          height={501}
        />
      </figure>
    );
  if (item.type === "list") {
    const items = item.items ?? [];
    return items.length > 12 ? (
      <ul className="chips">
        {items.map((t) => (
          <li className="chip" key={t}>
            {t}
          </li>
        ))}
      </ul>
    ) : (
      <ul className="checklist">
        {items.map((t) => (
          <li key={t}>
            <Check width={20} height={20} />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    );
  }
  return null;
}

export default function Conheca() {
  return (
    <>
      <PageHero
        title="Em defesa dos recursos naturais e dos projetos sociais"
        lead="Histórico da CDPEMA: quem somos, onde atuamos e como você pode participar."
        crumbs={[{ label: "Conheça a CDPEMA" }]}
        image="/site/wp-content/uploads/2020/09/equipe-de-amboentalistas.jpg"
        wide
      />
      <section className="section" style={{ paddingTop: 72 }}>
        <div className="container toc-layout">
          <aside className="toc" data-reveal>
            <h4>Nesta página</h4>
            <nav aria-label="Seções">
              {sections.map((s) => (
                <a key={s.id} href={`#${s.id}`}>
                  {s.title}
                </a>
              ))}
              <Link href="/conheca-a-cdpema/calendario-ecologico">
                Calendário Ecológico →
              </Link>
            </nav>
          </aside>
          <div>
            {sections.map((s) => (
              <section className="doc-section" id={s.id} key={s.id} data-reveal>
                <h2>{s.title}</h2>
                {s.items.map((it, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: conteúdo estático e ordenado
                  <Block item={it} key={i} />
                ))}
              </section>
            ))}
            <Link href="/contato" className="btn btn--leaf" data-reveal>
              Quero participar <ArrowRight width={18} height={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
