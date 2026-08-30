import { CLAY, INK, MOSS, PAPER } from "@/lib/plano";

/**
 * Antes y después del estudio. Es la intervención más difícil de explicar con
 * palabras: se demuele el muro actual y se levanta uno nuevo, ciego y de muro a
 * muro, de modo que el estudio quede cerrado y el cuarto útil sólo se pueda
 * usar desde el corredor común del edificio.
 *
 * Son dos SVG independientes en vez de uno solo: así en el celular se apilan
 * uno debajo del otro y ninguno queda cortado.
 */

function Panel({ despues }: { despues: boolean }) {
  return (
    <svg
      viewBox="0 0 300 258"
      className="h-auto w-full"
      role="img"
      aria-label={
        despues
          ? "Después: muro nuevo de muro a muro, el cuarto útil se entra por el corredor del edificio"
          : "Antes: el muro actual no llega hasta el fondo y el cuarto útil sigue comunicado con el estudio"
      }
    >
      <defs>
        <pattern
          id={despues ? "demoB" : "demoA"}
          width="7"
          height="7"
          patternTransform="rotate(45)"
          patternUnits="userSpaceOnUse"
        >
          <line x1="0" y1="0" x2="0" y2="7" stroke={CLAY} strokeWidth="2.2" />
        </pattern>
      </defs>

      {/* Corredor del apartamento */}
      <rect x="20" y="8" width="230" height="24" fill="none" stroke={INK} strokeWidth="1.4" opacity="0.35" />
      <text x="135" y="24" textAnchor="middle" fontSize="10" letterSpacing="1.3" fill={INK} opacity="0.5">
        CORREDOR DEL APTO
      </text>

      {/* Volumen */}
      <rect x="20" y="32" width="230" height="180" fill="none" stroke={INK} strokeWidth="3.5" />

      {/* Puerta del estudio */}
      <rect x="58" y="27" width="52" height="10" fill={PAPER} />
      <path d="M58 32 A52 52 0 0 1 110 84" fill="none" stroke={INK} strokeWidth="1" opacity="0.3" />

      {despues ? (
        /* Muro nuevo: ciego y de muro a muro */
        <rect x="20" y="117" width="230" height="10" fill={CLAY} />
      ) : (
        <>
          {/* Muro actual: no llega hasta el fondo, los dos espacios siguen comunicados */}
          <rect x="20" y="117" width="150" height="10" fill="url(#demoA)" />
          <rect x="20" y="117" width="150" height="10" fill="none" stroke={CLAY} strokeWidth="1.2" />
          <path d="M210 110 v24" stroke={MOSS} strokeWidth="1.6" strokeDasharray="4 3" fill="none" />
        </>
      )}

      <text x="135" y="84" textAnchor="middle" fontSize="12" letterSpacing="1.5" fontWeight="600" fill={INK}>
        ESTUDIO
      </text>
      <text x="135" y="172" textAnchor="middle" fontSize="12" letterSpacing="1.5" fontWeight="600" fill={INK}>
        CUARTO ÚTIL
      </text>

      {despues && (
        <>
          {/* Corredor del edificio y puerta propia del cuarto útil */}
          <rect
            x="256"
            y="117"
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
            x="273"
            y="164"
            textAnchor="middle"
            fontSize="9"
            letterSpacing="1.2"
            fill={INK}
            opacity="0.55"
            transform="rotate(90 273 164)"
          >
            EDIFICIO
          </text>
          <rect x="246" y="145" width="10" height="42" fill={PAPER} />
          <path d="M256 145 A42 42 0 0 1 298 187" fill="none" stroke={CLAY} strokeWidth="1.5" />
        </>
      )}

      <text
        x="135"
        y="200"
        textAnchor="middle"
        fontSize="10"
        fill={despues ? CLAY : INK}
        opacity={despues ? 1 : 0.55}
      >
        {despues ? "sin puerta interna: aislado del apto" : "hoy siguen comunicados"}
      </text>

      {/* Fachada / muro exterior del bloque */}
      <text x="20" y="238" fontSize="9.5" fill={INK} opacity="0.45">
        {despues ? "el estudio queda cerrado" : "se entra al cuarto útil por el estudio"}
      </text>
    </svg>
  );
}

export default function DiagramaEstudio() {
  return (
    <figure className="card overflow-hidden">
      <div className="grid gap-4 p-4 sm:grid-cols-2 sm:gap-6 sm:p-6">
        <div>
          <p className="eyebrow mb-2">Antes</p>
          <Panel despues={false} />
        </div>
        <div className="relative">
          {/* Separador: flecha hacia abajo en móvil, hacia el lado en escritorio */}
          <span
            aria-hidden
            className="absolute -top-3 left-1/2 -translate-x-1/2 text-clay sm:-left-4 sm:top-1/2 sm:-translate-y-1/2 sm:translate-x-0"
          >
            <span className="sm:hidden">↓</span>
            <span className="hidden sm:inline">→</span>
          </span>
          <p className="eyebrow mb-2 text-clay">Después</p>
          <Panel despues />
        </div>
      </div>

      <ul className="flex flex-wrap gap-x-6 gap-y-2 border-t border-line px-4 py-3 text-[12px] text-muted sm:px-6">
        <li className="flex items-center gap-2">
          <span
            aria-hidden
            className="h-2.5 w-6 shrink-0 border border-clay"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #B4633A 0 2px, transparent 2px 5px)",
            }}
          />
          Muro que se demuele
        </li>
        <li className="flex items-center gap-2">
          <span aria-hidden className="h-2.5 w-6 shrink-0 bg-clay" />
          Muro nuevo, ciego y de muro a muro
        </li>
      </ul>

      <figcaption className="border-t border-line px-4 py-3 text-[12.5px] leading-relaxed text-muted sm:px-6">
        El estudio queda como un espacio cerrado del apartamento. El cuarto útil deja de tener
        comunicación interna y se usa sólo desde el corredor del edificio. El sistema constructivo
        del muro nuevo lo recomienda el contratista.
      </figcaption>
    </figure>
  );
}
