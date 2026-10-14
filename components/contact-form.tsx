"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { Send } from "@/components/icons";
import { SITE } from "@/lib/config";

// Sem backend ainda: a mensagem abre no app de e-mail do visitante, já endereçada à CDPEMA.
export function ContactForm() {
  const router = useRouter();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = [
      `Nome: ${f.get("nome")}`,
      `E-mail: ${f.get("email")}`,
      `Telefone: ${f.get("telefone")}`,
      "",
      f.get("mensagem"),
    ].join("\n");
    const href = `mailto:${SITE.email}?subject=${encodeURIComponent(String(f.get("assunto")))}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    router.push("/mensagem-enviada-com-sucesso");
  };

  return (
    <form className="form" onSubmit={onSubmit} data-reveal>
      <div className="field">
        <input
          id="nome"
          name="nome"
          placeholder=" "
          required
          autoComplete="name"
        />
        <label htmlFor="nome">Nome completo</label>
      </div>
      <div className="field">
        <input
          id="email"
          name="email"
          type="email"
          placeholder=" "
          required
          autoComplete="email"
        />
        <label htmlFor="email">E-mail</label>
      </div>
      <div className="field">
        <input
          id="telefone"
          name="telefone"
          type="tel"
          placeholder=" "
          autoComplete="tel"
        />
        <label htmlFor="telefone">DDD + Telefone</label>
      </div>
      <div className="field">
        <input id="assunto" name="assunto" placeholder=" " required />
        <label htmlFor="assunto">Assunto</label>
      </div>
      <div className="field full">
        <textarea id="mensagem" name="mensagem" placeholder=" " required />
        <label htmlFor="mensagem">Mensagem</label>
      </div>
      <div
        className="full"
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 16,
          justifyContent: "space-between",
        }}
      >
        <p className="form__note">
          Ao enviar, abriremos o seu app de e-mail com a mensagem pronta.
        </p>
        <button className="btn btn--leaf" type="submit">
          Enviar mensagem <Send width={18} height={18} />
        </button>
      </div>
    </form>
  );
}
