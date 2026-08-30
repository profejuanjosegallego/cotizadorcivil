import { NextResponse } from "next/server";
import { getCotizaciones, leerCotizaciones, type Estado } from "@/lib/mongodb";
import { TODOS_LOS_ITEMS } from "@/lib/obra";

export const dynamic = "force-dynamic";

const IDS_VALIDOS = new Set(TODOS_LOS_ITEMS.map((i) => i.id));
const ESTADOS_VALIDOS: Estado[] = ["pendiente", "en_proceso", "terminado"];

export async function GET() {
  const cotizaciones = await leerCotizaciones();
  return NextResponse.json({ cotizaciones });
}

function numeroONull(valor: unknown): number | null {
  if (valor === null || valor === undefined || valor === "") return null;
  const n = typeof valor === "number" ? valor : Number(valor);
  if (!Number.isFinite(n) || n < 0) return null;
  return n;
}

export async function PATCH(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Cuerpo inválido" }, { status: 400 });
  }

  const id = typeof body.id === "string" ? body.id : "";
  if (!IDS_VALIDOS.has(id)) {
    return NextResponse.json({ error: "Ítem desconocido" }, { status: 400 });
  }

  const cambios: Record<string, unknown> = { actualizado: new Date().toISOString() };

  if ("cantidad" in body) cambios.cantidad = numeroONull(body.cantidad);
  if ("valorUnitario" in body) cambios.valorUnitario = numeroONull(body.valorUnitario);
  if ("notas" in body) cambios.notas = String(body.notas ?? "").slice(0, 2000);
  if ("estado" in body) {
    const estado = String(body.estado) as Estado;
    if (!ESTADOS_VALIDOS.includes(estado)) {
      return NextResponse.json({ error: "Estado inválido" }, { status: 400 });
    }
    cambios.estado = estado;
  }

  try {
    const col = await getCotizaciones();
    // El upsert crea el documento con _id = id; no se toca _id en $set porque es inmutable.
    const res = await col.findOneAndUpdate(
      { _id: id },
      { $set: cambios },
      { upsert: true, returnDocument: "after" }
    );
    return NextResponse.json({ ok: true, cotizacion: res });
  } catch (err) {
    console.error("Error guardando cotización:", err);
    return NextResponse.json({ error: "No se pudo guardar" }, { status: 500 });
  }
}
