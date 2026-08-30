import { CLAY, INK, PAPER } from "@/lib/plano";

/**
 * Ejemplo de la estantería con rieles que se quiere en el cuarto útil.
 * Es un esquema dibujado, no una foto de producto: sirve para que el equipo de
 * Óscar entienda el sistema (rieles verticales + ménsulas regulables +
 * entrepaños) y proponga su diseño con medidas reales.
 */

const ALTURAS = [70, 130, 190, 250]; // niveles de los entrepaños en el dibujo
const RIELES = [70, 190, 310]; // posición horizontal de cada riel

export default function DiagramaEstanteria() {
  return (
    <figure className="card overflow-hidden">
      <div className="grid gap-6 p-4 sm:grid-cols-[1.5fr_1fr] sm:p-6">
        {/* ---------- Alzado ---------- */}
        <div>
          <p className="eyebrow mb-3">Alzado — cómo funciona</p>
          <svg
            viewBox="0 0 470 352"
            className="mx-auto h-auto w-full max-w-[470px]"
            role="img"
            aria-label="Alzado de una estantería de rieles verticales con ménsulas regulables y entrepaños"
          >
            {/* Muro */}
            <rect x="30" y="20" width="340" height="285" fill={INK} opacity="0.03" />
            <line x1="30" y1="305" x2="370" y2="305" stroke={INK} strokeWidth="3" />

            {/* Rieles verticales */}
            {RIELES.map((x) => (
              <g key={x}>
                <rect x={x - 5} y="35" width="10" height="255" fill={PAPER} stroke={INK} strokeWidth="1.6" />
                {/* Ranuras del riel: es lo que permite subir o bajar el entrepaño */}
                {Array.from({ length: 17 }, (_, i) => 45 + i * 15).map((y) => (
                  <line key={y} x1={x - 3} y1={y} x2={x + 3} y2={y} stroke={INK} strokeWidth="1" opacity="0.45" />
                ))}
              </g>
            ))}

            {/* Entrepaños con sus ménsulas */}
            {ALTURAS.map((y) => (
              <g key={y}>
                {RIELES.map((x) => (
                  <path
                    key={x}
                    d={`M${x + 5} ${y} h34 l-6 12 h-28 z`}
                    fill={CLAY}
                    opacity="0.85"
                  />
                ))}
                <rect x="52" y={y - 10} width="296" height="11" fill={PAPER} stroke={INK} strokeWidth="1.8" />
              </g>
            ))}

            {/* Cosas pesadas sobre el entrepaño de abajo */}
            <g stroke={INK} strokeWidth="1.2" fill="none" opacity="0.35">
              <rect x="70" y="216" width="34" height="24" />
              <rect x="112" y="222" width="26" height="18" />
              <rect x="250" y="212" width="44" height="28" />
            </g>

            {/* Cotas, por fuera del dibujo para no taparlo */}
            <g stroke={CLAY} strokeWidth="1" fill="none">
              <path d="M392 60 v70M388 60 h8M388 130 h8" />
            </g>
            <text
              x="410"
              y="95"
              textAnchor="middle"
              fontSize="15"
              fill={CLAY}
              transform="rotate(90 410 95)"
            >
              altura regulable
            </text>

            <g stroke={INK} strokeWidth="1" opacity="0.45" fill="none">
              <path d="M70 320 h120M70 316 v8M190 316 v8" />
            </g>
            <text x="130" y="340" textAnchor="middle" fontSize="15" fill={INK} opacity="0.55">
              separación entre rieles
            </text>
          </svg>
        </div>

        {/* ---------- Detalle ---------- */}
        <div>
          <p className="eyebrow mb-3">Detalle del enganche</p>
          <svg
            viewBox="0 0 240 330"
            className="mx-auto h-auto w-full max-w-[250px]"
            role="img"
            aria-label="Detalle de la ménsula enganchada en las ranuras del riel vertical"
          >
            {/* Muro */}
            <rect x="20" y="20" width="30" height="290" fill={INK} opacity="0.06" />
            <line x1="50" y1="20" x2="50" y2="310" stroke={INK} strokeWidth="2" />
            <g stroke={INK} strokeWidth="1" opacity="0.3">
              {Array.from({ length: 10 }, (_, i) => 30 + i * 30).map((y) => (
                <line key={y} x1="20" y1={y} x2="34" y2={y - 12} />
              ))}
            </g>

            {/* Riel */}
            <rect x="50" y="40" width="20" height="250" fill={PAPER} stroke={INK} strokeWidth="2" />
            {Array.from({ length: 11 }, (_, i) => 55 + i * 22).map((y) => (
              <rect key={y} x="55" y={y} width="10" height="7" rx="1.5" fill={INK} opacity="0.75" />
            ))}

            {/* Chazos */}
            {[70, 160, 250].map((y) => (
              <g key={y}>
                <circle cx="60" cy={y} r="4.5" fill="none" stroke={CLAY} strokeWidth="1.6" />
                <line x1="36" y1={y} x2="55" y2={y} stroke={CLAY} strokeWidth="1.6" />
              </g>
            ))}
            <text x="34" y="302" fontSize="12" fill={CLAY}>
              chazo + tornillo
            </text>

            {/* Ménsula enganchada */}
            <path d="M70 122 h80 l-14 26 h-66 z" fill={CLAY} opacity="0.9" />
            <path d="M64 116 h10 v16 h-10 z" fill={INK} opacity="0.8" />
            <text x="156" y="133" fontSize="12" fill={CLAY}>
              ménsula
            </text>

            {/* Entrepaño */}
            <rect x="70" y="106" width="150" height="14" fill={PAPER} stroke={INK} strokeWidth="2" />
            <text x="156" y="99" fontSize="12" fill={INK} opacity="0.7">
              entrepaño
            </text>

            {/* Ménsula suelta, mostrando que se puede mover */}
            <g opacity="0.35">
              <path d="M70 210 h80 l-14 26 h-66 z" fill={CLAY} />
              <rect x="70" y="194" width="150" height="14" fill={PAPER} stroke={INK} strokeWidth="1.6" />
            </g>
            <g stroke={CLAY} strokeWidth="1.4" fill="none">
              <path d="M100 166 v28M94 188 l6 8 l6 -8" />
            </g>
            <text x="112" y="184" fontSize="12" fill={CLAY}>
              se sube o se baja
            </text>
          </svg>
        </div>
      </div>

      <figcaption className="border-t border-line px-4 py-4 text-[13px] leading-relaxed text-muted sm:px-6">
        <span className="font-medium text-ink">Así queremos el sistema:</span> rieles verticales
        anclados al muro con chazo y tornillo, ménsulas que enganchan en las ranuras del riel, y
        entrepaños que se apoyan sobre las ménsulas. La gracia es que la altura de cada entrepaño se
        pueda cambiar después sin volver a perforar. El diseño final —cuántos rieles, separación,
        profundidad y material de los entrepaños— lo propone el equipo de Óscar con las medidas
        reales del cuarto.
      </figcaption>
    </figure>
  );
}
