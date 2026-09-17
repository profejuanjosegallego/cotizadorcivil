import Image from "next/image";
import Link from "next/link";
import Plano from "@/components/Plano";
import Icono from "@/components/Iconos";
import { ESPACIOS } from "@/lib/obra";
import {
  PAGOS,
  TODAS_LAS_LINEAS,
  TOTAL_ACORDADO,
  TOTAL_COTIZADO,
  TOTAL_PAGADO,
  cotizadoEnEspacio,
  lineasDeEspacio,
} from "@/lib/cotizaciones";
import { leerSeguimiento } from "@/lib/mongodb";
import { formatCOP, formatDiferencia } from "@/lib/format";
import type { IconoNombre } from "@/lib/plano";

export const dynamic = "force-dynamic";

const LEYENDA: { icono: IconoNombre; texto: string }[] = [
  { icono: "muro", texto: "Muro que se demuele o se construye" },
  { icono: "grifo", texto: "Lavamanos y cabina de baño" },
  { icono: "aire", texto: "Aire acondicionado" },
  { icono: "luzIndirecta", texto: "Luces para los cuadros · pendiente de cotizar" },
  { icono: "bano", texto: "Cocineta, baño y ducha ya retiradas (demolición de la cotización 1)" },
];

export default async function Home() {
  const seguimiento = await leerSeguimiento();
  const diferencia = TOTAL_PAGADO - TOTAL_ACORDADO;
  const pendientes = ESPACIOS.filter((e) => (e.pendientes?.length ?? 0) > 0).length;

  return (
    <main>
      {/* ---------- Portada ---------- */}
      <section className="mx-auto max-w-content px-5 pb-14 pt-10 sm:px-8 sm:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <p className="eyebrow">Edificio Belo Horizonte · Obra en curso</p>
            <h1 className="mt-4 text-[32px] font-semibold leading-[1.08] tracking-[-0.025em] sm:text-[54px]">
              Lo que se cotizó,
              <br />
              lo que se pagó,
              <br />
              <span className="text-clay">espacio por espacio.</span>
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted sm:text-[15.5px]">
              Esta página lleva las cuentas de la obra. Cada espacio muestra qué cotizó Óscar, con
              qué transferencia se pagó y cómo va el trabajo. Las cotizaciones y los comprobantes
              se pueden descargar.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#plano"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-ink px-5 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-85"
              >
                Ver el plano <span aria-hidden>↓</span>
              </Link>
              <Link href="/resumen" className="btn-ghost py-3.5">
                Ver las cuentas <span aria-hidden>→</span>
              </Link>
            </div>

            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-line pt-6 sm:gap-6 sm:pt-7">
              <div>
                <dt className="eyebrow">Cotizado</dt>
                <dd className="mt-1 font-mono text-[17px] font-semibold tracking-tight sm:text-2xl">
                  {formatCOP(TOTAL_COTIZADO)}
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Pagado</dt>
                <dd className="mt-1 font-mono text-[17px] font-semibold tracking-tight sm:text-2xl">
                  {formatCOP(TOTAL_PAGADO)}
                </dd>
              </div>
              <div>
                <dt className="eyebrow">
                  {diferencia > 0 ? "Pagado de más" : diferencia < 0 ? "Por pagar" : "Saldo"}
                </dt>
                <dd
                  className={`mt-1 font-mono text-[17px] font-semibold tracking-tight sm:text-2xl ${
                    diferencia === 0 ? "text-moss" : "text-clay"
                  }`}
                >
                  {diferencia === 0 ? "Cuadra ✓" : formatDiferencia(diferencia)}
                </dd>
              </div>
            </dl>
          </div>

          <figure className="relative order-first lg:order-none">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-line sm:aspect-[3/4]">
              <Image
                src="/img/edificio.jpg"
                alt="Fachada del edificio Belo Horizonte"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-[12px] text-muted">
              Edificio Belo Horizonte. El apartamento tiene balcón hacia la fachada.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ---------- Plano ---------- */}
      <section id="plano" className="border-y border-line bg-white">
        <div className="mx-auto max-w-content px-5 py-14 sm:px-8 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(260px,1fr)_1.75fr] lg:gap-12">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <p className="eyebrow">Plano de intervenciones</p>
              <h2 className="mt-3 text-[26px] font-semibold leading-tight tracking-[-0.02em] sm:text-[34px]">
                Dónde queda cada cosa
              </h2>
              <p className="mt-4 text-[14.5px] leading-relaxed text-muted sm:text-[15px]">
                Toque cualquier espacio del plano o cualquier número para abrir su ficha, con lo
                que se cotizó, los pagos y el avance.
              </p>

              <ul className="mt-7 space-y-3 border-t border-line pt-6 text-[13px] text-muted">
                {LEYENDA.map((l) => (
                  <li key={l.texto} className="flex items-center gap-3">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-clayfaint text-clay">
                      <Icono nombre={l.icono} className="h-4 w-4" />
                    </span>
                    {l.texto}
                  </li>
                ))}
                <li className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-clay text-[11px] font-bold text-white"
                  >
                    1
                  </span>
                  Intervención puntual — toque para ver
                </li>
              </ul>

              <p className="mt-7 rounded-lg border border-line bg-paper px-4 py-3 text-[12.5px] leading-relaxed text-muted">
                El plano es un esquema para ubicarse, no está a escala. Las medidas reales se toman
                en sitio y son las que mandan para la cotización.
              </p>
            </div>

            <Plano />
          </div>
        </div>
      </section>

      {/* ---------- Espacios ---------- */}
      <section id="espacios" className="mx-auto max-w-content px-5 py-14 sm:px-8 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Los espacios</p>
            <h2 className="mt-3 text-[26px] font-semibold leading-tight tracking-[-0.02em] sm:text-[34px]">
              Ficha por ficha
            </h2>
          </div>
          <Link href="/resumen" className="btn-ghost">
            Ver las cuentas <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {ESPACIOS.map((e) => {
            const lineas = lineasDeEspacio(e.slug);
            const subtotal = cotizadoEnEspacio(e.slug);
            const listos = lineas.filter((l) => seguimiento[l.id]?.estado === "terminado").length;
            const sinCotizar = e.pendientes?.length ?? 0;

            return (
              <Link
                key={e.slug}
                href={`/espacios/${e.slug}`}
                className="group card flex flex-col p-5 transition-colors hover:border-ink/30"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-clayfaint text-clay">
                    <Icono nombre={e.icono} className="h-5 w-5" />
                  </span>
                  <span
                    aria-hidden
                    className="mt-2 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-ink"
                  >
                    →
                  </span>
                </div>
                <h3 className="mt-3.5 text-[16px] font-semibold tracking-tight">{e.nombre}</h3>
                <p className="mt-1.5 flex-1 text-[13.5px] leading-relaxed text-muted">
                  {e.resumen}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-line pt-3 font-mono text-[11px] text-muted">
                  <span>
                    {lineas.length > 0
                      ? `${lineas.length} línea${lineas.length === 1 ? "" : "s"}`
                      : `${sinCotizar} pendiente${sinCotizar === 1 ? "" : "s"}`}
                    {listos > 0 && (
                      <span className="text-moss">
                        {" "}
                        · {listos} lista{listos === 1 ? "" : "s"}
                      </span>
                    )}
                  </span>
                  <span className={lineas.length > 0 ? "text-ink" : "text-clay"}>
                    {lineas.length > 0 ? formatCOP(subtotal) : "Sin cotizar"}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ---------- Cómo usar ---------- */}
      <section className="border-t border-line bg-white">
        <div className="mx-auto max-w-content px-5 py-14 sm:px-8 sm:py-20">
          <p className="eyebrow">Cómo funciona</p>
          <h2 className="mt-3 max-w-2xl text-[26px] font-semibold leading-tight tracking-[-0.02em] sm:text-[34px]">
            Cómo usar esta página
          </h2>

          <ol className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-10">
            {[
              {
                n: "01",
                t: "Qué se cotizó",
                d: `Las ${TODAS_LAS_LINEAS.length} líneas de las cotizaciones de Óscar están repartidas por espacio, con mano de obra y materiales por separado, tal como él las envió. La cotización original se descarga desde cada ficha.`,
              },
              {
                n: "02",
                t: "Qué se pagó",
                d: `Los ${PAGOS.length} pagos están cruzados con la cotización que cubrieron. En las cuentas se ve cuál cuadra exacto y cuál quedó con diferencia, y cada comprobante se puede descargar.`,
              },
              {
                n: "03",
                t: "Marque el avance",
                d: "En cada línea se puede marcar Pendiente, En proceso o Terminado y dejar observaciones. Es una ayuda para llevar la obra, no un control: se guarda solo.",
              },
            ].map((p) => (
              <li key={p.n}>
                <span className="font-mono text-[11px] text-clay">{p.n}</span>
                <h3 className="mt-2.5 text-[16px] font-semibold tracking-tight">{p.t}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{p.d}</p>
              </li>
            ))}
          </ol>

          <div className="mt-12 flex flex-col gap-5 rounded-xl border border-ink/15 bg-paper px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <p className="eyebrow">Pagado hasta ahora</p>
              <p className="mt-1.5 font-mono text-[28px] font-semibold tracking-tight sm:text-3xl">
                {formatCOP(TOTAL_PAGADO)}
              </p>
              <p className="mt-1.5 text-[12.5px] text-muted">
                Sobre {formatCOP(TOTAL_COTIZADO)} cotizados
                {pendientes > 0 &&
                  ` · ${pendientes} espacio${pendientes === 1 ? "" : "s"} sin cotizar todavía`}
              </p>
            </div>
            <Link
              href="/resumen"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-ink px-5 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-85"
            >
              Abrir las cuentas completas <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
