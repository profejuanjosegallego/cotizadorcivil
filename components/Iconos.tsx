import type { IconoNombre } from "@/lib/plano";

/**
 * Iconos de línea, dibujados sobre una caja de 24×24 y heredando el color y el
 * grosor del contexto. Se usan en las tarjetas, en la leyenda del plano y en
 * cada ítem de la cotización.
 */

const TRAZOS: Record<IconoNombre, React.ReactNode> = {
  // Lámpara colgante
  luz: (
    <>
      <path d="M12 3v3" />
      <path d="M5.5 14a6.5 6.5 0 0 1 13 0z" />
      <path d="M9.5 17.5h5" />
    </>
  ),
  // Aplique que baña un muro con luz
  luzIndirecta: (
    <>
      <path d="M4 4h16" />
      <rect x="9" y="5.5" width="6" height="3" rx="1" />
      <path d="M7.5 12.5 9.5 9M12 13.5V9M16.5 12.5 14.5 9" />
      <path d="M5 20h14" />
    </>
  ),
  // Mini split
  aire: (
    <>
      <rect x="3" y="5" width="18" height="6.5" rx="1.6" />
      <path d="M6.5 8.2h11" />
      <path d="M8 15c0 1.6-1.2 2-1.2 3.4M12 15c0 1.9-1.2 2.4-1.2 4M16 15c0 1.6-1.2 2-1.2 3.4" />
    </>
  ),
  // Estantería con entrepaños
  estanteria: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1.4" />
      <path d="M4 9h16M4 15h16" />
    </>
  ),
  // Muro que se demuele
  muro: (
    <>
      <path d="M3 6h18M3 12h18M3 18h18" />
      <path d="M9 6v6M15 12v6M12 18v3M12 3v3" />
    </>
  ),
  // Rodillo de pintura
  pintura: (
    <>
      <rect x="3" y="4" width="12" height="5" rx="1.2" />
      <path d="M15 6.5h3.5a1.5 1.5 0 0 1 1.5 1.5v2a1.5 1.5 0 0 1-1.5 1.5H12" />
      <path d="M12 11.5v2.5" />
      <rect x="10" y="14" width="4" height="6" rx="1.2" />
    </>
  ),
  // Enchape de piso
  baldosa: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="1.4" />
      <path d="M12 3v18M3 12h18" />
    </>
  ),
  // Grifería
  grifo: (
    <>
      <path d="M8 20h8" />
      <path d="M12 20v-6" />
      <path d="M12 14H6.5a2.5 2.5 0 0 1 0-5H9" />
      <path d="M9 6.5h6v3H9z" />
      <path d="M12 6.5v-2" />
    </>
  ),
  // Estufa a gas
  estufa: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="1.6" />
      <circle cx="8.5" cy="9.5" r="1.7" />
      <circle cx="15.5" cy="9.5" r="1.7" />
      <circle cx="8.5" cy="15.5" r="1.7" />
      <circle cx="15.5" cy="15.5" r="1.7" />
    </>
  ),
  // Baranda de balcón
  baranda: (
    <>
      <path d="M3 7h18" />
      <path d="M3 20h18" />
      <path d="M7 7v13M12 7v13M17 7v13" />
    </>
  ),
  // Punto eléctrico
  electrico: (
    <>
      <path d="M13 2 4.5 13.5H11l-1 8.5 9-11.5h-6.5z" />
    </>
  ),
  // Sanitario
  bano: (
    <>
      <path d="M6 3v6a5 5 0 0 0 5 5h1a5 5 0 0 0 5-5V9H6" />
      <path d="M10 14v3.5a2 2 0 0 0 2 2h4" />
      <path d="M7 21h9" />
    </>
  ),
  // Ducha
  ducha: (
    <>
      <path d="M4 21V7a3 3 0 0 1 6 0v1" />
      <path d="M14 4.5 20.5 11" />
      <path d="M17.2 4.3a3.8 3.8 0 0 0-5.4 5.4z" />
      <path d="M8 14v1M12 16v1M16 14v1M10 19v1M14 19v1" />
    </>
  ),
  // Cocineta: mesón con lavaplatos
  cocineta: (
    <>
      <path d="M3 9h18" />
      <path d="M4 9v11a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9" />
      <circle cx="8.5" cy="14" r="2" />
      <path d="M15 13h4M15 16h4" />
      <path d="M8.5 9V6.5a2.5 2.5 0 0 1 2.5-2.5" />
    </>
  ),
  // Carga pesada sobre el piso
  carga: (
    <>
      <path d="M4 20h16" />
      <path d="M7 16.5 9 6h6l2 10.5z" />
      <path d="M8.2 11h7.6" />
    </>
  ),
  // Puerta
  puerta: (
    <>
      <path d="M4 21h16" />
      <rect x="6.5" y="3" width="11" height="18" rx="1.2" />
      <circle cx="14.5" cy="12" r="0.9" />
    </>
  ),
};

export default function Icono({
  nombre,
  className = "h-5 w-5",
  strokeWidth = 1.5,
}: {
  nombre: IconoNombre;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {TRAZOS[nombre]}
    </svg>
  );
}
