"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Icono from "@/components/Iconos";
import {
  CLAY,
  INK,
  MARCAS,
  MURO_ACTUAL_Y,
  BARRA,
  BORDES_ABIERTOS,
  MURO_ORIGINAL_Y,
  PAPER,
  VANOS,
  VIEWBOX,
  ZONAS,
} from "@/lib/plano";

export default function Plano({ conLeyenda = true }: { conLeyenda?: boolean }) {
  const router = useRouter();
  const [activa, setActiva] = useState<string | null>(null);

  const ir = (slug: string | null) => {
    if (slug) router.push(`/espacios/${slug}`);
  };

  return (
    // min-w-0: sin esto el ancho mínimo del SVG ensancha la grilla y la página
    // entera se desborda en horizontal en el celular.
    <div className="w-full min-w-0">
      {/* En el celular el plano se desplaza en horizontal para no volverse ilegible */}
      <div className="-mx-5 min-w-0 overflow-x-auto px-5 sm:mx-0 sm:px-0">
        <svg
          viewBox={VIEWBOX}
          // Ancho mínimo sólo en pantallas chicas: arriba de md el plano cabe
          // completo y no debe forzar desplazamiento horizontal.
          className="h-auto w-full min-w-[660px] select-none md:min-w-0"
          role="img"
          aria-label="Plano del apartamento con las intervenciones señaladas"
        >
          <defs>
            <pattern
              id="demolicion"
              width="8"
              height="8"
              patternTransform="rotate(45)"
              patternUnits="userSpaceOnUse"
            >
              <line x1="0" y1="0" x2="0" y2="8" stroke={CLAY} strokeWidth="2.5" />
            </pattern>
            <pattern id="malla" width="7" height="7" patternUnits="userSpaceOnUse">
              <path d="M0 0H7M0 0V7" stroke={INK} strokeOpacity="0.15" strokeWidth="1" />
            </pattern>
            <pattern id="enchape" width="13" height="13" patternUnits="userSpaceOnUse">
              <path d="M0 0H13M0 0V13" stroke={CLAY} strokeOpacity="0.45" strokeWidth="1" />
            </pattern>
          </defs>

          {/* ---- Corredor común del edificio ---- */}
          <rect
            x="762"
            y="118"
            width="46"
            height="345"
            fill={INK}
            opacity="0.045"
            stroke={INK}
            strokeOpacity="0.25"
            strokeWidth="1.5"
            strokeDasharray="5 4"
          />
          <text
            x="785"
            y="290"
            textAnchor="middle"
            fontSize="11"
            letterSpacing="2"
            fill={INK}
            opacity="0.5"
            transform="rotate(90 785 290)"
          >
            CORREDOR DEL EDIFICIO
          </text>

          {/* El balcón lleva textura para leerse como exterior */}
          <rect x="30" y="30" width="109" height="307" fill="url(#malla)" />

          {/* ---- Zonas ---- */}
          {ZONAS.map((z) => {
            const clickable = Boolean(z.slug);
            return (
              <g
                key={z.label + z.x}
                className={clickable ? "plano-zona" : undefined}
                tabIndex={clickable ? 0 : undefined}
                role={clickable ? "link" : undefined}
                aria-label={clickable ? `Ver ${z.label} ${z.sub ?? ""}`.trim() : undefined}
                onClick={() => ir(z.slug)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    ir(z.slug);
                  }
                }}
                onMouseEnter={() => setActiva(z.slug)}
                onMouseLeave={() => setActiva(null)}
              >
                <rect
                  className="plano-fill"
                  x={z.x}
                  y={z.y}
                  width={z.w}
                  height={z.h}
                  fill={activa && activa === z.slug ? "#F6EDE7" : "transparent"}
                />
                <rect
                  className="plano-borde"
                  x={z.x}
                  y={z.y}
                  width={z.w}
                  height={z.h}
                  fill="none"
                  stroke={INK}
                  strokeWidth="2.5"
                />
                <text
                  x={z.x + z.w / 2}
                  y={z.y + z.h / 2 + (z.labelDy ?? 0) + (z.sub ? -3 : 5)}
                  textAnchor="middle"
                  fontSize="14"
                  letterSpacing="1.6"
                  fill={clickable ? INK : "#9C978F"}
                  fontWeight={clickable ? 600 : 400}
                  style={{ pointerEvents: "none" }}
                >
                  {z.label}
                </text>
                {z.sub && (
                  <text
                    x={z.x + z.w / 2}
                    y={z.y + z.h / 2 + (z.labelDy ?? 0) + 15}
                    textAnchor="middle"
                    fontSize="14"
                    letterSpacing="1.6"
                    fill={clickable ? INK : "#9C978F"}
                    fontWeight={clickable ? 600 : 400}
                    style={{ pointerEvents: "none" }}
                  >
                    {z.sub}
                  </text>
                )}
              </g>
            );
          })}

          {/* ---- Muros exteriores ---- */}
          <g fill="none" stroke={INK} strokeWidth="5" style={{ pointerEvents: "none" }}>
            {/* Contorno en L: el cuarto útil sobresale del bloque principal */}
            <path d="M30 30 H750 V456 H478 V337 H30 Z" />
          </g>

          {/* ---- Vanos: abren el muro ---- */}
          <g style={{ pointerEvents: "none" }}>
            {VANOS.map((v, i) => (
              <rect key={i} x={v.x} y={v.y} width={v.w} height={v.h} fill="#fff" />
            ))}
            {/* Sala, comedor, cocina y corredor son un solo espacio: bordes punteados */}
            {BORDES_ABIERTOS.map((b, i) => (
              <g key={i}>
                <line
                  x1={b.x1}
                  y1={b.y1}
                  x2={b.x2}
                  y2={b.y2}
                  stroke={INK}
                  strokeWidth="1.2"
                  strokeDasharray="6 6"
                  opacity="0.28"
                />
                {b.nota && (
                  <text x={b.x1 + 6} y={b.y1 + 15} fontSize="10" fill={INK} opacity="0.45">
                    {b.nota}
                  </text>
                )}
              </g>
            ))}

            {/* Barra americana: lo único que separa la cocina de la entrada */}
            <rect
              x={BARRA.x}
              y={BARRA.y}
              width={BARRA.w}
              height={BARRA.h}
              fill={INK}
              fillOpacity="0.1"
              stroke={INK}
              strokeWidth="2"
            />
            {/* Pata metálica del extremo libre, del lado de la puerta */}
            <circle cx={BARRA.x + BARRA.w - 7} cy={BARRA.y + BARRA.h / 2} r="4" fill={INK} opacity="0.55" />
            <text
              x={BARRA.x + BARRA.w / 2}
              y={BARRA.y + BARRA.h + 16}
              textAnchor="middle"
              fontSize="10"
              fill={INK}
              opacity="0.5"
            >
              barra americana
            </text>
            {/* Arcos de puerta */}
            <g fill="none" stroke={INK} strokeWidth="1" opacity="0.3">
              <path d="M185 222 A52 52 0 0 1 237 274" />
              <path d="M520 222 A52 52 0 0 1 572 274" />
              <path d="M745 148 A50 50 0 0 0 695 198" />
            </g>
            {/* Salida al balcón: puerta corrediza, dos hojas encimadas */}
            <line x1="137" y1="162" x2="137" y2="190" stroke={INK} strokeWidth="1.6" opacity="0.55" />
            <line x1="141" y1="186" x2="141" y2="214" stroke={INK} strokeWidth="1.6" opacity="0.55" />

            {/* La entrada es sólo el comienzo del corredor, no un espacio aparte */}
            <text x="700" y="212" textAnchor="middle" fontSize="10" letterSpacing="1.4" fill={INK} opacity="0.45">
              ENTRADA
            </text>

            {/* La puerta del cuarto útil abre hacia el corredor del edificio */}
            <path d="M755 372 A48 48 0 0 1 803 420" fill="none" stroke={CLAY} strokeWidth="1.6" />
          </g>

          {/* ---- Intervenciones ---- */}
          <g style={{ pointerEvents: "none" }}>
            {/* 1 · Balcón: baranda a repintar, en el borde exterior */}
            <line x1="34" y1="34" x2="34" y2="333" stroke={CLAY} strokeWidth="4" />
            <line x1="41" y1="34" x2="41" y2="333" stroke={CLAY} strokeWidth="1" opacity="0.6" />

            {/* 2 · Cocina: el mesón del horno (mortero) y el gabinete que se repara */}
            <rect x="530" y="34" width="120" height="26" fill={CLAY} opacity="0.18" stroke={CLAY} strokeWidth="1.6" />
            <rect x="530" y="34" width="120" height="26" fill="none" stroke={CLAY} strokeWidth="1.6" />
            <line x1="560" y1="34" x2="560" y2="60" stroke={CLAY} strokeWidth="1" opacity="0.6" />
            <line x1="590" y1="34" x2="590" y2="60" stroke={CLAY} strokeWidth="1" opacity="0.6" />
            <line x1="620" y1="34" x2="620" y2="60" stroke={CLAY} strokeWidth="1" opacity="0.6" />

            {/* 5 · Lavamanos con mueble en el baño social */}
            <rect x="366" y="300" width="44" height="14" fill="none" stroke={CLAY} strokeWidth="1.6" />
            <ellipse cx="388" cy="307" rx="12" ry="5" fill="none" stroke={CLAY} strokeWidth="1.3" />

            {/* 3 · Muro del corredor con apliques dirigidos (pendiente de cotizar) */}
            <line x1="365" y1="220" x2="472" y2="220" stroke={CLAY} strokeWidth="5.5" />
            <circle cx="392" cy="203" r="4.5" fill={CLAY} />
            <circle cx="445" cy="203" r="4.5" fill={CLAY} />
            <path d="M392 208 L386 217M392 208 L398 217" stroke={CLAY} strokeWidth="1.2" />
            <path d="M445 208 L439 217M445 208 L451 217" stroke={CLAY} strokeWidth="1.2" />

            {/* 4 · Aire acondicionado sobre el muro exterior de la habitación */}
            <rect x="250" y="327" width="70" height="11" fill={CLAY} opacity="0.85" />
            <path d="M262 322 q6 -7 12 0 M286 322 q6 -7 12 0" fill="none" stroke={CLAY} strokeWidth="1.4" />

            {/* 6 · El muro vuelve a su posición original y el estudio recupera esa franja */}
            <rect
              x="480"
              y={MURO_ACTUAL_Y + 2}
              width="268"
              height={MURO_ORIGINAL_Y - MURO_ACTUAL_Y - 4}
              fill={CLAY}
              opacity="0.09"
            />
            <text
              x="614"
              y={(MURO_ACTUAL_Y + MURO_ORIGINAL_Y) / 2 + 4}
              textAnchor="middle"
              fontSize="10.5"
              fill={CLAY}
              letterSpacing="0.3"
            >
              ← área que recupera el estudio →
            </text>
            {/* Muro actual: se demuele */}
            <rect x="478" y={MURO_ACTUAL_Y - 6} width="272" height="12" fill="url(#demolicion)" />
            <rect
              x="478"
              y={MURO_ACTUAL_Y - 6}
              width="272"
              height="12"
              fill="none"
              stroke={CLAY}
              strokeWidth="1.5"
            />
            {/* Muro nuevo, en la posición original */}
            <rect x="478" y={MURO_ORIGINAL_Y - 5} width="272" height="11" fill={CLAY} />

            {/* 7 · Servicios que se retiran: cocineta, baño y ducha (pendiente de cotizar) */}
            <g stroke={CLAY} strokeWidth="1.5" strokeDasharray="4 3" fill="none">
              <rect x="662" y="386" width="80" height="62" />
            </g>
            <g stroke={CLAY} strokeWidth="1.3" fill="none" opacity="0.85">
              {/* sanitario */}
              <rect x="670" y="392" width="14" height="20" rx="6" />
              {/* ducha */}
              <rect x="700" y="418" width="34" height="24" />
              <path d="M700 418 L734 442M734 418 L700 442" strokeWidth="0.9" opacity="0.5" />
            </g>
            {/* cocineta */}
            <rect x="488" y="432" width="84" height="16" fill="none" stroke={CLAY} strokeWidth="1.5" strokeDasharray="4 3" />
            <circle cx="512" cy="440" r="5" fill="none" stroke={CLAY} strokeWidth="1.2" />

            {/* 7 · Baldosa resistente y estantería con rieles en el cuarto útil final */}
            <rect
              x="486"
              y={MURO_ORIGINAL_Y + 8}
              width="256"
              height={448 - MURO_ORIGINAL_Y - 8}
              fill="url(#enchape)"
              opacity="0.55"
            />
            <rect x="486" y="388" width="16" height="52" fill={PAPER} stroke={CLAY} strokeWidth="2.2" />
            <line x1="486" y1="405" x2="502" y2="405" stroke={CLAY} strokeWidth="1.3" />
            <line x1="486" y1="422" x2="502" y2="422" stroke={CLAY} strokeWidth="1.3" />
          </g>

          {/* ---- Marcas numeradas ---- */}
          {MARCAS.map((m) => (
            <g
              key={m.n}
              className="plano-zona"
              role="link"
              tabIndex={0}
              aria-label={m.titulo}
              onClick={() => ir(m.slug)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  ir(m.slug);
                }
              }}
            >
              <title>{m.titulo}</title>
              <circle cx={m.x} cy={m.y} r="14" fill={CLAY} />
              <circle cx={m.x} cy={m.y} r="14" fill="none" stroke={PAPER} strokeWidth="3" />
              <text
                x={m.x}
                y={m.y + 5}
                textAnchor="middle"
                fontSize="13"
                fontWeight="700"
                fill="#fff"
                style={{ pointerEvents: "none" }}
              >
                {m.n}
              </text>
            </g>
          ))}

        </svg>
      </div>

      {/* Fuera del SVG: en el celular estas dos líneas quedarían fuera de vista */}
      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1.5">
          <p className="flex items-start gap-2 text-[12px] leading-snug text-moss">
            <span aria-hidden className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-moss" />
            Sala, comedor, cocina y corredor son un solo espacio abierto: entre ellos no hay muros
            ni puertas, sólo la barra americana junto a la entrada.
          </p>
          <p className="flex items-start gap-2 text-[12px] leading-snug text-moss">
            <span aria-hidden className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-moss" />
            El cuarto útil no se comunica con el apartamento: se entra por el corredor del edificio.
          </p>
        </div>
        <p className="shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
          Esquema · no a escala
        </p>
      </div>

      <p className="no-print mt-2 text-[11.5px] text-muted md:hidden">
        Deslice el plano en horizontal para verlo completo →
      </p>

      {conLeyenda && (
        <ol className="mt-7 grid gap-x-8 gap-y-1 border-t border-line pt-5 sm:grid-cols-2">
          {MARCAS.map((m) => (
            <li key={m.n}>
              <button
                onClick={() => ir(m.slug)}
                className="group flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left transition-colors hover:bg-clayfaint"
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-clay text-[12px] font-bold text-white">
                  {m.n}
                </span>
                <span className="shrink-0 text-clay">
                  <Icono nombre={m.icono} className="h-[18px] w-[18px]" />
                </span>
                <span className="text-[13.5px] leading-snug text-muted transition-colors group-hover:text-ink">
                  {m.titulo}
                </span>
              </button>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
