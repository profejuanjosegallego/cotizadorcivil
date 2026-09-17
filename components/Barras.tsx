import type { Avance, PagoEspacio } from "@/lib/avance";
import { formatCOP } from "@/lib/format";

/**
 * Las dos barras de un espacio: avance de obra (terminado sobre todos los
 * trabajos, cotizados o no) y pago (pagado sobre lo cotizado).
 * `compacto` es la versión para tarjetas: sin cifras, sólo barra y porcentaje;
 * `fila` pone las dos barras una al lado de la otra cuando hay ancho.
 */
export default function Barras({
  avance,
  pago,
  compacto = false,
  fila = false,
}: {
  avance: Avance;
  pago: PagoEspacio;
  compacto?: boolean;
  fila?: boolean;
}) {
  const sinCotizar = pago.cotizado === 0;
  const layout = compacto
    ? fila
      ? "grid gap-x-8 gap-y-2 sm:grid-cols-2"
      : "space-y-2"
    : "grid gap-4 sm:grid-cols-2 sm:gap-5";
  return (
    <div className={layout}>
      <Barra
        etiqueta="Avance"
        porcentaje={avance.porcentaje}
        color="bg-moss"
        detalle={
          compacto
            ? undefined
            : `${avance.terminados} de ${avance.trabajos} trabajo${
                avance.trabajos === 1 ? "" : "s"
              }${avance.porCotizar > 0 ? ` · ${avance.porCotizar} sin cotizar` : ""}`
        }
        compacto={compacto}
      />
      <Barra
        etiqueta="Pagado"
        porcentaje={pago.porcentaje}
        color="bg-clay"
        texto={sinCotizar ? "Sin cotizar" : pago.completo ? "Pagado ✓" : undefined}
        detalle={
          compacto || sinCotizar
            ? undefined
            : `${formatCOP(pago.pagado)} de ${formatCOP(pago.cotizado)}`
        }
        compacto={compacto}
      />
    </div>
  );
}

function Barra({
  etiqueta,
  porcentaje,
  color,
  texto,
  detalle,
  compacto,
}: {
  etiqueta: string;
  porcentaje: number;
  color: string;
  texto?: string;
  detalle?: string;
  compacto: boolean;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="eyebrow">{etiqueta}</span>
        <span
          className={`font-mono font-semibold tracking-tight ${
            compacto ? "text-[11.5px]" : "text-[15px]"
          } ${texto === "Sin cotizar" ? "font-normal text-muted" : ""}`}
        >
          {texto ?? `${porcentaje}%`}
        </span>
      </div>
      <div className={`${compacto ? "mt-1 h-1" : "mt-1.5 h-1.5"} overflow-hidden rounded-full bg-line`}>
        <div className={`h-full rounded-full ${color}`} style={{ width: `${porcentaje}%` }} />
      </div>
      {detalle && <p className="mt-1.5 text-[11.5px] leading-snug text-muted">{detalle}</p>}
    </div>
  );
}
