import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Book,
  Heart,
  Users,
} from "@/components/icons";
import { PostCard } from "@/components/post-card";
import { SITE } from "@/lib/config";
import calendario from "@/lib/data/calendario.json";
import { allPosts } from "@/lib/posts";

const UP = "/site/wp-content/uploads/2020/09";

const PILLARS = [
  {
    t: "Quem somos",
    p: "Uma ONG ambientalista, voltada a questões ambientais, sem fins lucrativos, em atividade desde 1977.",
  },
  {
    t: "O que fazemos",
    p: "Atuamos com a proposta, elaboração e execução de projetos visando à contínua preservação do ambiente em que vivemos.",
  },
  {
    t: "O que defendemos",
    p: "A preservação dos rios, das reservas naturais, o direito dos animais e ações que promovam um estilo de vida mais sustentável.",
  },
  {
    t: "Como fazemos",
    p: "Cursos de capacitação, campanhas de conscientização e outras atividades para incluir a comunidade local nessa luta.",
  },
];

const CAUSES = [
  {
    icon: "animais",
    t: "Defesa dos animais de estimação",
    p: "Atuamos na defesa dos direitos e na luta contra os maus-tratos a animais. Apoie nossa luta na construção do Abrigo de Animais na região de Presidente Prudente.",
    tint: "rgb(255 200 61 / 0.3)",
  },
  {
    icon: "fauna-flora",
    t: "Preservação da fauna e da flora",
    p: "Nossa fauna é o nosso maior patrimônio. Por isso apoiamos a preservação de espécies e o plantio de mudas.",
    tint: "rgb(108 191 42 / 0.3)",
  },
  {
    icon: "rios",
    t: "Recuperação de rios e nascentes",
    p: "Nossos rios pedem socorro! Sem água não vivemos. Por isso atuamos na despoluição, recuperação e preservação de nossas águas.",
    tint: "rgb(31 155 209 / 0.28)",
  },
  {
    icon: "recursos",
    t: "Melhor aproveitamento dos recursos naturais",
    p: "Temos que defender a Natureza, preservando os biomas, os animais, os rios e mananciais e fazer uso mais consciente dos recursos naturais.",
    tint: "rgb(47 122 62 / 0.28)",
  },
];

const HEADLINE: { w: string; em?: boolean }[] = [
  { w: "A" },
  { w: "defesa" },
  { w: "da" },
  { w: "natureza", em: true },
  { w: "está" },
  { w: "em" },
  { w: "nossas" },
  { w: "mãos.", em: true },
];

// datas de destaque para a faixa animada (vêm do Calendário Ecológico)
const HIGHLIGHTS = calendario
  .flatMap((m) => m.days.map((d) => ({ m: m.month, ...d })))
  .filter((d) =>
    [
      "Dia Mundial do Meio Ambiente",
      "Dia da Árvore",
      "Dia Mundial da Água",
      "Dia da Terra",
      "Dia Mundial dos Animais",
      "Dia Mundial das Zonas Úmidas",
      "Dia da Amazônia",
      "Dia do Rio",
      "Dia Internacional da Biodiversidade",
      "Dia Mundial da Saúde",
    ].some((k) => d.label.startsWith(k)),
  );

export default function Home() {
  const loop = [...HIGHLIGHTS, ...HIGHLIGHTS];
  return (
    <>
      <section className="hero" data-parallax>
        <video
          className="hero__video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={`${UP}/protecao-do-meio-ambiente.png`}
        >
          <source src={`${UP}/video.mp4`} type="video/mp4" />
        </video>
        <div className="hero__blob hero__blob--a" aria-hidden="true" />
        <div className="hero__blob hero__blob--b" aria-hidden="true" />

        <div className="container">
          <div className="hero__content">
            <span className="eyebrow eyebrow--dark">
              ONG ambientalista · desde 1977
            </span>
            <h1 aria-label="A defesa da natureza está em nossas mãos. Não seja omisso, participe!">
              <span aria-hidden="true">
                {HEADLINE.map((h, i) => (
                  <span key={h.w}>
                    <span
                      className="word"
                      style={{ "--i": i } as React.CSSProperties}
                    >
                      <span>{h.em ? <em>{h.w}</em> : h.w}</span>
                    </span>{" "}
                  </span>
                ))}
                <br />
                {["Não", "seja", "omisso,", "participe!"].map((w, i) => (
                  <span key={w}>
                    <span
                      className="word"
                      style={
                        { "--i": i + HEADLINE.length } as React.CSSProperties
                      }
                    >
                      <span>{w}</span>
                    </span>{" "}
                  </span>
                ))}
              </span>
            </h1>
            <p className="hero__sub">
              Venha participar da nossa equipe. Seja um profissional ou
              voluntário em defesa da vida.
            </p>
            <div className="hero__actions">
              <Link href="/contato" className="btn btn--leaf">
                Quero participar <ArrowRight width={18} height={18} />
              </Link>
              <Link href="/conheca-a-cdpema" className="btn btn--ghost">
                Conheça a CDPEMA
              </Link>
            </div>
          </div>
        </div>

        <div className="container hero__pillars">
          {PILLARS.map((p) => (
            <article className="pillar" key={p.t}>
              <h3>{p.t}</h3>
              <p>{p.p}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="stats" aria-label="A CDPEMA em números">
        <div className="container stats__grid">
          <div className="stat" data-reveal>
            <strong
              data-years-since={SITE.founded}
              data-count="49"
              data-suffix=""
            >
              49
            </strong>
            <span>anos em defesa da natureza</span>
          </div>
          <div
            className="stat"
            data-reveal
            style={{ "--d": "0.1s" } as React.CSSProperties}
          >
            <strong data-count="7">7</strong>
            <span>cidades com unidades e representantes</span>
          </div>
          <div
            className="stat"
            data-reveal
            style={{ "--d": "0.2s" } as React.CSSProperties}
          >
            <strong data-count="60" data-suffix="+">
              60+
            </strong>
            <span>projetos programados</span>
          </div>
          <div
            className="stat"
            data-reveal
            style={{ "--d": "0.3s" } as React.CSSProperties}
          >
            <strong data-count="20" data-suffix="+">
              20+
            </strong>
            <span>cursos de capacitação e qualificação</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="eyebrow">Causas de destaque</span>
            <h2>
              Defender o ambiente é uma ação{" "}
              <span className="hl">contínua</span>.
            </h2>
            <p>
              Conscientização, engajamento e atuação em diversas frentes. O que
              você tem feito na sua cidade além de reclamar? Mobilize-se e
              participe! Nós da CDPEMA temos como principais bandeiras:
            </p>
          </div>
          <div className="causes">
            {CAUSES.map((c, i) => (
              <article
                className="cause"
                key={c.t}
                data-reveal
                style={
                  {
                    "--d": `${i * 0.1}s`,
                    "--tint": c.tint,
                  } as React.CSSProperties
                }
              >
                <span className="cause__num">0{i + 1}</span>
                <Image
                  className="cause__icon"
                  src={`/img/causa-${c.icon}.svg`}
                  alt=""
                  width={96}
                  height={96}
                />
                <h3>{c.t}</h3>
                <p>{c.p}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="marquee-wrap">
        <div className="marquee">
          <div className="marquee__track">
            {loop.map((d, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: lista duplicada para o loop da faixa
              <span key={i} aria-hidden={i >= HIGHLIGHTS.length}>
                {d.day}/
                {String(
                  calendario.findIndex((m) => m.month === d.m) + 1,
                ).padStart(2, "0")}{" "}
                · {d.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container split">
          <div data-reveal="left">
            <span className="eyebrow">Como começamos</span>
            <div className="section-head" style={{ margin: "18px 0 0" }}>
              <h2 style={{ marginTop: 0 }}>
                Uma história de <span className="hl">defesa da vida</span>.
              </h2>
            </div>
            <div className="prose-lg" style={{ marginTop: 24 }}>
              <p>
                Em 7 de setembro de 1977, a CDPEMA foi criada em Guarulhos/SP e,
                desde 1993, está presente em Presidente Prudente e região,
                atuando na defesa e preservação da vida e de todas as espécies —
                não apenas a humana, mas toda a fauna e flora.
              </p>
              <p>
                Desenvolvemos atividades e projetos de conscientização, com
                ações e parcerias ambientais, educacionais e profissionalizantes
                em diversas cidades de São Paulo e de outros estados.
              </p>
            </div>
            <ul className="timeline">
              <li>
                <strong>1977</strong>
                <span>
                  Fundação em Guarulhos/SP, por Carlos Alberto Arraes do Carmo.
                </span>
              </li>
              <li>
                <strong>1993</strong>
                <span>
                  Chegada a Presidente Prudente, onde funciona o escritório
                  regional.
                </span>
              </li>
              <li>
                <strong>Hoje</strong>
                <span>
                  Representantes em várias cidades e parcerias em todo o país.
                </span>
              </li>
            </ul>
          </div>
          <div className="split__media" data-reveal="right">
            <Image
              className="float-y"
              src={`${UP}/ilustracao-preservacao-ambiental.png`}
              alt="Mãos que seguram o planeta Terra com folhas brotando"
              width={822}
              height={800}
              sizes="(max-width: 860px) 100vw, 45vw"
            />
          </div>
        </div>
      </section>

      <section className="section section--sand">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="eyebrow">Publicações</span>
            <h2>
              Bora pensar <span className="hl">verde</span> e preservar a
              Natureza?
            </h2>
            <p>
              Você pode começar com ações simples, como não demorar no chuveiro
              ou deixar a torneira fechada enquanto lava a louça. Confira essas
              e outras ações cotidianas que ajudam a preservar os recursos
              naturais e ainda economizam dinheiro. #PenseVerde
              #PreserveoMeioAmbiente
            </p>
          </div>
          <div className="posts">
            {allPosts.map((p, i) => (
              <PostCard key={p.slug} post={p} delay={i * 0.08} />
            ))}
          </div>
          <div style={{ marginTop: 40 }} data-reveal>
            <Link href="/publicacoes" className="btn">
              Ver todas as publicações <ArrowRight width={18} height={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="banner" data-reveal="zoom">
            <div>
              <span className="eyebrow eyebrow--dark">Reuniões online</span>
              <h2 style={{ marginTop: 18 }}>Vamos conversar?</h2>
              <p>
                Participe das nossas reuniões online, pelo Zoom e pelo Google
                Meet, e colabore com as nossas ações.
              </p>
              <Link href="/reunioes" className="btn btn--light">
                Saiba mais <ArrowRight width={18} height={18} />
              </Link>
            </div>
            <Image
              src={`${UP}/reuniao-online.jpg`}
              alt="Reunião online da CDPEMA"
              width={600}
              height={400}
              sizes="(max-width: 860px) 100vw, 40vw"
            />
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="eyebrow eyebrow--dark">Entre nessa luta</span>
            <h2>
              Apoie o nosso trabalho: preservar é{" "}
              <span className="hl">melhor que remediar</span>.
            </h2>
            <p>
              Tudo que fazemos hoje será o que será colhido no futuro. Se você
              ama a Natureza e quer contribuir, junte-se à nossa equipe.
            </p>
          </div>
          <div className="support">
            <article className="support__card" data-reveal>
              <div className="support__icon">
                <Heart />
              </div>
              <h3>Doações</h3>
              <p>Você pode contribuir com doações de qualquer valor.</p>
              <div className="support__data">
                <b>{SITE.donation.bank}</b>
                <br />
                Agência: {SITE.donation.agency}
                <br />
                Conta: {SITE.donation.account}
              </div>
            </article>
            <article
              className="support__card"
              data-reveal
              style={{ "--d": "0.1s" } as React.CSSProperties}
            >
              <div className="support__icon">
                <Users />
              </div>
              <h3>Faça parte</h3>
              <p>
                Filie-se à CDPEMA e contribua para um lugar melhor para as
                gerações futuras.
              </p>
              <Link href="/contato" className="support__link">
                Quero me filiar <ArrowUpRight width={18} height={18} />
              </Link>
            </article>
            <article
              className="support__card"
              data-reveal
              style={{ "--d": "0.2s" } as React.CSSProperties}
            >
              <div className="support__icon">
                <Book />
              </div>
              <h3>Informe-se</h3>
              <p>
                Leia e divulgue nossos artigos nas redes sociais para que outras
                pessoas possam contribuir com a preservação do local onde vivem.
              </p>
              <Link href="/publicacoes" className="support__link">
                Ler artigos <ArrowUpRight width={18} height={18} />
              </Link>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
