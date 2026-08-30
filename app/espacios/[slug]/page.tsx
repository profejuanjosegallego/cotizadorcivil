import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import EspacioItems from "@/components/EspacioItems";
import PlanoMini from "@/components/PlanoMini";
import DiagramaEstudio from "@/components/DiagramaEstudio";
import Icono from "@/components/Iconos";
import { ESPACIOS, getEspacio } from "@/lib/obra";
import { leerCotizaciones } from "@/lib/mongodb";

// Sin generateStaticParams a propósito: la ficha lee la cotización guardada en
// Mongo en cada visita, así que no puede quedar congelada en el build.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const espacio = getEspacio(params.slug);
  if (!espacio) return {};
  return { title: `${espacio.nombre} — Remodelación Apto` };
}

export default async function EspacioPage({ params }: { params: { slug: string } }) {
  const espacio = getEspacio(params.slug);
  if (!espacio) notFound();

  const cotizaciones = await leerCotizaciones();
  const indice = ESPACIOS.findIndex((e) => e.slug === espacio.slug);
  const anterior = ESPACIOS[indice - 1];
  const siguiente = ESPACIOS[indice + 1];

  return (
    <main className="mx-auto max-w-content px-5 pb-20 pt-8 sm:px-8 sm:pt-10">
      <Link
        href="/#espacios"
        className="no-print inline-flex items-center gap-1.5 text-[13px] text-muted transition-colors hover:text-ink"
      >
        <span aria-hidden>←</span> Todos los espacios
      </Link>

      {/* ---------- Cabecera ---------- */}
      <header className="mt-6 grid gap-8 sm:mt-8 lg:grid-cols-[1.4fr_1fr] lg:items-start lg:gap-14">
        <div className="contents lg:block">
          <div>
            <p className="eyebrow">
              Espacio {String(indice + 1).padStart(2, "0")} · {espacio.items.length} ítems
            </p>
            <h1 className="mt-3 flex items-center gap-3 text-[32px] font-semibold leading-[1.08] tracking-[-0.025em] sm:text-[46px]">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-clayfaint text-clay sm:h-12 sm:w-12">
                <Icono nombre={espacio.icono} className="h-6 w-6" strokeWidth={1.4} />
              </span>
              {espacio.nombre}
            </h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted sm:text-[16px]">
              {espacio.intencion}
            </p>
          </div>

          {espacio.notas && espacio.notas.length > 0 && (
            <div className="order-last mt-8 rounded-xl border-l-2 border-l-clay bg-clayfaint/60 px-4 py-4 sm:px-5 lg:order-none">
              <p className="eyebrow text-clay">Antes de cotizar</p>
              <ul className="mt-3 space-y-2.5">
                {espacio.notas.map((n, i) => (
                  <li key={i} className="flex gap-2.5 text-[13.5px] leading-relaxed text-ink/80">
                    <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-clay" />
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <figure className="no-print rounded-xl border border-line bg-white p-4 sm:p-5">
          <figcaption className="eyebrow mb-3">Ubicación en el apartamento</figcaption>
          <PlanoMini slug={espacio.slug} />
        </figure>
      </header>

      {/* ---------- Diagrama del estudio ---------- */}
      {espacio.slug === "estudio" && (
        <section className="mt-14">
          <p className="eyebrow">Qué cambia</p>
          <h2 className="mb-5 mt-2.5 text-[21px] font-semibold tracking-tight sm:text-[22px]">
            El muro nuevo y el cuarto útil
          </h2>
          <DiagramaEstudio />
        </section>
      )}

      {/* ---------- Estado actual ---------- */}
      {espacio.fotos.length > 0 && (
        <section className="mt-14">
          <p className="eyebrow">Estado actual</p>
          <h2 className="mb-5 mt-2.5 text-[21px] font-semibold tracking-tight sm:text-[22px]">
            Cómo está hoy
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
            {espacio.fotos.map((f) => (
              <figure key={f.src}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-line bg-line">
                  <Image
                    src={f.src}
                    alt={f.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 560px"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-2.5 text-[12.5px] leading-relaxed text-muted">
                  {f.pie}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* ---------- Referencias ---------- */}
      {espacio.referencias.length > 0 && (
        <section className="mt-14">
          <p className="eyebrow">Referencias</p>
          <h2 className="mb-5 mt-2.5 text-[21px] font-semibold tracking-tight sm:text-[22px]">
            Lo que queremos lograr
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
            {espacio.referencias.map((r) => (
              <figure key={r.src} className="card overflow-hidden">
                <div className="relative aspect-[4/3] bg-paper">
                  <Image
                    src={r.src}
                    alt={r.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 560px"
                    className="object-contain p-3"
                  />
                </div>
                <figcaption className="border-t border-line px-4 py-3 text-[12.5px] leading-relaxed text-muted">
                  {r.pie}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* ---------- Cotización ---------- */}
      <section className="mt-14">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow">Cantidades y costos</p>
            <h2 className="mt-2.5 text-[21px] font-semibold tracking-tight sm:text-[22px]">
              Trabajos a cotizar
            </h2>
          </div>
          <p className="max-w-sm text-[12.5px] leading-relaxed text-muted">
            Todo arranca en cero. Se guarda solo, apenas deja de escribir.
          </p>
        </div>

        <EspacioItems items={espacio.items} inicial={cotizaciones} />
      </section>

      {/* ---------- Navegación ---------- */}
      <nav className="no-print mt-12 grid gap-3 border-t border-line pt-7 sm:grid-cols-2">
        {anterior ? (
          <Link href={`/espacios/${anterior.slug}`} className="card group p-4 sm:p-5">
            <span className="eyebrow">Anterior</span>
            <span className="mt-1.5 block text-[15px] font-medium tracking-tight transition-colors group-hover:text-clay">
              ← {anterior.nombre}
            </span>
          </Link>
        ) : (
          <span className="hidden sm:block" />
        )}
        {siguiente ? (
          <Link href={`/espacios/${siguiente.slug}`} className="card group p-4 sm:p-5 sm:text-right">
            <span className="eyebrow">Siguiente</span>
            <span className="mt-1.5 block text-[15px] font-medium tracking-tight transition-colors group-hover:text-clay">
              {siguiente.nombre} →
            </span>
          </Link>
        ) : (
          <Link href="/resumen" className="card group p-4 sm:p-5 sm:text-right">
            <span className="eyebrow">Para terminar</span>
            <span className="mt-1.5 block text-[15px] font-medium tracking-tight transition-colors group-hover:text-clay">
              Ver la cotización completa →
            </span>
          </Link>
        )}
      </nav>
    </main>
  );
}
