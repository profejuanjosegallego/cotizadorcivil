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

export function total(cantidad: number | null, valorUnitario: number | null): number | null {
  if (cantidad === null || valorUnitario === null) return null;
  return cantidad * valorUnitario;
}

export const ESTADO_LABEL: Record<string, string> = {
  pendiente: "Pendiente",
  en_proceso: "En proceso",
  terminado: "Terminado",
};
