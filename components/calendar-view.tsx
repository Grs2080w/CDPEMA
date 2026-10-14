"use client";

import { useEffect, useMemo, useState } from "react";

type Day = { day: string; to?: string; label: string };
type Month = { month: string; days: Day[] };

const norm = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export function CalendarView({ months }: { months: Month[] }) {
  const [query, setQuery] = useState("");
  const [only, setOnly] = useState<string | null>(null);
  const [now, setNow] = useState<{ m: number; d: number } | null>(null);

  useEffect(() => {
    const t = new Date();
    setNow({ m: t.getMonth(), d: t.getDate() });
  }, []);

  const shown = useMemo(() => {
    const q = norm(query.trim());
    return months
      .map((m, idx) => ({
        ...m,
        idx,
        days: q ? m.days.filter((d) => norm(d.label).includes(q)) : m.days,
      }))
      .filter((m) => m.days.length > 0 && (!only || m.month === only));
  }, [months, query, only]);

  return (
    <>
      <input
        className="cal-search"
        type="search"
        placeholder="Buscar uma data (ex.: água, árvore, animais)…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Buscar no calendário"
      />
      {/* biome-ignore lint/a11y/useSemanticElements: grupo de botões de filtro */}
      <div className="cal-tools" role="group" aria-label="Filtrar por mês">
        <button
          type="button"
          aria-pressed={only === null}
          onClick={() => setOnly(null)}
        >
          Todos
        </button>
        {months.map((m) => (
          <button
            type="button"
            key={m.month}
            aria-pressed={only === m.month}
            onClick={() => setOnly(only === m.month ? null : m.month)}
          >
            {m.month.slice(0, 3)}
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <p className="cal-empty">Nenhuma data encontrada para “{query}”.</p>
      ) : (
        <div className="cal-grid">
          {shown.map((m, i) => {
            const current = now?.m === m.idx;
            return (
              <article
                className={`month${current ? " is-current" : ""}`}
                key={m.month}
                data-reveal
                style={{ "--d": `${(i % 3) * 0.08}s` } as React.CSSProperties}
              >
                <header>
                  <h3>{m.month}</h3>
                  {current ? (
                    <small>Este mês</small>
                  ) : (
                    <small>{m.days.length} datas</small>
                  )}
                </header>
                <ul>
                  {m.days.map((d) => (
                    <li
                      key={`${d.day}-${d.label}`}
                      className={
                        current && now?.d === Number(d.day)
                          ? "is-today"
                          : undefined
                      }
                    >
                      <b>{d.to ? `${d.day}–${d.to}` : d.day}</b>
                      <span>{d.label}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      )}
    </>
  );
}
