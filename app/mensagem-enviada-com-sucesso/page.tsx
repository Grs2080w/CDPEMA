import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "@/components/icons";

export const metadata: Metadata = {
  title: "Mensagem enviada",
  robots: { index: false },
};

export default function Enviada() {
  return (
    <section className="success">
      <div>
        <div className="success__check">
          <Check />
        </div>
        <h1>Mensagem enviada com sucesso.</h1>
        <p>Aguarde. Em breve retornaremos o seu contato.</p>
        <Link href="/" className="btn btn--leaf">
          Voltar ao início
        </Link>
      </div>
    </section>
  );
}
