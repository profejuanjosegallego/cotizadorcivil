import Image from "next/image";
import Link from "next/link";
import Plano from "@/components/Plano";
import Icono from "@/components/Iconos";
import { ESPACIOS, TODOS_LOS_ITEMS } from "@/lib/obra";
import { leerCotizaciones } from "@/lib/mongodb";
import { formatCOP, total } from "@/lib/format";
import type { IconoNombre } from "@/lib/plano";

export const dynamic = "force-dynamic";

const LEYENDA: { icono: IconoNombre; texto: string }[] = [
  { icono: "muro", texto: "Muro que se demuele o se construye" },
  { icono: "luz", texto: "Punto de luz nuevo" },
  { icono: "estanteria", texto: "Mueble o estantería a la medida" },
  { icono: "baldosa", texto: "Piso o enchape nuevo" },
  { icono: "bano", texto: "Cocineta, baño y ducha que se retiran" },
];

export default async function Home() {
  const cotizaciones = await leerCotizaciones();

  const conPrecio = TODOS_LOS_ITEMS.filter((i) => {
    const c = cotizaciones[i.id];
    return total(c?.cantidad ?? null, c?.valorUnitario ?? null) !== null;
  }).length;

  const granTotal = TODOS_LOS_ITEMS.reduce((acc, i) => {
    const c = cotizaciones[i.id];
    return acc + (total(c?.cantidad ?? null, c?.valorUnitario ?? null) ?? 0);
  }, 0);

  return (
    <main>
      {/* ---------- Portada ---------- */}
      <section className="mx-auto max-w-content px-5 pb-14 pt-10 sm:px-8 sm:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <p className="eyebrow">Edificio Belo Horizonte · Alcance de obra</p>
            <h1 className="mt-4 text-[32px] font-semibold leading-[1.08] tracking-[-0.025em] sm:text-[54px]">
              Todo lo que queremos
              <br />
              hacer en el apartamento,
              <br />
              <span className="text-clay">espacio por espacio.</span>
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted sm:text-[15.5px]">
              Esta página existe para que no haya que adivinar nada. Cada espacio tiene fotos del
              estado actual, las referencias de lo que queremos lograr, y el listado de trabajos
              desglosado para que usted ponga cantidades y precios directamente aquí.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#plano"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-ink px-5 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-85"
              >
                Ver el plano <span aria-hidden>↓</span>
              </Link>
              <Link href="/resumen" className="btn-ghost py-3.5">
                Ir a la cotización <span aria-hidden>→</span>
              </Link>
            </div>

            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-line pt-6 sm:gap-6 sm:pt-7">
              <div>
                <dt className="eyebrow">Espacios</dt>
                <dd className="mt-1 font-mono text-xl font-semibold tracking-tight sm:text-2xl">
                  {ESPACIOS.length}
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Ítems</dt>
                <dd className="mt-1 font-mono text-xl font-semibold tracking-tight sm:text-2xl">
                  {TODOS_LOS_ITEMS.length}
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Cotizados</dt>
                <dd className="mt-1 font-mono text-xl font-semibold tracking-tight sm:text-2xl">
                  {conPrecio}
                  <span className="text-muted">/{TODOS_LOS_ITEMS.length}</span>
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
                Toque cualquier espacio del plano o cualquier número para abrir su ficha, con fotos,
                referencias y el formulario de cotización.
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
            Ver todo junto <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {ESPACIOS.map((e) => {
            const subtotal = e.items.reduce((acc, i) => {
              const c = cotizaciones[i.id];
              return acc + (total(c?.cantidad ?? null, c?.valorUnitario ?? null) ?? 0);
            }, 0);
            const listos = e.items.filter((i) => cotizaciones[i.id]?.estado === "terminado").length;

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
                    {e.items.length} ítem{e.items.length === 1 ? "" : "s"}
                    {listos > 0 && (
                      <span className="text-moss">
                        {" "}
                        · {listos} listo{listos === 1 ? "" : "s"}
                      </span>
                    )}
                  </span>
                  <span className={subtotal > 0 ? "text-ink" : ""}>
                    {subtotal > 0 ? formatCOP(subtotal) : "Sin cotizar"}
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
          <p className="eyebrow">Para el contratista</p>
          <h2 className="mt-3 max-w-2xl text-[26px] font-semibold leading-tight tracking-[-0.02em] sm:text-[34px]">
            Cómo usar esta página
          </h2>

          <ol className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-10">
            {[
              {
                n: "01",
                t: "Entienda la intención",
                d: "Cada espacio explica no sólo qué se hace, sino qué queremos lograr, con las fotos del estado actual y las referencias de lo que nos gusta.",
              },
              {
                n: "02",
                t: "Ponga cantidades y precios",
                d: "Todo arranca en cero. En cada ítem escriba la cantidad medida en sitio y el valor unitario: el total se calcula solo y se guarda apenas termina de escribir.",
              },
              {
                n: "03",
                t: "Use las observaciones",
                d: "Si algo no aplica, si propone otra solución o si el precio depende de algo, escríbalo en observaciones. Ahí es donde se evitan los malentendidos.",
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
              <p className="eyebrow">Total cotizado hasta ahora</p>
              <p className="mt-1.5 font-mono text-[28px] font-semibold tracking-tight sm:text-3xl">
                {formatCOP(granTotal || null)}
              </p>
            </div>
            <Link
              href="/resumen"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-ink px-5 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-85"
            >
              Abrir la cotización completa <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
