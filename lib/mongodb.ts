import { MongoClient, type Collection, type Db } from "mongodb";

export type Estado = "pendiente" | "en_proceso" | "terminado";

export type Cotizacion = {
  /** Coincide con Item.id de lib/obra.ts */
  _id: string;
  cantidad: number | null;
  valorUnitario: number | null;
  estado: Estado;
  notas: string;
  actualizado: string | null;
};

export type CotizacionMap = Record<string, Cotizacion>;

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "inspiratech";
const collectionName = process.env.MONGODB_COLLECTION || "apto_arreglos";

if (!uri) {
  throw new Error("Falta la variable de entorno MONGODB_URI");
}

// En desarrollo el hot-reload crea clientes nuevos en cada recarga; se cachea en global.
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = new MongoClient(uri).connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = new MongoClient(uri).connect();
}

export async function getDb(): Promise<Db> {
  const client = await clientPromise;
  return client.db(dbName);
}

export async function getCotizaciones(): Promise<Collection<Cotizacion>> {
  const db = await getDb();
  return db.collection<Cotizacion>(collectionName);
}

export const COTIZACION_VACIA = (id: string): Cotizacion => ({
  _id: id,
  cantidad: null,
  valorUnitario: null,
  estado: "pendiente",
  notas: "",
  actualizado: null,
});

/** Lee todas las cotizaciones guardadas y las devuelve indexadas por id de item. */
export async function leerCotizaciones(): Promise<CotizacionMap> {
  try {
    const col = await getCotizaciones();
    const docs = await col.find({}).toArray();
    const map: CotizacionMap = {};
    for (const d of docs) {
      map[d._id] = {
        _id: d._id,
        cantidad: typeof d.cantidad === "number" ? d.cantidad : null,
        valorUnitario: typeof d.valorUnitario === "number" ? d.valorUnitario : null,
        estado: (d.estado as Estado) || "pendiente",
        notas: d.notas || "",
        actualizado: d.actualizado ? String(d.actualizado) : null,
      };
    }
    return map;
  } catch (err) {
    console.error("No se pudieron leer las cotizaciones:", err);
    return {};
  }
}
