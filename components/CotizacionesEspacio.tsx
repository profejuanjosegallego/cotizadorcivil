import Image from "next/image";
import type { Cotizacion } from "@/lib/cotizaciones";
import {
  acordadoCuenta,
  cuentaDeCotizacion,
  getPago,
  pagadoCuenta,
  totalCotizacion,
} from "@/lib/cotizaciones";
import { formatCOP, formatDiferencia, formatFechaMedia } from "@/lib/format";

/** Nombre con que se descarga el archivo: pago-5-2026-09-10.jpeg */
function nombreArchivo(prefijo: string, numero: number, fecha: string, archivo: string) {
  const ext = archivo.split(".").pop();
  return `${prefijo}-${numero}-${fecha.slice(0, 10)}.${ext}`;
}

/**
 * Las cotizaciones de un espacio con sus pagos en la misma fila: qué se cotizó,
 * cuándo, con qué transferencias se pagó y si cuadra. Va en la cabecera de la
 * ficha, no como sección aparte.
 */
export default function CotizacionesEspacio({
  cotizaciones,
  slug,
}: {
  cotizaciones: Cotizacion[];
  slug: string;
}) {
  return (
    <ul className="card divide-y divide-line">
      {cotizaciones.map((c) => {
        const cuenta = cuentaDeCotizacion(c.numero);
        const pagos = cuenta?.pagos.map((n) => getPago(n)!) ?? [];
        const dif = cuenta ? pagadoCuenta(cuenta) - acordadoCuenta(cuenta) : 0;
        const compartida = c.lineas.some((l) => l.espacio !== slug);
        const conjunta = cuenta && cuenta.cotizaciones.length > 1;
        const otras = cuenta?.cotizaciones.filter((n) => n !== c.numero) ?? [];

        return (
          <li key={c.numero} className="flex gap-3.5 px-4 py-3.5 sm:px-5">
            <a
              href={c.archivo}
              target="_blank"
              rel="noopener"
              className="relative block h-14 w-10 shrink-0 overflow-hidden rounded border border-line bg-paper"
              aria-label={`Abrir la cotización ${c.numero}`}
            >
              <Image
                src={c.archivo}
                alt={`Cotización ${c.numero}`}
                fill
                sizes="40px"
                className="object-cover object-left-top"
              />
            </a>

            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-[14px] font-semibold tracking-tight">
                  Cotización {c.numero}
                  <span className="font-normal text-muted"> · {formatFechaMedia(c.fecha)}</span>
                </p>
                <span className="shrink-0 font-mono text-[14px] font-semibold">
                  {formatCOP(totalCotizacion(c))}
                </span>
              </div>
              <p className="mt-0.5 text-[12.5px] text-muted">
                {c.servicio}
                {compartida && " · incluye trabajos de otros espacios"}
                {" · "}
                <a
                  href={c.archivo}
                  download={nombreArchivo("cotizacion", c.numero, c.fecha, c.archivo)}
                  className="no-print text-clay underline decoration-clay/30 underline-offset-4 hover:decoration-clay"
                >
                  descargar ↓
                </a>
              </p>

              {pagos.length > 0 && (
                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[12.5px]">
                  <span className="eyebrow">Pagada con</span>
                  {pagos.map((p) => (
                    <a
                      key={p.numero}
                      href={p.archivo}
                      download={nombreArchivo("pago", p.numero, p.fecha, p.archivo)}
                      title={`Comprobante ${p.comprobante} · ${p.destino}. Toque para descargar.`}
                      className="inline-flex items-center gap-1.5 rounded-md border border-line bg-paper px-2 py-1 font-mono text-[11.5px] transition-colors hover:border-clay hover:text-clay"
                    >
                      Pago {p.numero}
                      <span className="text-muted">· {formatFechaMedia(p.fecha).slice(0, -5)}</span>
                      <span className="font-semibold">{formatCOP(p.valor)}</span>
                      <span aria-hidden className="no-print text-clay">↓</span>
                    </a>
                  ))}
                  <span
                    className={`font-mono text-[11px] uppercase tracking-wider ${
                      dif === 0 ? "text-moss" : "text-clay"
                    }`}
                  >
                    {dif === 0 ? "Cuadra ✓" : formatDiferencia(dif)}
                  </span>
                </div>
              )}

              {conjunta && (
                <p className="mt-1.5 text-[12px] leading-relaxed text-muted">
                  Se pagó junto con {otras.length > 1 ? "las cotizaciones" : "la cotización"}{" "}
                  {otras.length > 1 ? `${otras.slice(0, -1).join(", ")} y ${otras.at(-1)}` : otras[0]}
                  {cuenta.nota && `: ${cuenta.nota}`}
                </p>
              )}
              {!conjunta && cuenta?.nota && (
                <p className="mt-1.5 text-[12px] leading-relaxed text-muted">{cuenta.nota}</p>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
