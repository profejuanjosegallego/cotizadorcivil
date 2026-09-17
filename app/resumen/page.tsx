import Link from "next/link";
import Imprimir from "@/components/Imprimir";
import Icono from "@/components/Iconos";
import CotizacionesEspacio from "@/components/CotizacionesEspacio";
import { ESPACIOS } from "@/lib/obra";
import {
  COTIZACIONES,
  PAGOS,
  TODAS_LAS_LINEAS,
  TOTAL_ACORDADO,
  TOTAL_COTIZADO,
  TOTAL_PAGADO,
  TOTAL_REDONDEOS,
  cotizacionesDeEspacio,
  getCotizacion,
  lineasDeEspacio,
  totalLinea,
} from "@/lib/cotizaciones";
import { leerSeguimiento } from "@/lib/mongodb";
import {
  ESTADO_LABEL,
  formatCOP,
  formatDiferencia,
  formatFechaCorta,
  formatNum,
} from "@/lib/format";

export const dynamic = "force-dynamic";

export const metadata = { title: "Cuentas de la obra — Remodelación Apto" };

const COLOR_ESTADO: Record<string, string> = {
  pendiente: "text-muted",
  en_proceso: "text-clay",
  terminado: "text-moss",
};

export default async function ResumenPage() {
  const seguimiento = await leerSeguimiento();

  const diferencia = TOTAL_PAGADO - TOTAL_ACORDADO;
  const terminadas = TODAS_LAS_LINEAS.filter(
    (l) => seguimiento[l.id]?.estado === "terminado",
  ).length;
  // El avance se mide sobre toda la obra: lo cotizado más lo que falta por
  // cotizar. Si no, con todo lo cotizado terminado daría 100 % y no es cierto.
  const porCotizar = ESPACIOS.reduce((a, e) => a + (e.pendientes?.length ?? 0), 0);
  const totalTrabajos = TODAS_LAS_LINEAS.length + porCotizar;
  const avance = Math.round((terminadas / totalTrabajos) * 100);

  const porEspacio = ESPACIOS.map((e) => {
    const lineas = lineasDeEspacio(e.slug);
    return {
      espacio: e,
      lineas,
      cotizaciones: cotizacionesDeEspacio(e.slug),
      subtotal: lineas.reduce((a, l) => a + totalLinea(l), 0),
    };
  });
  const pendientes = ESPACIOS.filter((e) => (e.pendientes?.length ?? 0) > 0);

  const ultima = Object.values(seguimiento)
    .map((s) => s.actualizado)
    .filter(Boolean)
    .sort()
    .pop();

  return (
    <main className="mx-auto max-w-content px-5 pb-20 pt-8 sm:px-8 sm:pt-10">
      <Link
        href="/"
        className="no-print inline-flex items-center gap-1.5 text-[13px] text-muted transition-colors hover:text-ink"
      >
        <span aria-hidden>←</span> Inicio
      </Link>

      <header className="mt-6 border-b border-line pb-7 sm:mt-8 sm:pb-8">
        <p className="eyebrow">Cotizaciones y pagos</p>
        <h1 className="mt-3 text-[30px] font-semibold leading-tight tracking-[-0.025em] sm:text-[44px]">
          Cuentas de la obra
        </h1>
        <p className="mt-3 text-[13.5px] leading-relaxed text-muted sm:text-[14px]">
          Edificio Belo Horizonte · {COTIZACIONES.length} cotizaciones de Óscar
          · {PAGOS.length} pagos
          {ultima && (
            <>
              {" · "}
              Último avance registrado{" "}
              {new Date(ultima).toLocaleDateString("es-CO", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </>
          )}
        </p>
        <div className="mt-5">
          <Imprimir />
        </div>
      </header>

      {/* ---------- Indicadores ---------- */}
      <section className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:grid-cols-4 sm:gap-4">
        <div className="card p-4 sm:p-5">
          <p className="eyebrow">Cotizado</p>
          <p className="mt-2 font-mono text-[20px] font-semibold tracking-tight sm:text-[24px]">
            {formatCOP(TOTAL_COTIZADO)}
          </p>
        </div>
        <div className="card p-4 sm:p-5">
          <p className="eyebrow">Pagado</p>
          <p className="mt-2 font-mono text-[20px] font-semibold tracking-tight sm:text-[24px]">
            {formatCOP(TOTAL_PAGADO)}
          </p>
        </div>
        <div className="card p-4 sm:p-5">
          <p className="eyebrow">
            {diferencia > 0
              ? "Pagado de más"
              : diferencia < 0
                ? "Por pagar"
                : "Saldo"}
          </p>
          <p
            className={`mt-2 font-mono text-[20px] font-semibold tracking-tight sm:text-[24px] ${
              diferencia === 0 ? "text-moss" : "text-clay"
            }`}
          >
            {diferencia === 0 ? "Cuadra ✓" : formatDiferencia(diferencia)}
          </p>
          {TOTAL_REDONDEOS > 0 && (
            <p className="mt-1.5 text-[11.5px] leading-snug text-muted">
              Incluye {formatCOP(TOTAL_REDONDEOS)} de redondeos acordados.
            </p>
          )}
        </div>
        <div className="card p-4 sm:p-5">
          <p className="eyebrow">Avance de obra</p>
          <p className="mt-2 font-mono text-[20px] font-semibold tracking-tight sm:text-[24px]">
            {avance}%
          </p>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-line">
            <div
              className="h-full rounded-full bg-moss"
              style={{ width: `${avance}%` }}
            />
          </div>
          <p className="mt-1.5 text-[11.5px] leading-snug text-muted">
            {terminadas} de {totalTrabajos} trabajos · {porCotizar} sin cotizar
          </p>
        </div>
      </section>

      {/* ---------- Detalle por espacio ---------- */}
      <section className="mt-14 space-y-10 sm:mt-16 sm:space-y-12">
        <div>
          <p className="eyebrow">Espacio por espacio</p>
          <h2 className="mt-2.5 text-[21px] font-semibold tracking-tight sm:text-[22px]">
            Las líneas cotizadas, dónde van y cómo van
          </h2>
          <p className="mt-2.5 max-w-2xl text-[13px] leading-relaxed text-muted">
            En cada espacio están las cotizaciones que envió Óscar y los
            comprobantes de las transferencias con que se pagaron: se pueden
            abrir o descargar.
          </p>
        </div>

        {porEspacio.map(({ espacio, lineas, cotizaciones, subtotal }, idx) => (
          <article
            key={espacio.slug}
            className="print-break overflow-hidden rounded-2xl border border-ink/20 bg-white"
          >
            {/* Cabecera del espacio */}
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-line bg-paper px-4 py-4 sm:px-6">
              <h3 className="flex items-center gap-3 text-[18px] font-semibold tracking-tight sm:text-[20px]">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-clay text-white">
                  <Icono nombre={espacio.icono} className="h-[18px] w-[18px]" />
                </span>
                <span>
                  <span className="mr-2 font-mono text-[11px] font-normal text-muted">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  {espacio.nombre}
                </span>
                <Link
                  href={`/espacios/${espacio.slug}`}
                  className="no-print text-[12.5px] font-normal text-muted underline decoration-line underline-offset-4 transition-colors hover:text-clay"
                >
                  ver ficha
                </Link>
              </h3>
              {lineas.length > 0 ? (
                <span className="font-mono text-[12px] text-muted">
                  {lineas.length} línea{lineas.length === 1 ? "" : "s"} ·{" "}
                  {cotizaciones.length} cotizaci
                  {cotizaciones.length === 1 ? "ón" : "ones"}
                </span>
              ) : (
                <span className="rounded-full border border-clay/40 px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-wider text-clay">
                  Pendiente de cotizar
                </span>
              )}
            </div>

            <div className="px-4 pb-2 pt-4 sm:px-6">
              {cotizaciones.length > 0 && (
                <div className="no-print mb-2">
                  <p className="eyebrow mb-2">Soportes: cotizaciones y pagos</p>
                  <CotizacionesEspacio
                    cotizaciones={cotizaciones}
                    slug={espacio.slug}
                  />
                </div>
              )}

              {lineas.length === 0 && espacio.pendientes && (
                <ul className="space-y-1.5 pb-3 text-[13px] text-muted">
                  {espacio.pendientes.map((p, i) => (
                    <li key={i} className="flex gap-2">
                      <span aria-hidden>·</span>
                      {p}
                    </li>
                  ))}
                </ul>
              )}

              {lineas.length > 0 && (
                <p className="eyebrow mt-5 sm:hidden">Líneas</p>
              )}

              {/* Móvil: una tarjeta por línea */}
              <ul className="divide-y divide-line sm:hidden">
                {lineas.map((l) => {
                  const s = seguimiento[l.id];
                  const estado = s?.estado ?? "pendiente";
                  return (
                    <li key={l.id} className="py-3.5">
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-[14px] font-medium leading-snug">
                          {l.descripcion}
                        </p>
                        <span className="shrink-0 font-mono text-[13.5px] font-semibold">
                          {formatCOP(totalLinea(l))}
                        </span>
                      </div>
                      <p className="mt-1.5 font-mono text-[11.5px] text-muted">
                        Cot. {l.cotizacion} · MO {formatCOP(l.manoObra)} · Mat.{" "}
                        {formatCOP(l.materiales)}
                        <span
                          className={`ml-2 uppercase tracking-wider ${COLOR_ESTADO[estado]}`}
                        >
                          {ESTADO_LABEL[estado]}
                        </span>
                      </p>
                      {(l.nota || s?.notas) && (
                        <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted">
                          {s?.notas || l.nota}
                        </p>
                      )}
                    </li>
                  );
                })}
              </ul>

              {/* Escritorio e impresión: tabla */}
              {lineas.length > 0 && (
                <table className="mt-4 hidden w-full border-collapse text-left sm:table">
                  <thead>
                    <tr className="text-muted">
                      <th className="py-3 pr-4 font-mono text-[10.5px] font-normal uppercase tracking-[0.14em]">
                        Descripción
                      </th>
                      <th className="w-24 py-3 pr-4 font-mono text-[10.5px] font-normal uppercase tracking-[0.14em]">
                        Cot.
                      </th>
                      <th className="w-28 py-3 pr-4 text-right font-mono text-[10.5px] font-normal uppercase tracking-[0.14em]">
                        Cant. × V.U.
                      </th>
                      <th className="w-32 py-3 pr-4 text-right font-mono text-[10.5px] font-normal uppercase tracking-[0.14em]">
                        Mano de obra
                      </th>
                      <th className="w-32 py-3 pr-4 text-right font-mono text-[10.5px] font-normal uppercase tracking-[0.14em]">
                        Materiales
                      </th>
                      <th className="w-36 py-3 text-right font-mono text-[10.5px] font-normal uppercase tracking-[0.14em]">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {lineas.map((l) => {
                      const s = seguimiento[l.id];
                      const estado = s?.estado ?? "pendiente";
                      return (
                        <tr
                          key={l.id}
                          className="border-t border-line align-top"
                        >
                          <td className="py-3 pr-4">
                            <span className="text-[14px] leading-snug">
                              {l.descripcion}
                            </span>
                            <span
                              className={`ml-2 font-mono text-[10.5px] uppercase tracking-wider ${COLOR_ESTADO[estado]}`}
                            >
                              {ESTADO_LABEL[estado]}
                            </span>
                            {l.nota && (
                              <p className="mt-1.5 max-w-xl text-[12.5px] leading-relaxed text-clay">
                                {l.nota}
                              </p>
                            )}
                            {s?.notas && (
                              <p className="mt-1.5 max-w-xl text-[12.5px] leading-relaxed text-muted">
                                {s.notas}
                              </p>
                            )}
                          </td>
                          <td className="whitespace-nowrap py-3 pr-4 font-mono text-[12.5px] text-muted">
                            {l.cotizacion} ·{" "}
                            {formatFechaCorta(
                              getCotizacion(l.cotizacion)!.fecha,
                            )}
                          </td>
                          <td className="py-3 pr-4 text-right font-mono text-[12.5px] text-muted">
                            {l.cantidad !== undefined &&
                            l.valorUnitario !== undefined
                              ? `${formatNum(l.cantidad)} × ${formatCOP(l.valorUnitario)}`
                              : "—"}
                          </td>
                          <td className="py-3 pr-4 text-right font-mono text-[13.5px]">
                            {l.manoObra ? formatCOP(l.manoObra) : "—"}
                          </td>
                          <td className="py-3 pr-4 text-right font-mono text-[13.5px]">
                            {l.materiales ? formatCOP(l.materiales) : "—"}
                          </td>
                          <td className="py-3 text-right font-mono text-[13.5px] font-medium">
                            {formatCOP(totalLinea(l))}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>

            {lineas.length > 0 && (
              <div className="flex items-baseline justify-between gap-3 border-t border-ink/20 bg-paper px-4 py-3.5 sm:px-6">
                <span className="eyebrow">Subtotal · {espacio.nombre}</span>
                <span className="font-mono text-[17px] font-semibold tracking-tight">
                  {formatCOP(subtotal)}
                </span>
              </div>
            )}
          </article>
        ))}
      </section>

      {/* ---------- Total ---------- */}
      <section className="mt-12 rounded-xl border-2 border-ink px-5 py-6 sm:mt-14 sm:px-6 sm:py-7">
        <div className="grid gap-5 sm:grid-cols-3 sm:items-end">
          <div>
            <p className="eyebrow">Total cotizado</p>
            <p className="mt-1.5 font-mono text-[26px] font-semibold tracking-tight sm:text-[30px]">
              {formatCOP(TOTAL_COTIZADO)}
            </p>
          </div>
          <div>
            <p className="eyebrow">Total pagado</p>
            <p className="mt-1.5 font-mono text-[26px] font-semibold tracking-tight sm:text-[30px]">
              {formatCOP(TOTAL_PAGADO)}
            </p>
          </div>
          <div>
            <p className="eyebrow">
              {diferencia > 0
                ? "Pagado de más"
                : diferencia < 0
                  ? "Por pagar"
                  : "Saldo"}
            </p>
            <p
              className={`mt-1.5 font-mono text-[26px] font-semibold tracking-tight sm:text-[30px] ${
                diferencia === 0 ? "text-moss" : "text-clay"
              }`}
            >
              {diferencia === 0 ? "Cuadra ✓" : formatDiferencia(diferencia)}
            </p>
          </div>
        </div>
        {TOTAL_REDONDEOS > 0 && (
          <p className="mt-4 text-[13px] leading-relaxed text-muted">
            Lo pagado incluye {formatCOP(TOTAL_REDONDEOS)} de redondeos
            acordados al pagar; por eso cuadra aunque sea mayor que lo cotizado.
          </p>
        )}
        {pendientes.length > 0 && (
          <p className="mt-5 border-t border-line pt-4 text-[13px] leading-relaxed text-muted">
            Falta por cotizar:{" "}
            {pendientes.map((e) => e.nombre.toLowerCase()).join(", ")} ({porCotizar}{" "}
            trabajos). Esos valores no están en el total.
          </p>
        )}
      </section>

      <p className="mt-6 text-[12.5px] leading-relaxed text-muted">
        Los valores son los de las cotizaciones de Óscar, transcritos tal cual;
        los pagos, los de los comprobantes de transferencia. Los redondeos al
        pagar están anotados en cada cuenta. La acometida de 220 V del aire se
        acordó al instalar y no aparece en la cotización escrita: está sumada
        como una línea más.
      </p>
    </main>
  );
}
