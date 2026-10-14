import type { Metadata } from "next";
import { CalendarView } from "@/components/calendar-view";
import { PageHero } from "@/components/page-hero";
import calendario from "@/lib/data/calendario.json";
import { pageOg } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Calendário Ecológico",
  description: "Datas comemorativas do Meio Ambiente, mês a mês.",
  alternates: { canonical: "/conheca-a-cdpema/calendario-ecologico" },
  openGraph: pageOg("/conheca-a-cdpema/calendario-ecologico"),
};

export default function Calendario() {
  return (
    <>
      <PageHero
        title="Calendário Ecológico"
        lead="Calendário com as datas comemorativas do Meio Ambiente, de janeiro a dezembro."
        crumbs={[
          { label: "Conheça a CDPEMA", href: "/conheca-a-cdpema" },
          { label: "Calendário Ecológico" },
        ]}
        image="/site/wp-content/uploads/2020/09/preservacao-ambiental.jpg"
      />
      <section className="section" style={{ paddingTop: 56 }}>
        <div className="container">
          <CalendarView months={calendario} />
        </div>
      </section>
    </>
  );
}
