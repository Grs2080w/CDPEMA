import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import type { Post } from "@/lib/posts";

export function PostCard({ post, delay = 0 }: { post: Post; delay?: number }) {
  return (
    <Link
      href={`/${post.slug}`}
      className="post-card"
      data-reveal
      style={{ "--d": `${delay}s` } as React.CSSProperties}
    >
      <div className="post-card__img">
        <Image
          src={post.image}
          alt=""
          fill
          sizes="(max-width: 700px) 100vw, 33vw"
        />
      </div>
      <div className="post-card__body">
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <span className="post-card__more">
          Ler artigo <ArrowRight width={18} height={18} />
        </span>
      </div>
    </Link>
  );
}
