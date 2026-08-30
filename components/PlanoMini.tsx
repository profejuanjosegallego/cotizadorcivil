import { CLAY, INK, PAPER, VANOS, VIEWBOX, ZONAS } from "@/lib/plano";

/**
 * Versión estática del plano con un espacio resaltado. Va en la cabecera de
 * cada ficha para que se ubique de inmediato de qué zona se habla.
 * `slug = "general"` resalta todo el apartamento.
 */
export default function PlanoMini({ slug }: { slug: string }) {
  const todo = slug === "general";

  return (
    <svg
      viewBox={VIEWBOX}
      className="h-auto w-full"
      role="img"
      aria-label="Ubicación del espacio en el plano del apartamento"
    >
      {todo && <path d="M30 30 H750 V456 H478 V337 H30 Z" fill="#F6EDE7" />}

      {ZONAS.map((z) => {
        const activa = !todo && z.slug === slug;
        return (
          <g key={z.label + z.x}>
            <rect
              x={z.x}
              y={z.y}
              width={z.w}
              height={z.h}
              fill={activa ? CLAY : "transparent"}
              opacity={activa ? 0.16 : 1}
            />
            <rect
              x={z.x}
              y={z.y}
              width={z.w}
              height={z.h}
              fill="none"
              stroke={activa ? CLAY : INK}
              strokeWidth={activa ? 4 : 1.5}
              opacity={activa || todo ? 1 : 0.32}
            />
            {(activa || todo) && (
              <>
                <text
                  x={z.x + z.w / 2}
                  y={z.y + z.h / 2 + (z.sub ? (todo ? -3 : -5) : (todo ? 7 : 9))}
                  textAnchor="middle"
                  fontSize={todo ? 20 : 26}
                  letterSpacing="1.6"
                  fontWeight="600"
                  fill={activa ? CLAY : INK}
                  opacity={todo && !activa ? 0.55 : 1}
                >
                  {z.label}
                </text>
                {z.sub && (
                  <text
                    x={z.x + z.w / 2}
                    y={z.y + z.h / 2 + (todo ? 17 : 22)}
                    textAnchor="middle"
                    fontSize={todo ? 20 : 26}
                    letterSpacing="1.6"
                    fontWeight="600"
                    fill={activa ? CLAY : INK}
                    opacity={todo && !activa ? 0.55 : 1}
                  >
                    {z.sub}
                  </text>
                )}
              </>
            )}
          </g>
        );
      })}

      <path
        d="M30 30 H750 V456 H478 V337 H30 Z"
        fill="none"
        stroke={todo ? CLAY : INK}
        strokeWidth="4"
      />

      {VANOS.map((v, i) => (
        <rect key={i} x={v.x} y={v.y} width={v.w} height={v.h} fill={PAPER} />
      ))}
    </svg>
  );
}
