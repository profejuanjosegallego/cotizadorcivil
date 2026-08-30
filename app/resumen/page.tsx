import Link from "next/link";
import Imprimir from "@/components/Imprimir";
import Icono from "@/components/Iconos";
import { ESPACIOS, UNIDAD_LABEL } from "@/lib/obra";
import { leerCotizaciones } from "@/lib/mongodb";
import { ESTADO_LABEL, formatCOP, formatNum, total } from "@/lib/format";

export const dynamic = "force-dynamic";

export const metadata = { title: "Cotización — Remodelación Apto" };

const COLOR_ESTADO: Record<string, string> = {
  pendiente: "text-muted",
  en_proceso: "text-clay",
  terminado: "text-moss",
};

export default async function ResumenPage() {
  const cotizaciones = await leerCotizaciones();

  const porEspacio = ESPACIOS.map((e) => {
    const filas = e.items.map((i) => {
      const c = cotizaciones[i.id];
      return {
        item: i,
        cantidad: c?.cantidad ?? null,
        valorUnitario: c?.valorUnitario ?? null,
        estado: c?.estado ?? "pendiente",
        notas: c?.notas ?? "",
        total: total(c?.cantidad ?? null, c?.valorUnitario ?? null),
      };
    });
    return { espacio: e, filas, subtotal: filas.reduce((a, f) => a + (f.total ?? 0), 0) };
  });

  const granTotal = porEspacio.reduce((a, g) => a + g.subtotal, 0);
  const totalItems = porEspacio.reduce((a, g) => a + g.filas.length, 0);
  const cotizados = porEspacio.reduce(
    (a, g) => a + g.filas.filter((f) => f.total !== null).length,
    0
  );
  const terminados = porEspacio.reduce(
    (a, g) => a + g.filas.filter((f) => f.estado === "terminado").length,
    0
  );
  const avance = Math.round((terminados / totalItems) * 100);

  const ultima = Object.values(cotizaciones)
    .map((c) => c.actualizado)
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
        <p className="eyebrow">Presupuesto consolidado</p>
        <h1 className="mt-3 text-[30px] font-semibold leading-tight tracking-[-0.025em] sm:text-[44px]">
          Cotización completa
        </h1>
        <p className="mt-3 text-[13.5px] leading-relaxed text-muted sm:text-[14px]">
          Edificio Belo Horizonte · {totalItems} ítems en {ESPACIOS.length} espacios
          {ultima && (
            <>
              {" · "}
              Última actualización{" "}
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
      <section className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-3 sm:gap-4">
        <div className="card p-5">
          <p className="eyebrow">Total cotizado</p>
          <p className="mt-2 font-mono text-[24px] font-semibold tracking-tight sm:text-[26px]">
            {formatCOP(granTotal || null)}
          </p>
        </div>
        <div className="card p-5">
          <p className="eyebrow">Ítems con precio</p>
          <p className="mt-2 font-mono text-[24px] font-semibold tracking-tight sm:text-[26px]">
            {cotizados}
            <span className="text-muted">/{totalItems}</span>
          </p>
        </div>
        <div className="card p-5">
          <p className="eyebrow">Avance de obra</p>
          <p className="mt-2 font-mono text-[24px] font-semibold tracking-tight sm:text-[26px]">
            {avance}%
          </p>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-line">
            <div className="h-full rounded-full bg-moss" style={{ width: `${avance}%` }} />
          </div>
        </div>
      </section>

      {/* ---------- Detalle por espacio ---------- */}
      <section className="mt-12 space-y-10 sm:mt-14 sm:space-y-12">
        {porEspacio.map(({ espacio, filas, subtotal }) => (
          <div key={espacio.slug} className="print-break">
            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-b border-ink/20 pb-3">
              <h2 className="flex items-center gap-2.5 text-[18px] font-semibold tracking-tight sm:text-[19px]">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-clayfaint text-clay">
                  <Icono nombre={espacio.icono} className="h-4 w-4" />
                </span>
                {espacio.nombre}
                <Link
                  href={`/espacios/${espacio.slug}`}
                  className="no-print text-[12.5px] font-normal text-muted underline decoration-line underline-offset-4 transition-colors hover:text-clay"
                >
                  editar
                </Link>
              </h2>
              <span className="font-mono text-[15px] font-semibold">
                {formatCOP(subtotal || null)}
              </span>
            </div>

            {/* Móvil: una tarjeta por ítem */}
            <ul className="divide-y divide-line sm:hidden">
              {filas.map((f) => (
                <li key={f.item.id} className="py-3.5">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-[14px] font-medium leading-snug">{f.item.titulo}</p>
                    <span className="shrink-0 font-mono text-[13.5px] font-semibold">
                      {formatCOP(f.total)}
                    </span>
                  </div>
                  <p className="mt-1.5 font-mono text-[11.5px] text-muted">
                    {formatNum(f.cantidad)} {UNIDAD_LABEL[f.item.unidad]} ×{" "}
                    {formatCOP(f.valorUnitario)}
                    <span className={`ml-2 uppercase tracking-wider ${COLOR_ESTADO[f.estado]}`}>
                      {ESTADO_LABEL[f.estado]}
                    </span>
                  </p>
                  {f.notas && (
                    <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted">{f.notas}</p>
                  )}
                </li>
              ))}
            </ul>

            {/* Escritorio e impresión: tabla */}
            <table className="hidden w-full border-collapse text-left sm:table">
              <thead>
                <tr className="text-muted">
                  <th className="py-3 pr-4 font-mono text-[10.5px] font-normal uppercase tracking-[0.14em]">
                    Descripción
                  </th>
                  <th className="w-20 py-3 pr-4 text-right font-mono text-[10.5px] font-normal uppercase tracking-[0.14em]">
                    Cant.
                  </th>
                  <th className="w-16 py-3 pr-4 font-mono text-[10.5px] font-normal uppercase tracking-[0.14em]">
                    Un.
                  </th>
                  <th className="w-36 py-3 pr-4 text-right font-mono text-[10.5px] font-normal uppercase tracking-[0.14em]">
                    V. unitario
                  </th>
                  <th className="w-40 py-3 text-right font-mono text-[10.5px] font-normal uppercase tracking-[0.14em]">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {filas.map((f) => (
                  <tr key={f.item.id} className="border-t border-line align-top">
                    <td className="py-3 pr-4">
                      <span className="text-[14px] leading-snug">{f.item.titulo}</span>
                      <span
                        className={`ml-2 font-mono text-[10.5px] uppercase tracking-wider ${COLOR_ESTADO[f.estado]}`}
                      >
                        {ESTADO_LABEL[f.estado]}
                      </span>
                      {f.notas && (
                        <p className="mt-1.5 max-w-xl text-[12.5px] leading-relaxed text-muted">
                          {f.notas}
                        </p>
                      )}
                    </td>
                    <td className="py-3 pr-4 text-right font-mono text-[13.5px]">
                      {formatNum(f.cantidad)}
                    </td>
                    <td className="py-3 pr-4 font-mono text-[12.5px] text-muted">
                      {UNIDAD_LABEL[f.item.unidad]}
                    </td>
                    <td className="py-3 pr-4 text-right font-mono text-[13.5px]">
                      {formatCOP(f.valorUnitario)}
                    </td>
                    <td className="py-3 text-right font-mono text-[13.5px] font-medium">
                      {formatCOP(f.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </section>

      {/* ---------- Total ---------- */}
      <section className="mt-12 rounded-xl border-2 border-ink px-5 py-6 sm:mt-14 sm:px-6 sm:py-7">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Total general de la obra</p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
              {cotizados} de {totalItems} ítems cotizados. Los que faltan quedan en cero.
            </p>
          </div>
          <p className="font-mono text-[32px] font-semibold tracking-tight sm:text-[42px]">
            {formatCOP(granTotal || null)}
          </p>
        </div>
      </section>

      <p className="mt-6 text-[12.5px] leading-relaxed text-muted">
        Los valores no incluyen IVA ni AIU salvo que se indique en las observaciones de cada ítem.
        Las cantidades son las que el contratista midió en sitio y son las que rigen sobre cualquier
        estimado previo.
      </p>
    </main>
  );
}
