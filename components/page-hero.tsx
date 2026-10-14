import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type Crumb = { label: string; href?: string };

export function PageHero({
  title,
  lead,
  crumbs,
  image,
  wide,
  children,
}: {
  title: string;
  lead?: string;
  crumbs: Crumb[];
  image?: string;
  wide?: boolean;
  children?: ReactNode;
}) {
  return (
    <section className={`page-hero${wide ? " page-hero--wide" : ""}`}>
      {image && (
        <Image
          className="page-hero__img"
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
        />
      )}
      <svg
        className="page-hero__leaf"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M11 20A7 7 0 0 1 4 13c0-6 6-9 16-9 0 10-3 16-9 16Z" />
      </svg>
      <div className="container">
        <nav className="crumbs" aria-label="Você está em">
          <Link href="/">Início</Link>
          {crumbs.map((c) => (
            <span key={c.label}>
              <span aria-hidden="true">/ </span>
              {c.href ? <Link href={c.href}>{c.label}</Link> : c.label}
            </span>
          ))}
        </nav>
        <h1>{title}</h1>
        {lead && <p>{lead}</p>}
        {children}
      </div>
    </section>
  );
}
