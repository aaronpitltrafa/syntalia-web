import { Link } from "@tanstack/react-router";
import { legalData } from "@/lib/legal-data";

/**
 * First-layer privacy disclosure (art. 13 RGPD) shown below the contact and
 * diagnóstico forms. Informational, not a consent checkbox — the basis for
 * handling the enquiry itself is precontractual, not consent.
 */
export function PrivacyNotice() {
  return (
    <p className="text-xs leading-relaxed text-foreground/70">
      Responsable: {legalData.razonSocial}. Finalidad: atender tu consulta o gestionar tu solicitud
      de diagnóstico. Legitimación: medidas precontractuales solicitadas por la persona interesada.
      Puedes ejercer tus derechos en{" "}
      <a
        href={`mailto:${legalData.email}`}
        className="font-semibold text-primary underline hover:text-accent"
      >
        {legalData.email}
      </a>
      . Más información en la{" "}
      <Link
        to="/privacidad"
        target="_blank"
        className="font-semibold text-primary underline hover:text-accent"
      >
        Política de Privacidad
      </Link>
      .
    </p>
  );
}
