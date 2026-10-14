import { Messenger, WhatsApp } from "@/components/icons";
import { SITE } from "@/lib/config";

export function FloatingActions() {
  return (
    <div className="floating">
      <a
        className="floating__btn floating__btn--msn"
        href={SITE.messenger}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar pelo Messenger"
      >
        <Messenger />
      </a>
      <a
        className="floating__btn floating__btn--wa"
        href={SITE.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar pelo WhatsApp"
      >
        <WhatsApp />
      </a>
    </div>
  );
}
