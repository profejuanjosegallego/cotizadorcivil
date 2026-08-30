import { CLAY, INK, MOSS, PAPER } from "@/lib/plano";

/**
 * Antes y después del estudio. Es la intervención más difícil de explicar con
 * palabras: se demuele el muro actual y se levanta uno nuevo, ciego y de muro a
 * muro, de modo que el estudio quede cerrado y el cuarto útil sólo se pueda
 * usar desde el corredor común del edificio.
 */
export default function DiagramaEstudio() {
  return (
    <figure className="card overflow-hidden">
      <div className="min-w-0 overflow-x-auto">
        <svg
          viewBox="0 0 620 330"
          style={{ minWidth: 560 }}
          className="h-auto w-full"
          role="img"
          aria-label="Diagrama del estudio y el cuarto útil, antes y después de la intervención"
        >
          <defs>
            <pattern
              id="demo2"
              width="7"
              height="7"
              patternTransform="rotate(45)"
              patternUnits="userSpaceOnUse"
            >
              <line x1="0" y1="0" x2="0" y2="7" stroke={CLAY} strokeWidth="2.2" />
            </pattern>
          </defs>

          {/* ================= ANTES ================= */}
          <text x="26" y="30" fontSize="12" letterSpacing="1.8" fontWeight="700" fill={INK}>
            ANTES
          </text>

          <rect x="26" y="44" width="230" height="26" fill="none" stroke={INK} strokeWidth="1.4" opacity="0.35" />
          <text x="141" y="61" textAnchor="middle" fontSize="10" letterSpacing="1.4" fill={INK} opacity="0.5">
            CORREDOR DEL APTO
          </text>

          <rect x="26" y="70" width="230" height="180" fill="none" stroke={INK} strokeWidth="3.5" />

          {/* Puerta del estudio */}
          <rect x="66" y="65" width="52" height="10" fill={PAPER} />
          <path d="M66 70 A52 52 0 0 1 118 122" fill="none" stroke={INK} strokeWidth="1" opacity="0.3" />

          {/* Muro actual, incompleto: deja el paso abierto hacia el cuarto útil */}
          <rect x="26" y="155" width="150" height="10" fill="url(#demo2)" />
          <rect x="26" y="155" width="150" height="10" fill="none" stroke={CLAY} strokeWidth="1.2" />

          <text x="141" y="122" textAnchor="middle" fontSize="12" letterSpacing="1.5" fontWeight="600" fill={INK}>
            ESTUDIO
          </text>
          <text x="141" y="210" textAnchor="middle" fontSize="12" letterSpacing="1.5" fontWeight="600" fill={INK}>
            CUARTO ÚTIL
          </text>

          {/* Paso abierto hoy */}
          <path d="M216 148 v24" stroke={MOSS} strokeWidth="1.6" strokeDasharray="4 3" fill="none" />
          <text x="141" y="238" textAnchor="middle" fontSize="10" fill={INK} opacity="0.55">
            hoy siguen comunicados
          </text>

          {/* Flecha */}
          <g stroke={CLAY} strokeWidth="2" fill="none">
            <line x1="278" y1="160" x2="308" y2="160" />
            <path d="M302 154 L310 160 L302 166" />
          </g>

          {/* ================= DESPUÉS ================= */}
          <text x="330" y="30" fontSize="12" letterSpacing="1.8" fontWeight="700" fill={CLAY}>
            DESPUÉS
          </text>

          <rect x="330" y="44" width="230" height="26" fill="none" stroke={INK} strokeWidth="1.4" opacity="0.35" />
          <text x="445" y="61" textAnchor="middle" fontSize="10" letterSpacing="1.4" fill={INK} opacity="0.5">
            CORREDOR DEL APTO
          </text>

          <rect x="330" y="70" width="230" height="180" fill="none" stroke={INK} strokeWidth="3.5" />

          {/* Puerta del estudio */}
          <rect x="370" y="65" width="52" height="10" fill={PAPER} />
          <path d="M370 70 A52 52 0 0 1 422 122" fill="none" stroke={INK} strokeWidth="1" opacity="0.3" />

          {/* Muro nuevo, ciego y de muro a muro */}
          <rect x="330" y="155" width="230" height="10" fill={CLAY} />

          <text x="445" y="122" textAnchor="middle" fontSize="12" letterSpacing="1.5" fontWeight="600" fill={INK}>
            ESTUDIO
          </text>
          <text x="445" y="210" textAnchor="middle" fontSize="12" letterSpacing="1.5" fontWeight="600" fill={INK}>
            CUARTO ÚTIL
          </text>

          {/* Corredor del edificio y puerta propia del cuarto útil */}
          <rect
            x="566"
            y="155"
            width="34"
            height="95"
            fill={INK}
            opacity="0.045"
            stroke={INK}
            strokeOpacity="0.25"
            strokeWidth="1.2"
            strokeDasharray="4 3"
          />
          <text
            x="583"
            y="202"
            textAnchor="middle"
            fontSize="9"
            letterSpacing="1.2"
            fill={INK}
            opacity="0.5"
            transform="rotate(90 583 202)"
          >
            EDIFICIO
          </text>
          <rect x="556" y="182" width="10" height="42" fill={PAPER} />
          <path d="M566 182 A42 42 0 0 1 608 224" fill="none" stroke={CLAY} strokeWidth="1.5" />

          <text x="445" y="238" textAnchor="middle" fontSize="10" fill={CLAY}>
            aislado: sólo se entra por el corredor del edificio
          </text>

          {/* ================= Leyenda ================= */}
          <g fontSize="10" fill={INK}>
            <rect x="26" y="292" width="24" height="9" fill="url(#demo2)" stroke={CLAY} strokeWidth="1" />
            <text x="58" y="300" opacity="0.7">
              Muro que se demuele
            </text>
            <rect x="212" y="292" width="24" height="9" fill={CLAY} />
            <text x="244" y="300" opacity="0.7">
              Muro nuevo, ciego y de muro a muro
            </text>
          </g>
        </svg>
      </div>
      <figcaption className="border-t border-line px-5 py-3 text-[12.5px] leading-relaxed text-muted">
        El estudio queda como un espacio cerrado del apartamento. El cuarto útil deja de tener
        comunicación interna y se usa sólo desde el corredor del edificio. El sistema constructivo
        del muro nuevo lo recomienda el contratista.
      </figcaption>
    </figure>
  );
}
