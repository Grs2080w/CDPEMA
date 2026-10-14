import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { SITE } from "@/lib/config";
import { JsonLd } from "@/lib/jsonld";
import { allPosts, getPost } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return allPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  return post
    ? {
        title: post.title,
        description: post.excerpt,
        alternates: { canonical: `/${post.slug}` },
        openGraph: {
          type: "article",
          url: `/${post.slug}`,
          title: post.title,
          description: post.excerpt,
          images: [post.image],
        },
      }
    : {};
}

export default async function Artigo({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const i = allPosts.findIndex((p) => p.slug === slug);
  const prev = allPosts[(i - 1 + allPosts.length) % allPosts.length];
  const next = allPosts[(i + 1) % allPosts.length];
  const url = encodeURIComponent(`${SITE.url}/${post.slug}`);
  const text = encodeURIComponent(post.title);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          image: `${SITE.url}${post.image}`,
          inLanguage: "pt-BR",
          mainEntityOfPage: `${SITE.url}/${post.slug}`,
          author: { "@id": `${SITE.url}/#organization` },
          publisher: { "@id": `${SITE.url}/#organization` },
        }}
      />
      <div className="read-progress" aria-hidden="true" />
      <PageHero
        title={post.title}
        lead={post.excerpt}
        crumbs={[
          { label: "Publicações", href: "/publicacoes" },
          { label: post.title },
        ]}
        wide
      />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="article-cover" data-reveal="zoom">
            <Image
              src={post.image}
              alt=""
              width={1200}
              height={620}
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>
          <div className="article-layout">
            <article>
              <div
                className="prose prose--drop"
                // biome-ignore lint/security/noDangerouslySetInnerHtml: HTML estático e confiável extraído do site original
                dangerouslySetInnerHTML={{ __html: post.html }}
              />
              <nav className="next-posts" aria-label="Outras publicações">
                <Link href={`/${prev.slug}`}>
                  <small>← Anterior</small>
                  <strong>{prev.title}</strong>
                </Link>
                <Link href={`/${next.slug}`}>
                  <small>Próxima →</small>
                  <strong>{next.title}</strong>
                </Link>
              </nav>
            </article>
            <aside className="aside">
              <div className="aside__card">
                <h4>Compartilhe nas redes sociais</h4>
                <div className="share">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Facebook
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${url}&text=${text}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    X
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={`https://wa.me/?text=${text}%20${url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </a>
                  <a
                    href={`https://t.me/share/url?url=${url}&text=${text}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Telegram
                  </a>
                  <a href={`mailto:?subject=${text}&body=${url}`}>E-mail</a>
                </div>
              </div>
              <div className="aside__card">
                <h4>Faça parte da CDPEMA</h4>
                <p
                  style={{
                    fontSize: "0.95rem",
                    color: "var(--ink-600)",
                    marginBottom: 16,
                  }}
                >
                  Seja voluntário ou profissional em defesa da vida.
                </p>
                <Link href="/contato" className="btn btn--leaf btn--sm">
                  Falar com a equipe <ArrowRight width={16} height={16} />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
