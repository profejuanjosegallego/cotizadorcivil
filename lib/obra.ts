import type { IconoNombre } from "@/lib/plano";

export type Espacio = {
  slug: string;
  nombre: string;
  icono: IconoNombre;
  resumen: string;
  intencion: string;
  /**
   * Trabajos que Óscar todavía no ha cotizado. Se pasan a lib/cotizaciones.ts
   * cuando mande la cotización y se borran de aquí.
   */
  pendientes?: string[];
  /** Aclaraciones que hay que tener presentes al leer la ficha. */
  notas?: string[];
};

/**
 * Los espacios de la obra. Lo que se cotizó vive en lib/cotizaciones.ts, línea
 * por línea y apuntando al slug de cada espacio; aquí queda sólo la intención y
 * el material visual. Lo que no aparece en ninguna cotización de Óscar se
 * quitó a propósito: se agrega cuando él lo cotice.
 */
export const ESPACIOS: Espacio[] = [
  {
    slug: "general",
    nombre: "Todo el apartamento",
    icono: "pintura",
    resumen: "Pintura completa —reboque, resane y filetería— y botada de escombros.",
    intencion:
      "Que el apartamento quede parejo y limpio de arriba a abajo: sin fisuras ni parches visibles, cornisas y luces indirectas prolijas, y todo en Pintuco Blanco Luminoso. Aquí también va la botada de los escombros de toda la obra.",
    notas: ["La pintura es Pintuco Blanco Luminoso, no un equivalente."],
  },
  {
    slug: "estudio",
    nombre: "Estudio",
    icono: "muro",
    resumen: "Demolición del muro con el cuarto útil y reparación del piso y el guarda escoba.",
    intencion:
      "La dueña anterior corrió el muro hacia el estudio para agrandar el cuarto útil y alquilarlo aparte. Queremos deshacer eso: demoler el muro donde está hoy y levantarlo en su posición original, para que el estudio vuelva a sus dimensiones. En la franja que se recupera hay que reparar el piso y continuar el guarda escoba.",
    notas: [
      "La cotización 1 cubre la demolición del muro y la reparación del piso. El muro nuevo en la posición original no aparece cotizado: confirmar con Óscar si entra en la cotización del cuarto útil.",
      "Dónde quedaba el muro original se confirma en sitio: casi siempre se ve la huella en el piso, en el cielo o en el corte de la cornisa.",
    ],
  },
  {
    slug: "cuarto-util",
    nombre: "Cuarto útil",
    icono: "estanteria",
    resumen: "Pendiente de cotizar: grieta, piso en microcemento y estantería en L.",
    intencion:
      "El cuarto útil tenía cocineta, baño y ducha porque la dueña anterior lo acondicionó para alquilar. Eso ya se retiró: entró en la demolición de la cotización 1. Lo que falta es dejarlo como lo que es, un depósito bien resuelto: resanar y acabar la grieta, retirar la baldosa y dejar el piso en microcemento, y una estantería en L con rieles y entrepaños.",
    pendientes: [
      "Resane y acabado de la grieta",
      "Retiro de la baldosa y piso en microcemento",
      "Estantería en L con rieles y entrepaños",
    ],
    notas: [
      "El retiro de la cocineta, el baño y la ducha ya se hizo: está dentro de la línea \"Demolición\" de la cotización 1, que aparece en la ficha del estudio.",
      "Óscar todavía no envía la cotización de lo pendiente. Cuando llegue, se agrega aquí.",
      "El acceso es por el corredor común del edificio: hay que coordinar con la administración los horarios y el paso de escombros y materiales.",
    ],
  },
  {
    slug: "cocina",
    nombre: "Cocina",
    icono: "estufa",
    resumen: "Mortero del horno en microcemento y puesta a punto del gabinete.",
    intencion:
      "Dejar el mesón del horno con mortero en microcemento, y el gabinete funcionando como nuevo: brazos y bisagras nuevos, tapa del citófono y luz indirecta.",
  },
  {
    slug: "habitacion-principal",
    nombre: "Habitación principal",
    icono: "aire",
    resumen: "Aire acondicionado mini split de 12.000 BTU inverter, con acometida de 220 V.",
    intencion:
      "Un mini split de 12.000 BTU inverter en la habitación principal, bien instalado y con el drenaje resuelto, sin cables ni tubería a la vista. Necesitó una acometida eléctrica de 220 V que no estaba en la cotización original.",
  },
  {
    slug: "banos",
    nombre: "Baños",
    icono: "grifo",
    resumen: "Lavamanos con mueble en los dos baños y cabina de la ducha. Faltan los espejos.",
    intencion:
      "Son dos baños: el social, que da al corredor, y el de la habitación principal. En los dos se cambió el lavamanos por un combo con mueble y la cabina de la ducha se limpió y se volvió a siliconar. Faltan por cotizar los espejos de los dos baños.",
    pendientes: ["Espejos en los dos baños"],
    notas: [
      "La cabina cotizada es una sola: confirmar con Óscar en cuál de los dos baños se hizo.",
      "En el plano sólo está dibujado el baño social; el de la habitación principal queda dentro de ella.",
    ],
  },
  {
    slug: "corredor",
    nombre: "Corredor",
    icono: "luzIndirecta",
    resumen:
      "Pendiente de confirmar por Óscar: luces indirectas, moldura de madera junto al balcón, entrepaños y cajas para tomas.",
    intencion:
      "Iluminar con apliques dirigidos el muro que queda entre la habitación principal y el estudio, donde van a ir los cuadros, como en la referencia. Además, una moldura de madera en el muro al lado del balcón, entrepaños, y las cajas para los tomas eléctricos que hagan falta.",
    pendientes: [
      "Luces indirectas para los cuadros del muro del corredor",
      "Moldura de madera en el muro al lado del balcón",
      "Entrepaños",
      "Cajas para tomas eléctricos",
    ],
    notas: [
      "Estos cuatro trabajos están pendientes de que Óscar los confirme y los cotice. Cuando llegue la cotización, se agrega aquí.",
    ],
  },
  {
    slug: "balcon",
    nombre: "Balcón",
    icono: "baranda",
    resumen: "Pintura de la reja del balcón.",
    intencion: "Dejar la reja del balcón repintada, pareja y sin óxido.",
  },
];

export function getEspacio(slug: string) {
  return ESPACIOS.find((e) => e.slug === slug);
}
