import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { PostCard } from "@/components/post-card";
import { allPosts } from "@/lib/posts";
import { pageOg } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Publicações",
  description:
    "Artigos da CDPEMA sobre educação ambiental, Agenda 21, Agenda Ambiental e ações para preservar os recursos naturais.",
  alternates: { canonical: "/publicacoes" },
  openGraph: pageOg("/publicacoes"),
};

export default function Publicacoes() {
  return (
    <>
      <PageHero
        title="Publicações"
        lead="Leia e divulgue nossos artigos para que mais pessoas possam contribuir com a preservação do local onde vivem."
        crumbs={[{ label: "Publicações" }]}
        image="/site/wp-content/uploads/2020/09/pexels-singkham-1108572.jpg"
      />
      <section className="section" style={{ paddingTop: 56 }}>
        <div className="container posts">
          {allPosts.map((p, i) => (
            <PostCard key={p.slug} post={p} delay={(i % 3) * 0.08} />
          ))}
        </div>
      </section>
    </>
  );
}
