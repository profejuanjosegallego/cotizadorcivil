import type { IconoNombre } from "@/lib/plano";

export type Referencia = {
  src: string;
  alt: string;
  pie: string;
};

export type Espacio = {
  slug: string;
  nombre: string;
  icono: IconoNombre;
  resumen: string;
  intencion: string;
  fotos: Referencia[];
  referencias: Referencia[];
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
    fotos: [
      {
        src: "/img/corredor2.jpg",
        alt: "Cornisa y luz indirecta del corredor",
        pie: "Las cornisas con luz indirecta son el punto crítico: es donde más se nota un acabado descuidado.",
      },
    ],
    referencias: [],
    notas: ["La pintura es Pintuco Blanco Luminoso, no un equivalente."],
  },
  {
    slug: "estudio",
    nombre: "Estudio",
    icono: "muro",
    resumen: "Demolición del muro con el cuarto útil y reparación del piso y el guarda escoba.",
    intencion:
      "La dueña anterior corrió el muro hacia el estudio para agrandar el cuarto útil y alquilarlo aparte. Queremos deshacer eso: demoler el muro donde está hoy y levantarlo en su posición original, para que el estudio vuelva a sus dimensiones. En la franja que se recupera hay que reparar el piso y continuar el guarda escoba.",
    fotos: [
      {
        src: "/img/estudio.jpg",
        alt: "Estudio actual con el muro corrido y la columna",
        pie: "Estado actual del estudio. El muro del fondo es el que se corrió hacia adentro y hay que devolver a su sitio.",
      },
    ],
    referencias: [],
    notas: [
      "La cotización 1 cubre la demolición del muro y la reparación del piso. El muro nuevo en la posición original no aparece cotizado: confirmar con Óscar si entra en la cotización del cuarto útil.",
      "Dónde quedaba el muro original se confirma en sitio: casi siempre se ve la huella en el piso, en el cielo o en el corte de la cornisa.",
    ],
  },
  {
    slug: "cuarto-util",
    nombre: "Cuarto útil",
    icono: "estanteria",
    resumen: "Pendiente de cotizar: retiro de la cocineta, el baño y la ducha, piso y estantería.",
    intencion:
      "El cuarto útil hoy tiene cocineta, baño y ducha porque la dueña anterior lo acondicionó para alquilar. Queremos sacar todo eso, devolverlo a sus dimensiones originales y dejarlo como lo que es: un depósito bien resuelto, con piso resistente y una estantería con rieles que se pueda reconfigurar.",
    fotos: [],
    referencias: [],
    pendientes: [
      "Retiro de la cocineta, el baño y la ducha, con sellado de los puntos de agua, desagüe y gas",
      "Baldosa resistente en el piso y guarda escoba",
      "Estantería con rieles y entrepaños regulables",
    ],
    notas: [
      "Óscar todavía no envía la cotización del cuarto útil. Cuando llegue, se agrega aquí.",
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
    fotos: [
      {
        src: "/img/cocina.jpg",
        alt: "Cocina actual con estufa a gas empotrada y lavaplatos",
        pie: "La cocina actual. El mortero va en el mesón del horno; el gabinete es el que se repara.",
      },
    ],
    referencias: [],
  },
  {
    slug: "habitacion-principal",
    nombre: "Habitación principal",
    icono: "aire",
    resumen: "Aire acondicionado mini split de 12.000 BTU inverter, con acometida de 220 V.",
    intencion:
      "Un mini split de 12.000 BTU inverter en la habitación principal, bien instalado y con el drenaje resuelto, sin cables ni tubería a la vista. Necesitó una acometida eléctrica de 220 V que no estaba en la cotización original.",
    fotos: [
      {
        src: "/img/principal.jpg",
        alt: "Habitación principal con salida eléctrica junto a la ventana",
        pie: "La salida eléctrica junto a la ventana no servía: se hizo una acometida nueva de 220 V.",
      },
    ],
    referencias: [],
  },
  {
    slug: "banos",
    nombre: "Baños",
    icono: "grifo",
    resumen: "Lavamanos con mueble en los dos baños y arreglo de la cabina de la ducha.",
    intencion:
      "Son dos baños: el social, que da al corredor, y el de la habitación principal. En los dos se cambia el lavamanos por un combo con mueble. La cabina de la ducha se limpia y se vuelve a siliconar.",
    fotos: [],
    referencias: [],
    notas: [
      "La cabina cotizada es una sola: confirmar con Óscar en cuál de los dos baños se hizo.",
      "En el plano sólo está dibujado el baño social; el de la habitación principal queda dentro de ella.",
    ],
  },
  {
    slug: "corredor",
    nombre: "Corredor",
    icono: "luzIndirecta",
    resumen: "Pendiente de cotizar: luces indirectas para los cuadros y moldura de madera.",
    intencion:
      "Iluminar con apliques dirigidos el muro que queda entre la habitación principal y el estudio, donde van a ir los cuadros, como en la referencia. Además, una moldura de madera.",
    fotos: [
      {
        src: "/img/corredor.jpg",
        alt: "Corredor con cornisa de luz indirecta",
        pie: "El corredor actual, con la cornisa de luz indirecta.",
      },
    ],
    referencias: [
      {
        src: "/img/ref-lampara-indirecta.jpg",
        alt: "Apliques dirigidos sobre cuadros en el muro de un corredor",
        pie: "Así queremos el muro del corredor: apliques pequeños de sobreponer que lo bañan con luz cálida.",
      },
    ],
    pendientes: [
      "Luces indirectas para los cuadros del muro del corredor",
      "Moldura de madera (ubicación por confirmar)",
    ],
    notas: ["Óscar todavía no envía la cotización de estos dos trabajos. Cuando llegue, se agrega aquí."],
  },
  {
    slug: "balcon",
    nombre: "Balcón",
    icono: "baranda",
    resumen: "Pintura de la reja del balcón.",
    intencion: "Dejar la reja del balcón repintada, pareja y sin óxido.",
    fotos: [],
    referencias: [],
  },
];

export function getEspacio(slug: string) {
  return ESPACIOS.find((e) => e.slug === slug);
}
