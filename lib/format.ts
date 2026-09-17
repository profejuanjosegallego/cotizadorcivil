const pesos = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

const numero = new Intl.NumberFormat("es-CO", { maximumFractionDigits: 2 });

export function formatCOP(valor: number | null | undefined): string {
  if (valor === null || valor === undefined || Number.isNaN(valor)) return "—";
  return pesos.format(valor);
}

export function formatNum(valor: number | null | undefined): string {
  if (valor === null || valor === undefined || Number.isNaN(valor)) return "—";
  return numero.format(valor);
}

/** Diferencia con signo: "+ $ 8.000" o "− $ 8.000". Cero devuelve "—". */
export function formatDiferencia(valor: number): string {
  if (valor === 0) return "—";
  return `${valor > 0 ? "+" : "−"} ${pesos.format(Math.abs(valor))}`;
}

const fechaLarga = new Intl.DateTimeFormat("es-CO", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const fechaCorta = new Intl.DateTimeFormat("es-CO", { day: "numeric", month: "short" });
const fechaMedia = new Intl.DateTimeFormat("es-CO", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

/** "2026-09-05" o "2026-09-05T08:22" → "5 de septiembre de 2026". Sin zona horaria: la hora es la de Colombia tal cual. */
export function formatFecha(iso: string): string {
  const [a, m, d] = iso.slice(0, 10).split("-").map(Number);
  return fechaLarga.format(new Date(a, m - 1, d));
}

export function formatFechaCorta(iso: string): string {
  const [a, m, d] = iso.slice(0, 10).split("-").map(Number);
  return fechaCorta.format(new Date(a, m - 1, d)).replace(" de ", " ").replace(".", "");
}

/** "2026-09-05" → "5 sept 2026". */
export function formatFechaMedia(iso: string): string {
  const [a, m, d] = iso.slice(0, 10).split("-").map(Number);
  return fechaMedia.format(new Date(a, m - 1, d)).replace(/ de /g, " ").replace(".", "");
}

export function formatHora(iso: string): string | null {
  const hora = iso.slice(11, 16);
  if (!hora) return null;
  const [h, min] = hora.split(":").map(Number);
  const sufijo = h < 12 ? "a. m." : "p. m.";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(min).padStart(2, "0")} ${sufijo}`;
}

export const ESTADO_LABEL: Record<string, string> = {
  pendiente: "Pendiente",
  en_proceso: "En proceso",
  terminado: "Terminado",
};
