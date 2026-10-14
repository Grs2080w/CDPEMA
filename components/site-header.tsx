"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Chevron, Close, Menu } from "@/components/icons";
import { NAV } from "@/lib/config";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [sub, setSub] = useState(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: fecha o menu ao navegar
  useEffect(() => {
    setOpen(false);
    setSub(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const active = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className={`site-header${open ? " is-open" : ""}`}>
      <div className="site-header__bar">
        <Link href="/" className="brand" aria-label="CDPEMA — página inicial">
          <Image
            src="/brand/cdpema-marca.svg"
            alt=""
            width={44}
            height={44}
            priority
          />
          <span className="brand__text">
            <strong>CDPEMA</strong>
            <small>Defesa e preservação da espécie e do meio ambiente</small>
          </span>
        </Link>

        <nav className="nav" aria-label="Principal">
          {NAV.map((item) =>
            "children" in item ? (
              <div className="nav__group" key={item.href}>
                <Link
                  href={item.href}
                  className={`nav__link${active(item.href) ? " is-active" : ""}`}
                >
                  {item.label}
                  <Chevron width={14} height={14} />
                </Link>
                <div className="nav__menu">
                  {item.children.map((c) =>
                    "external" in c ? (
                      <a
                        key={c.href}
                        href={c.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {c.label}
                      </a>
                    ) : (
                      <Link key={c.href} href={c.href}>
                        {c.label}
                      </Link>
                    ),
                  )}
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`nav__link${active(item.href) ? " is-active" : ""}`}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <Link
          href="/contato"
          className="btn btn--leaf btn--sm site-header__cta"
        >
          Participe <ArrowRight width={16} height={16} />
        </Link>

        <button
          type="button"
          className="burger"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <Close /> : <Menu />}
        </button>
      </div>

      <div className="drawer" aria-hidden={!open}>
        <nav aria-label="Menu móvel">
          {NAV.map((item, i) =>
            "children" in item ? (
              <div key={item.href} style={{ "--i": i } as React.CSSProperties}>
                <button
                  type="button"
                  className="drawer__link"
                  aria-expanded={sub}
                  onClick={() => setSub((v) => !v)}
                >
                  {item.label}
                  <Chevron className={sub ? "is-flipped" : ""} />
                </button>
                <div className={`drawer__sub${sub ? " is-open" : ""}`}>
                  {item.children.map((c) =>
                    "external" in c ? (
                      <a
                        key={c.href}
                        href={c.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        tabIndex={open && sub ? 0 : -1}
                      >
                        {c.label}
                      </a>
                    ) : (
                      <Link
                        key={c.href}
                        href={c.href}
                        tabIndex={open && sub ? 0 : -1}
                      >
                        {c.label}
                      </Link>
                    ),
                  )}
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="drawer__link"
                style={{ "--i": i } as React.CSSProperties}
                tabIndex={open ? 0 : -1}
              >
                {item.label}
              </Link>
            ),
          )}
          <Link
            href="/contato"
            className="btn btn--leaf drawer__cta"
            tabIndex={open ? 0 : -1}
          >
            Quero participar <ArrowRight width={18} height={18} />
          </Link>
        </nav>
      </div>
    </header>
  );
}
