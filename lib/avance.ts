import { ESPACIOS, getEspacio } from "@/lib/obra";
import {
  acordadoCuenta,
  cotizacionesDeEspacio,
  cotizadoEnEspacio,
  cuentaDeCotizacion,
  lineasDeEspacio,
  pagadoCuenta,
  totalLinea,
  TODAS_LAS_LINEAS,
} from "@/lib/cotizaciones";
import type { SeguimientoMap } from "@/lib/mongodb";

export type Avance = {
  terminados: number;
  /** Líneas cotizadas más trabajos pendientes de cotizar. */
  trabajos: number;
  porCotizar: number;
  /** 0–100 */
  porcentaje: number;
};

export type PagoEspacio = {
  cotizado: number;
  pagado: number;
  /** 0–100 sobre lo cotizado. Sin nada cotizado, 0. */
  porcentaje: number;
  completo: boolean;
};

/**
 * Avance de un espacio: lo terminado sobre todos sus trabajos, cotizados o no.
 * Así un espacio con todo lo cotizado terminado pero cosas por cotizar no
 * marca 100 %.
 */
export function avanceEspacio(slug: string, seguimiento: SeguimientoMap): Avance {
  const lineas = lineasDeEspacio(slug);
  const porCotizar = getEspacio(slug)?.pendientes?.length ?? 0;
  const terminados = lineas.filter((l) => seguimiento[l.id]?.estado === "terminado").length;
  const trabajos = lineas.length + porCotizar;
  return {
    terminados,
    trabajos,
    porCotizar,
    porcentaje: trabajos === 0 ? 0 : Math.round((terminados / trabajos) * 100),
  };
}

export function avanceObra(seguimiento: SeguimientoMap): Avance {
  const porCotizar = ESPACIOS.reduce((a, e) => a + (e.pendientes?.length ?? 0), 0);
  const terminados = TODAS_LAS_LINEAS.filter(
    (l) => seguimiento[l.id]?.estado === "terminado"
  ).length;
  const trabajos = TODAS_LAS_LINEAS.length + porCotizar;
  return {
    terminados,
    trabajos,
    porCotizar,
    porcentaje: trabajos === 0 ? 0 : Math.round((terminados / trabajos) * 100),
  };
}

/**
 * Cuánto de lo cotizado en un espacio está pagado. Los pagos cubren
 * cotizaciones completas, así que a cada cotización se le aplica la fracción
 * pagada de su cuenta y se reparte sobre las líneas de este espacio.
 */
export function pagoEspacio(slug: string): PagoEspacio {
  const cotizado = cotizadoEnEspacio(slug);
  let pagado = 0;
  for (const c of cotizacionesDeEspacio(slug)) {
    const cuenta = cuentaDeCotizacion(c.numero);
    const fraccion = cuenta ? Math.min(1, pagadoCuenta(cuenta) / acordadoCuenta(cuenta)) : 0;
    const enEspacio = c.lineas
      .filter((l) => l.espacio === slug)
      .reduce((a, l) => a + totalLinea(l), 0);
    pagado += Math.round(enEspacio * fraccion);
  }
  const porcentaje = cotizado === 0 ? 0 : Math.round((pagado / cotizado) * 100);
  return { cotizado, pagado, porcentaje, completo: cotizado > 0 && pagado >= cotizado };
}
