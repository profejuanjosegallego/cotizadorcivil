import { CLAY, INK, PAPER } from "@/lib/plano";

/**
 * Cómo está hoy el estudio y cómo debe quedar.
 *
 * La dueña anterior corrió el muro hacia el estudio para agrandar el cuarto útil
 * y montarle cocineta, baño y ducha, y así alquilarlo aparte. La obra consiste en
 * retirar esos servicios y devolver el muro a su posición original, de modo que
 * cada espacio recupere sus dimensiones.
 *
 * Son dos SVG independientes en vez de uno solo: así en el celular se apilan
 * uno debajo del otro y ninguno queda cortado.
 */

const MURO_HOY = 90;
const MURO_ORIGINAL = 138;

function Panel({ original }: { original: boolean }) {
  const muro = original ? MURO_ORIGINAL : MURO_HOY;

  return (
    <svg
      viewBox="0 0 320 252"
      className="h-auto w-full"
      role="img"
      aria-label={
        original
          ? "Como debe quedar: el muro vuelve a su posición original, el estudio recupera su área y el cuarto útil queda sin cocineta, baño ni ducha"
          : "Como está hoy: el muro está corrido hacia el estudio y el cuarto útil tiene cocineta, baño y ducha"
      }
    >
      <defs>
        <pattern
          id={original ? "dmB" : "dmA"}
          width="7"
          height="7"
          patternTransform="rotate(45)"
          patternUnits="userSpaceOnUse"
        >
          <line x1="0" y1="0" x2="0" y2="7" stroke={CLAY} strokeWidth="2.2" />
        </pattern>
      </defs>

      {/* Corredor del apartamento */}
      <rect x="18" y="8" width="230" height="22" fill="none" stroke={INK} strokeWidth="1.3" opacity="0.32" />
      <text x="133" y="23" textAnchor="middle" fontSize="9.5" letterSpacing="1.3" fill={INK} opacity="0.5">
        CORREDOR DEL APTO
      </text>

      {/* Volumen completo */}
      <rect x="18" y="30" width="230" height="175" fill="none" stroke={INK} strokeWidth="3.5" />

      {/* Puerta del estudio, desde el corredor del apartamento */}
      <rect x="52" y="25" width="48" height="10" fill={PAPER} />
      <path d="M52 30 A48 48 0 0 1 100 78" fill="none" stroke={INK} strokeWidth="1" opacity="0.28" />

      {original && (
        <>
          {/* Franja que el estudio recupera */}
          <rect x="20" y={MURO_HOY + 2} width="226" height={MURO_ORIGINAL - MURO_HOY - 6} fill={CLAY} opacity="0.1" />
          <line
            x1="20"
            y1={MURO_HOY}
            x2="246"
            y2={MURO_HOY}
            stroke={CLAY}
            strokeWidth="1.2"
            strokeDasharray="5 4"
            opacity="0.6"
          />
          <text x="133" y={MURO_HOY + 26} textAnchor="middle" fontSize="9.5" fill={CLAY}>
            área que recupera el estudio
          </text>
        </>
      )}

      {/* El muro */}
      {original ? (
        <rect x="18" y={muro - 4} width="230" height="8" fill={CLAY} />
      ) : (
        <>
          <rect x="18" y={muro - 4} width="230" height="8" fill={`url(#dmA)`} />
          <rect x="18" y={muro - 4} width="230" height="8" fill="none" stroke={CLAY} strokeWidth="1.2" />
        </>
      )}

      <text
        x="133"
        y={original ? 70 : 62}
        textAnchor="middle"
        fontSize="12"
        letterSpacing="1.5"
        fontWeight="600"
        fill={INK}
      >
        ESTUDIO
      </text>

      {!original && (
        <>
          {/* Cocineta */}
          <rect x="26" y="102" width="70" height="14" fill="none" stroke={CLAY} strokeWidth="1.4" strokeDasharray="4 3" />
          <circle cx="46" cy="109" r="4.5" fill="none" stroke={CLAY} strokeWidth="1.1" />
          <text x="61" y="128" textAnchor="middle" fontSize="8.5" fill={CLAY}>
            cocineta
          </text>

          {/* Baño con ducha */}
          <rect x="158" y="102" width="82" height="58" fill="none" stroke={CLAY} strokeWidth="1.4" strokeDasharray="4 3" />
          <rect x="166" y="108" width="12" height="17" rx="5" fill="none" stroke={CLAY} strokeWidth="1.1" />
          <rect x="196" y="128" width="36" height="24" fill="none" stroke={CLAY} strokeWidth="1.1" />
          <path d="M196 128 L232 152M232 128 L196 152" stroke={CLAY} strokeWidth="0.8" opacity="0.45" />
          <text x="199" y="173" textAnchor="middle" fontSize="8.5" fill={CLAY}>
            baño y ducha
          </text>

          <text x="95" y="192" textAnchor="middle" fontSize="12" letterSpacing="1.5" fontWeight="600" fill={INK}>
            CUARTO ÚTIL
          </text>
        </>
      )}

      {original && (
        <>
          {/* Estantería con rieles contra el muro */}
          <rect x="26" y="150" width="14" height="46" fill={PAPER} stroke={CLAY} strokeWidth="1.8" />
          <line x1="26" y1="165" x2="40" y2="165" stroke={CLAY} strokeWidth="1.1" />
          <line x1="26" y1="181" x2="40" y2="181" stroke={CLAY} strokeWidth="1.1" />

          <text x="140" y="178" textAnchor="middle" fontSize="12" letterSpacing="1.5" fontWeight="600" fill={INK}>
            CUARTO ÚTIL
          </text>
          <text x="140" y="194" textAnchor="middle" fontSize="9" fill={CLAY}>
            sin servicios, con baldosa resistente
          </text>
        </>
      )}

      {/* Puerta del cuarto útil hacia el corredor del edificio */}
      <rect x="244" y={muro + 26} width="9" height="38" fill={PAPER} />
      <path
        d={`M253 ${muro + 26} A38 38 0 0 1 291 ${muro + 64}`}
        fill="none"
        stroke={INK}
        strokeWidth="1"
        opacity="0.3"
      />
      <text x="262" y={muro + 20} fontSize="8" fill={INK} opacity="0.5">
        al edificio
      </text>

      <text x="18" y="230" fontSize="9.5" fill={INK} opacity="0.5">
        {original
          ? "cada espacio con sus dimensiones originales"
          : "el muro está corrido: le quitaron área al estudio"}
      </text>
    </svg>
  );
}

export default function DiagramaEstudio() {
  return (
    <figure className="card overflow-hidden">
      <div className="grid gap-5 p-4 sm:grid-cols-2 sm:gap-6 sm:p-6">
        <div>
          <p className="eyebrow mb-2">Hoy</p>
          <Panel original={false} />
        </div>
        <div className="relative">
          <span
            aria-hidden
            className="absolute -top-4 left-1/2 -translate-x-1/2 text-clay sm:-left-4 sm:top-1/2 sm:-translate-y-1/2 sm:translate-x-0"
          >
            <span className="sm:hidden">↓</span>
            <span className="hidden sm:inline">→</span>
          </span>
          <p className="eyebrow mb-2 text-clay">Como debe quedar</p>
          <Panel original />
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
          Muro actual, que se demuele
        </li>
        <li className="flex items-center gap-2">
          <span aria-hidden className="h-2.5 w-6 shrink-0 bg-clay" />
          Muro nuevo, en la posición original
        </li>
        <li className="flex items-center gap-2">
          <span
            aria-hidden
            className="h-2.5 w-6 shrink-0 border border-dashed border-clay"
          />
          Se retira
        </li>
      </ul>

      <figcaption className="border-t border-line px-4 py-3 text-[12.5px] leading-relaxed text-muted sm:px-6">
        Los dos espacios ya están separados: al cuarto útil se entra por el corredor del edificio.
        Lo que cambia es dónde está el muro. Hay que confirmar en sitio dónde quedaba originalmente
        —normalmente se ve en el piso, en el cielo o en la cornisa— antes de levantarlo.
      </figcaption>
    </figure>
  );
}
