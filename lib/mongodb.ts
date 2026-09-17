import { MongoClient, type Collection, type Db } from "mongodb";

export type Estado = "pendiente" | "en_proceso" | "terminado";

/**
 * Lo único que se guarda en Mongo: el avance y las observaciones de cada línea
 * cotizada. Los valores vienen de lib/cotizaciones.ts y no se editan aquí.
 */
export type Seguimiento = {
  /** Coincide con Linea.id de lib/cotizaciones.ts */
  _id: string;
  estado: Estado;
  notas: string;
  actualizado: string | null;
};

export type SeguimientoMap = Record<string, Seguimiento>;

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

export async function getSeguimientos(): Promise<Collection<Seguimiento>> {
  const db = await getDb();
  return db.collection<Seguimiento>(collectionName);
}

export const SEGUIMIENTO_VACIO = (id: string): Seguimiento => ({
  _id: id,
  estado: "pendiente",
  notas: "",
  actualizado: null,
});

/** Lee todo el seguimiento guardado y lo devuelve indexado por id de línea. */
export async function leerSeguimiento(): Promise<SeguimientoMap> {
  try {
    const col = await getSeguimientos();
    const docs = await col.find({}).toArray();
    const map: SeguimientoMap = {};
    for (const d of docs) {
      map[d._id] = {
        _id: d._id,
        estado: (d.estado as Estado) || "pendiente",
        notas: d.notas || "",
        actualizado: d.actualizado ? String(d.actualizado) : null,
      };
    }
    return map;
  } catch (err) {
    console.error("No se pudo leer el seguimiento:", err);
    return {};
  }
}
