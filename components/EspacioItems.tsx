"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import Icono from "@/components/Iconos";
import type { Item } from "@/lib/obra";
import { UNIDAD_AYUDA, UNIDAD_LABEL } from "@/lib/obra";
import type { Cotizacion, Estado } from "@/lib/mongodb";
import { formatCOP, total } from "@/lib/format";

type Props = {
  items: Item[];
  inicial: Record<string, Cotizacion>;
};

const ESTADOS: { valor: Estado; label: string }[] = [
  { valor: "pendiente", label: "Pendiente" },
  { valor: "en_proceso", label: "En proceso" },
  { valor: "terminado", label: "Terminado" },
];

const vacia = (id: string): Cotizacion => ({
  _id: id,
  cantidad: null,
  valorUnitario: null,
  estado: "pendiente",
  notas: "",
  actualizado: null,
});

/** Convierte "1.200.000" o "1200000" en 1200000. */
function soloDigitos(texto: string): number | null {
  const limpio = texto.replace(/\D/g, "");
  if (!limpio) return null;
  return Number(limpio);
}

const miles = new Intl.NumberFormat("es-CO", { maximumFractionDigits: 0 });

export default function EspacioItems({ items, inicial }: Props) {
  const [datos, setDatos] = useState<Record<string, Cotizacion>>(() => {
    const base: Record<string, Cotizacion> = {};
    for (const i of items) base[i.id] = inicial[i.id] ?? vacia(i.id);
    return base;
  });
  const [guardando, setGuardando] = useState<Record<string, "guardando" | "listo" | "error">>({});
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  // Acumula los campos editados dentro de la ventana del debounce para que un
  // cambio rápido de cantidad seguido de otro de precio no pise al primero.
  const pendientes = useRef<Record<string, Partial<Cotizacion>>>({});

  const enviar = useCallback(async (id: string) => {
    const cambios = pendientes.current[id];
    if (!cambios) return;
    delete pendientes.current[id];
    setGuardando((g) => ({ ...g, [id]: "guardando" }));
    try {
      const res = await fetch("/api/cotizacion", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...cambios }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setGuardando((g) => ({ ...g, [id]: "listo" }));
      setTimeout(() => setGuardando((g) => ({ ...g, [id]: undefined as never })), 2200);
    } catch {
      setGuardando((g) => ({ ...g, [id]: "error" }));
    }
  }, []);

  const actualizar = useCallback(
    (id: string, cambios: Partial<Cotizacion>, retraso = 700) => {
      setDatos((d) => ({ ...d, [id]: { ...d[id], ...cambios } }));
      pendientes.current[id] = { ...pendientes.current[id], ...cambios };
      clearTimeout(timers.current[id]);
      timers.current[id] = setTimeout(() => enviar(id), retraso);
    },
    [enviar]
  );

  const subtotal = useMemo(
    () =>
      items.reduce((acc, i) => {
        const c = datos[i.id];
        return acc + (total(c?.cantidad ?? null, c?.valorUnitario ?? null) ?? 0);
      }, 0),
    [items, datos]
  );

  const cotizados = items.filter(
    (i) => total(datos[i.id]?.cantidad ?? null, datos[i.id]?.valorUnitario ?? null) !== null
  ).length;

  return (
    <div>
      <div className="space-y-4">
        {items.map((item, idx) => {
          const c = datos[item.id];
          const t = total(c.cantidad, c.valorUnitario);
          const estadoGuardado = guardando[item.id];

          return (
            <article key={item.id} className="card overflow-hidden print-break">
              <div className="flex flex-col gap-4 p-4 sm:p-6">
                {/* --- Encabezado --- */}
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-clayfaint text-clay">
                    <Icono nombre={item.icono} className="h-[19px] w-[19px]" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-[15px] font-semibold leading-snug tracking-tight">
                        <span className="mr-1.5 font-mono text-[11px] font-normal text-muted">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        {item.titulo}
                      </h3>
                      {item.destacado && (
                        <span className="mt-0.5 hidden shrink-0 rounded-full bg-clayfaint px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-clay sm:inline">
                          Clave
                        </span>
                      )}
                    </div>
                    <p className="mt-1.5 max-w-2xl text-[13.5px] leading-relaxed text-muted">
                      {item.detalle}
                    </p>
                  </div>
                </div>

                {/* --- Cantidad y precio --- */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-[1fr_1.3fr_1fr] sm:items-end">
                  <label className="block">
                    <span className="eyebrow mb-1.5 block">
                      Cantidad · {UNIDAD_LABEL[item.unidad]}
                    </span>
                    <input
                      type="number"
                      step="any"
                      min="0"
                      inputMode="decimal"
                      className="field font-mono"
                      placeholder="0"
                      aria-label={`Cantidad en ${UNIDAD_AYUDA[item.unidad]} para ${item.titulo}`}
                      value={c.cantidad ?? ""}
                      onChange={(e) =>
                        actualizar(item.id, {
                          cantidad: e.target.value === "" ? null : Number(e.target.value),
                        })
                      }
                    />
                  </label>

                  <label className="block">
                    <span className="eyebrow mb-1.5 block">Valor unitario</span>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-mono text-sm text-muted">
                        $
                      </span>
                      <input
                        type="text"
                        inputMode="numeric"
                        className="field pl-7 font-mono"
                        placeholder="0"
                        aria-label={`Valor unitario para ${item.titulo}`}
                        value={c.valorUnitario === null ? "" : miles.format(c.valorUnitario)}
                        onChange={(e) =>
                          actualizar(item.id, { valorUnitario: soloDigitos(e.target.value) })
                        }
                      />
                    </div>
                  </label>

                  <div className="col-span-2 flex items-baseline justify-between rounded-lg bg-paper px-3 py-2.5 sm:col-span-1 sm:block sm:text-right">
                    <span className="eyebrow sm:mb-0.5 sm:block sm:text-right">Total</span>
                    <span
                      className={`font-mono text-[15px] ${t === null ? "text-muted" : "font-semibold"}`}
                    >
                      {formatCOP(t)}
                    </span>
                  </div>
                </div>

                {/* --- Estado --- */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <div className="inline-flex flex-1 rounded-lg border border-line p-0.5 sm:flex-none">
                    {ESTADOS.map((e) => (
                      <button
                        key={e.valor}
                        type="button"
                        onClick={() => actualizar(item.id, { estado: e.valor }, 0)}
                        aria-pressed={c.estado === e.valor}
                        className={`flex-1 rounded-[6px] px-3 py-1.5 text-[12.5px] transition-colors sm:flex-none ${
                          c.estado === e.valor ? "bg-ink text-white" : "text-muted hover:text-ink"
                        }`}
                      >
                        {e.label}
                      </button>
                    ))}
                  </div>

                  <span className="font-mono text-[11px] text-muted" role="status">
                    {estadoGuardado === "guardando" && "Guardando…"}
                    {estadoGuardado === "listo" && "Guardado ✓"}
                    {estadoGuardado === "error" && (
                      <span className="text-clay">No se pudo guardar</span>
                    )}
                  </span>
                </div>

                <label className="block">
                  <span className="eyebrow mb-1.5 block">
                    Observaciones, materiales o supuestos
                  </span>
                  <textarea
                    rows={2}
                    className="field resize-y leading-relaxed"
                    placeholder="Ej: incluye material y mano de obra. No incluye el andamio."
                    value={c.notas}
                    onChange={(e) => actualizar(item.id, { notas: e.target.value }, 1000)}
                  />
                </label>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap items-baseline justify-between gap-3 rounded-xl border border-ink/15 bg-white px-5 py-4">
        <div>
          <span className="eyebrow block">Subtotal de este espacio</span>
          <span className="mt-0.5 block text-[12.5px] text-muted">
            {cotizados} de {items.length} ítems con precio
          </span>
        </div>
        <span className="font-mono text-2xl font-semibold tracking-tight">
          {formatCOP(subtotal || null)}
        </span>
      </div>
    </div>
  );
}
