import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Facebook,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "@/components/icons";
import { NAV, OFFICES, SITE } from "@/lib/config";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__glow" aria-hidden="true" />
      <div className="container">
        <div className="site-footer__cta" data-reveal>
          <h2>
            Preservar é melhor que remediar. <span>Faça parte dessa luta.</span>
          </h2>
          <Link href="/contato" className="btn btn--leaf">
            Fale com a gente <ArrowUpRight width={18} height={18} />
          </Link>
        </div>

        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Link href="/" className="brand brand--light">
              <Image
                src="/site/wp-content/uploads/2020/09/cropped-cdpema-logo-sem-texto.png"
                alt=""
                width={52}
                height={52}
              />
              <span className="brand__text">
                <strong>CDPEMA</strong>
                <small>Desde 1977</small>
              </span>
            </Link>
            <p>{SITE.fullName}.</p>
            <p className="muted">CNPJ {SITE.cnpj}</p>
            <div className="social">
              <a
                href={SITE.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Facebook />
              </a>
              <a
                href={SITE.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <Youtube />
              </a>
            </div>
          </div>

          <div>
            <h3>Navegação</h3>
            <ul>
              <li>
                <Link href="/">Página inicial</Link>
              </li>
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link href={n.href}>{n.label}</Link>
                </li>
              ))}
              <li>
                <Link href="/conheca-a-cdpema/calendario-ecologico">
                  Calendário Ecológico
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3>Contato</h3>
            <ul className="contact-list">
              {SITE.phones.map((p) => (
                <li key={p.href}>
                  <Phone width={16} height={16} />
                  <a href={p.href}>{p.label}</a>
                </li>
              ))}
              <li>
                <Mail width={16} height={16} />
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </li>
              <li>
                <MapPin width={16} height={16} />
                <a href={SITE.route} target="_blank" rel="noopener noreferrer">
                  {SITE.address[0]}
                  <br />
                  {SITE.address[2]}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3>Onde estamos</h3>
            <ul className="cities">
              {OFFICES.map((o) => (
                <li key={o.city}>{o.city}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="site-footer__bottom">
          <span>© CDPEMA — em defesa da vida desde 1977.</span>
          <span>Feito com cuidado pela natureza 🌱</span>
        </div>
      </div>
    </footer>
  );
}
