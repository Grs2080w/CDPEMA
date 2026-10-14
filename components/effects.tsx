"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const reduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function animateCount(el: HTMLElement) {
  const target = Number(el.dataset.count);
  const suffix = el.dataset.suffix ?? "";
  if (reduced()) return;
  const start = performance.now();
  const dur = 1600;
  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / dur);
    const eased = 1 - (1 - t) ** 4;
    el.textContent = `${Math.round(target * eased)}${suffix}`;
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

// Revelação ao rolar, contadores, cabeçalho com rolagem, parallax do hero e barra de leitura.
export function Effects() {
  const pathname = usePathname();

  // biome-ignore lint/correctness/useExhaustiveDependencies: refaz a observação a cada navegação
  useEffect(() => {
    let cancelled = false;
    let io: IntersectionObserver | undefined;

    const start = () => {
      const html = document.documentElement;
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (!e.isIntersecting) continue;
            const el = e.target as HTMLElement;
            el.classList.add("is-in");
            if (el.dataset.count) animateCount(el);
            io?.unobserve(el);
          }
        },
        { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
      );
      const targets = document.querySelectorAll<HTMLElement>(
        "[data-reveal],[data-count]",
      );
      // o que já está na tela aparece sem piscar; o resto espera a rolagem
      for (const el of targets) {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.94 && r.bottom > 0)
          el.classList.add("is-in");
      }
      html.classList.add("js");
      for (const el of document.querySelectorAll<HTMLElement>(
        "[data-years-since]",
      )) {
        el.dataset.count = String(
          new Date().getFullYear() - Number(el.dataset.yearsSince),
        );
      }
      for (const el of targets) io.observe(el);
    };

    // só mexe no DOM depois que o React hidratou, para não gerar divergência
    const hydrated = (el: Element) =>
      Object.keys(el).some((k) => k.startsWith("__reactFiber"));
    const t0 = performance.now();
    const wait = () => {
      if (cancelled) return;
      const probe = document.querySelector("[data-reveal]");
      if (!probe || hydrated(probe) || performance.now() - t0 > 4000) start();
      else requestAnimationFrame(wait);
    };
    wait();

    // tudo vai para o <html> (variáveis CSS e classe) para não divergir do HTML hidratado
    const root = document.documentElement;
    let raf = 0;
    let lastY = window.scrollY;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        root.classList.toggle("is-scrolled", y > 24);
        // esconde ao descer, volta ao subir (ou perto do topo)
        const goingDown = y > lastY + 6;
        const goingUp = y < lastY - 6;
        if (y < 320 || goingUp) root.classList.remove("nav-hidden");
        else if (goingDown) root.classList.add("nav-hidden");
        if (goingDown || goingUp) lastY = y;
        if (!reduced() && y < window.innerHeight * 1.2) {
          root.style.setProperty("--py", `${y * 0.25}px`);
          root.style.setProperty(
            "--po",
            `${Math.max(0, 1 - y / (window.innerHeight * 0.8))}`,
          );
        }
        const h = root.scrollHeight - window.innerHeight;
        root.style.setProperty("--read", `${h > 0 ? Math.min(1, y / h) : 0}`);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelled = true;
      io?.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return null;
}
