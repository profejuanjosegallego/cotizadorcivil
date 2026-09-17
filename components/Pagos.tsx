import Image from "next/image";
import type { Cotizacion, Pago } from "@/lib/cotizaciones";
import { totalCotizacion } from "@/lib/cotizaciones";
import { formatCOP, formatFechaMedia, formatHora } from "@/lib/format";

function nombreArchivo(prefijo: string, numero: number, fecha: string, archivo: string) {
  const ext = archivo.split(".").pop();
  return `${prefijo}-${numero}-${fecha.slice(0, 10)}.${ext}`;
}

/** Un comprobante de transferencia, con miniatura y descarga. */
export function TarjetaPago({ pago }: { pago: Pago }) {
  const hora = formatHora(pago.fecha);
  return (
    <li className="card flex gap-4 p-4 print-break">
      <a
        href={pago.archivo}
        target="_blank"
        rel="noopener"
        className="relative block h-24 w-[52px] shrink-0 overflow-hidden rounded-md border border-line bg-paper"
        aria-label={`Abrir el comprobante del pago ${pago.numero}`}
      >
        <Image
          src={pago.archivo}
          alt={`Comprobante del pago ${pago.numero}`}
          fill
          sizes="52px"
          className="object-cover object-top"
        />
      </a>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[14.5px] font-semibold tracking-tight">Pago {pago.numero}</p>
            <p className="mt-0.5 text-[12.5px] text-muted">
              {formatFechaMedia(pago.fecha)}
              {hora && ` · ${hora}`}
            </p>
          </div>
          <span className="shrink-0 font-mono text-[15px] font-semibold tracking-tight">
            {formatCOP(pago.valor)}
          </span>
        </div>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-muted">
          Comprobante {pago.comprobante} · {pago.destino}
        </p>
        {pago.nota && (
          <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted">{pago.nota}</p>
        )}
        <a
          href={pago.archivo}
          download={nombreArchivo("pago", pago.numero, pago.fecha, pago.archivo)}
          className="no-print mt-3 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-clay underline decoration-clay/30 underline-offset-4 transition-colors hover:decoration-clay"
        >
          Descargar comprobante <span aria-hidden>↓</span>
        </a>
      </div>
    </li>
  );
}

export function ListaPagos({ pagos, columnas = 2 }: { pagos: Pago[]; columnas?: 1 | 2 }) {
  return (
    <ul className={`grid gap-3 ${columnas === 2 ? "sm:grid-cols-2" : ""}`}>
      {pagos.map((p) => (
        <TarjetaPago key={p.numero} pago={p} />
      ))}
    </ul>
  );
}

/** Una cotización de Óscar como documento: fecha, total y la imagen descargable. */
export function TarjetaCotizacion({ cotizacion }: { cotizacion: Cotizacion }) {
  return (
    <li className="card flex gap-4 p-4 print-break">
      <a
        href={cotizacion.archivo}
        target="_blank"
        rel="noopener"
        className="relative block h-24 w-[52px] shrink-0 overflow-hidden rounded-md border border-line bg-paper"
        aria-label={`Abrir la cotización ${cotizacion.numero}`}
      >
        <Image
          src={cotizacion.archivo}
          alt={`Cotización ${cotizacion.numero}`}
          fill
          sizes="52px"
          className="object-cover object-left-top"
        />
      </a>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[14.5px] font-semibold tracking-tight">
              Cotización {cotizacion.numero}
              <span className="font-normal text-muted"> · {cotizacion.servicio}</span>
            </p>
            <p className="mt-0.5 text-[12.5px] text-muted">{formatFechaMedia(cotizacion.fecha)}</p>
          </div>
          <span className="shrink-0 font-mono text-[15px] font-semibold tracking-tight">
            {formatCOP(totalCotizacion(cotizacion))}
          </span>
        </div>
        {cotizacion.nota && (
          <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted">{cotizacion.nota}</p>
        )}
        <a
          href={cotizacion.archivo}
          download={nombreArchivo(
            "cotizacion",
            cotizacion.numero,
            cotizacion.fecha,
            cotizacion.archivo
          )}
          className="no-print mt-3 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-clay underline decoration-clay/30 underline-offset-4 transition-colors hover:decoration-clay"
        >
          Descargar cotización <span aria-hidden>↓</span>
        </a>
      </div>
    </li>
  );
}
