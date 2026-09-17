import { NextResponse } from "next/server";
import { getSeguimientos, leerSeguimiento, type Estado } from "@/lib/mongodb";
import { TODAS_LAS_LINEAS } from "@/lib/cotizaciones";

export const dynamic = "force-dynamic";

const IDS_VALIDOS = new Set(TODAS_LAS_LINEAS.map((l) => l.id));
const ESTADOS_VALIDOS: Estado[] = ["pendiente", "en_proceso", "terminado"];

export async function GET() {
  const seguimiento = await leerSeguimiento();
  return NextResponse.json({ seguimiento });
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
    return NextResponse.json({ error: "Línea desconocida" }, { status: 400 });
  }

  const cambios: Record<string, unknown> = { actualizado: new Date().toISOString() };

  if ("notas" in body) cambios.notas = String(body.notas ?? "").slice(0, 2000);
  if ("estado" in body) {
    const estado = String(body.estado) as Estado;
    if (!ESTADOS_VALIDOS.includes(estado)) {
      return NextResponse.json({ error: "Estado inválido" }, { status: 400 });
    }
    cambios.estado = estado;
  }

  try {
    const col = await getSeguimientos();
    // El upsert crea el documento con _id = id; no se toca _id en $set porque es inmutable.
    const res = await col.findOneAndUpdate(
      { _id: id },
      { $set: cambios },
      { upsert: true, returnDocument: "after" }
    );
    return NextResponse.json({ ok: true, seguimiento: res });
  } catch (err) {
    console.error("Error guardando seguimiento:", err);
    return NextResponse.json({ error: "No se pudo guardar" }, { status: 500 });
  }
}
