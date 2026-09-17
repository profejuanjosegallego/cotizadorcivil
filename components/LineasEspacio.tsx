"use client";

import { useCallback, useRef, useState } from "react";
import type { LineaConCotizacion } from "@/lib/cotizaciones";
import { totalLinea } from "@/lib/cotizaciones";
import type { Estado, Seguimiento } from "@/lib/mongodb";
import { formatCOP, formatFechaCorta, formatNum } from "@/lib/format";

type Props = {
  lineas: LineaConCotizacion[];
  /** Fecha de cada cotización, indexada por número, para la etiqueta de la línea. */
  fechas: Record<number, string>;
  inicial: Record<string, Seguimiento>;
};

const ESTADOS: { valor: Estado; label: string }[] = [
  { valor: "pendiente", label: "Pendiente" },
  { valor: "en_proceso", label: "En proceso" },
  { valor: "terminado", label: "Terminado" },
];

const vacio = (id: string): Seguimiento => ({
  _id: id,
  estado: "pendiente",
  notas: "",
  actualizado: null,
});

/**
 * Las líneas que Óscar cotizó para un espacio. Los valores vienen de la
 * cotización y no se editan; lo que sí se guarda es el avance y las
 * observaciones, ~0,7 s después de dejar de escribir.
 */
export default function LineasEspacio({ lineas, fechas, inicial }: Props) {
  const [datos, setDatos] = useState<Record<string, Seguimiento>>(() => {
    const base: Record<string, Seguimiento> = {};
    for (const l of lineas) base[l.id] = inicial[l.id] ?? vacio(l.id);
    return base;
  });
  const [guardando, setGuardando] = useState<Record<string, "guardando" | "listo" | "error">>({});
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  // Acumula los campos editados dentro de la ventana del debounce para que un
  // cambio de estado seguido de una observación no pise al primero.
  const pendientes = useRef<Record<string, Partial<Seguimiento>>>({});

  const enviar = useCallback(async (id: string) => {
    const cambios = pendientes.current[id];
    if (!cambios) return;
    delete pendientes.current[id];
    setGuardando((g) => ({ ...g, [id]: "guardando" }));
    try {
      const res = await fetch("/api/seguimiento", {
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
    (id: string, cambios: Partial<Seguimiento>, retraso = 700) => {
      setDatos((d) => ({ ...d, [id]: { ...d[id], ...cambios } }));
      pendientes.current[id] = { ...pendientes.current[id], ...cambios };
      clearTimeout(timers.current[id]);
      timers.current[id] = setTimeout(() => enviar(id), retraso);
    },
    [enviar]
  );

  const subtotal = lineas.reduce((a, l) => a + totalLinea(l), 0);
  const terminadas = lineas.filter((l) => datos[l.id]?.estado === "terminado").length;

  return (
    <div>
      <div className="space-y-4">
        {lineas.map((linea, idx) => {
          const s = datos[linea.id];
          const estadoGuardado = guardando[linea.id];
          const t = totalLinea(linea);

          return (
            <article key={linea.id} className="card overflow-hidden print-break">
              <div className="flex flex-col gap-4 p-4 sm:p-6">
                {/* --- Encabezado --- */}
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[15px] font-semibold leading-snug tracking-tight">
                      <span className="mr-1.5 font-mono text-[11px] font-normal text-muted">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      {linea.descripcion}
                    </h3>
                    <p className="mt-1.5 font-mono text-[11px] uppercase tracking-wider text-muted">
                      Cotización {linea.cotizacion} · {formatFechaCorta(fechas[linea.cotizacion])}
                      {linea.cantidad !== undefined && linea.valorUnitario !== undefined && (
                        <>
                          {" · "}
                          {formatNum(linea.cantidad)} × {formatCOP(linea.valorUnitario)}
                        </>
                      )}
                    </p>
                    {linea.nota && (
                      <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-clay">
                        {linea.nota}
                      </p>
                    )}
                  </div>
                  <span
                    className={`shrink-0 font-mono text-[16px] tracking-tight ${
                      t === 0 ? "text-muted" : "font-semibold"
                    }`}
                  >
                    {formatCOP(t)}
                  </span>
                </div>

                {/* --- Mano de obra y materiales --- */}
                <dl className="grid grid-cols-2 gap-3 rounded-lg bg-paper px-3.5 py-3 font-mono text-[12.5px] sm:flex sm:gap-8">
                  <div>
                    <dt className="eyebrow">Mano de obra</dt>
                    <dd className={`mt-1 ${linea.manoObra === 0 ? "text-muted" : ""}`}>
                      {formatCOP(linea.manoObra)}
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow">Materiales y otros</dt>
                    <dd className={`mt-1 ${linea.materiales === 0 ? "text-muted" : ""}`}>
                      {formatCOP(linea.materiales)}
                    </dd>
                  </div>
                </dl>

                {/* --- Estado --- */}
                <div className="no-print flex flex-wrap items-center gap-x-4 gap-y-2">
                  <div className="inline-flex flex-1 rounded-lg border border-line p-0.5 sm:flex-none">
                    {ESTADOS.map((e) => (
                      <button
                        key={e.valor}
                        type="button"
                        onClick={() => actualizar(linea.id, { estado: e.valor }, 0)}
                        aria-pressed={s.estado === e.valor}
                        className={`flex-1 rounded-[6px] px-3 py-1.5 text-[12.5px] transition-colors sm:flex-none ${
                          s.estado === e.valor ? "bg-ink text-white" : "text-muted hover:text-ink"
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
                  <span className="eyebrow mb-1.5 block">Observaciones</span>
                  <textarea
                    rows={2}
                    className="field resize-y leading-relaxed"
                    placeholder="Ej: quedó pendiente el remate de la esquina."
                    value={s.notas}
                    onChange={(e) => actualizar(linea.id, { notas: e.target.value }, 1000)}
                  />
                </label>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap items-baseline justify-between gap-3 rounded-xl border border-ink/15 bg-white px-5 py-4">
        <div>
          <span className="eyebrow block">Cotizado en este espacio</span>
          <span className="mt-0.5 block text-[12.5px] text-muted">
            {lineas.length} línea{lineas.length === 1 ? "" : "s"}
            {terminadas > 0 && ` · ${terminadas} terminada${terminadas === 1 ? "" : "s"}`}
          </span>
        </div>
        <span className="font-mono text-2xl font-semibold tracking-tight">
          {formatCOP(subtotal)}
        </span>
      </div>
    </div>
  );
}
