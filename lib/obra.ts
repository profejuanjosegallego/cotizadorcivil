import type { IconoNombre } from "@/lib/plano";

export type Unidad = "m2" | "ml" | "und" | "global";

export type Item = {
  id: string;
  titulo: string;
  detalle: string;
  unidad: Unidad;
  icono: IconoNombre;
  /** Marca el ítem como el foco del espacio. */
  destacado?: boolean;
};

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
  items: Item[];
  /** Aclaraciones que el contratista debe leer antes de cotizar. */
  notas?: string[];
};

export const ESPACIOS: Espacio[] = [
  {
    slug: "general",
    nombre: "Todo el apartamento",
    icono: "pintura",
    resumen:
      "Resane, estuco y pintura completa, más el repaso fino de los apliques de las luces indirectas.",
    intencion:
      "Que el apartamento quede parejo y limpio de arriba a abajo: sin fisuras ni parches visibles, cornisas y luces indirectas prolijas, y todo en Pintuco Blanco Luminoso.",
    fotos: [
      {
        src: "/img/corredor2.jpg",
        alt: "Cornisa y luz indirecta del corredor",
        pie: "Las cornisas con luz indirecta son el punto crítico: es donde más se nota un acabado descuidado.",
      },
    ],
    referencias: [],
    items: [
      {
        id: "gen-resane",
        titulo: "Resane completo de muros y cielos",
        detalle:
          "Retiro de pintura suelta, resane de fisuras, huecos de chazos, remates de instalaciones y bordes de cornisa en todo el apartamento.",
        unidad: "m2",
        icono: "muro",
        destacado: true,
      },
      {
        id: "gen-estuco",
        titulo: "Estuco",
        detalle:
          "Estuco sobre las áreas resanadas y donde se requiera, para dejar el muro liso y a plomo antes de pintar.",
        unidad: "m2",
        icono: "muro",
      },
      {
        id: "gen-pintura",
        titulo: "Pintura Pintuco Blanco Luminoso — 2 manos",
        detalle:
          "Muros y cielos en Pintuco Blanco Luminoso, mínimo dos manos, acabado parejo y sin sombras. Incluye protección de pisos, marcos y ventanería.",
        unidad: "m2",
        icono: "pintura",
        destacado: true,
      },
      {
        id: "gen-apliques",
        titulo: "Revisión y acabado fino de apliques en luces indirectas",
        detalle:
          "Revisar uno a uno los apliques y remates de las cornisas de luz indirecta: alineación, silicona, empates y pintura, para que queden prolijos y sin desniveles visibles al encender la luz.",
        unidad: "ml",
        icono: "luzIndirecta",
        destacado: true,
      },
      {
        id: "gen-aseo",
        titulo: "Aseo final y retiro de escombros",
        detalle:
          "Aseo general al terminar la obra y retiro de escombros y sobrantes del edificio.",
        unidad: "global",
        icono: "muro",
      },
    ],
    notas: [
      "La pintura es Pintuco Blanco Luminoso. Por favor cotizar esa referencia, no un equivalente.",
      "Los metros cuadrados los mide y confirma el contratista en sitio; el formulario arranca en cero a propósito.",
    ],
  },
  {
    slug: "estudio",
    nombre: "Estudio",
    icono: "muro",
    resumen:
      "Devolver el muro a su posición original para que el estudio recupere el área que le quitaron.",
    intencion:
      "La dueña anterior corrió el muro hacia el estudio para agrandar el cuarto útil y alquilarlo aparte. Queremos deshacer eso: demoler el muro donde está hoy y levantarlo en su posición original, para que el estudio vuelva a sus dimensiones. Además, su lámpara de techo.",
    fotos: [
      {
        src: "/img/estudio.jpg",
        alt: "Estudio actual con el muro corrido y la columna",
        pie: "Estado actual del estudio. El muro del fondo es el que se corrió hacia adentro y hay que devolver a su sitio.",
      },
    ],
    referencias: [
      {
        src: "/img/ref-lampara-estudio.webp",
        alt: "Lámpara LED cuadrada de techo con marco negro",
        pie: "Lámpara que queremos en el estudio: panel LED cuadrado de sobreponer, marco negro delgado.",
      },
    ],
    items: [
      {
        id: "est-demolicion",
        titulo: "Demolición y retiro del muro actual",
        detalle:
          "Demoler el muro que hoy divide el estudio del cuarto útil, retirar el material y dejar el área limpia. Incluye protección del piso y de los espacios vecinos.",
        unidad: "m2",
        icono: "muro",
        destacado: true,
      },
      {
        id: "est-muro-original",
        titulo: "Muro nuevo en la posición original",
        detalle:
          "Levantar el muro de piso a cielo donde estaba originalmente, sin puerta ni vano: al cuarto útil se sigue entrando por el corredor del edificio. Mampostería o drywall, según lo que el contratista recomiende, con su acabado listo para estuco y pintura.",
        unidad: "m2",
        icono: "muro",
        destacado: true,
      },
      {
        id: "est-piso-recuperado",
        titulo: "Empate de piso en la franja recuperada",
        detalle:
          "Donde estaba el muro viejo y en la franja que vuelve al estudio, empatar el piso con el enchape existente para que quede continuo, a nivel y sin línea visible.",
        unidad: "m2",
        icono: "baldosa",
        destacado: true,
      },
      {
        id: "est-cielo-cornisa",
        titulo: "Empate de cielo, cornisa y guarda escoba",
        detalle:
          "Continuar cornisa, cielo y guarda escoba en la franja recuperada, de modo que no se vea dónde estaba el muro anterior.",
        unidad: "ml",
        icono: "pintura",
      },
      {
        id: "est-electrico",
        titulo: "Ajuste de puntos eléctricos afectados",
        detalle:
          "Reubicar o crear los interruptores y tomas que queden afectados por la demolición y el muro nuevo, dejando el estudio con su propio control de luz.",
        unidad: "global",
        icono: "electrico",
      },
      {
        id: "est-lampara",
        titulo: "Suministro e instalación de lámpara LED de techo",
        detalle:
          "Panel LED cuadrado de sobreponer con marco negro, según la imagen de referencia. Si la lámpara la compramos nosotros, por favor cotizar sólo la instalación y decirlo en observaciones.",
        unidad: "und",
        icono: "luz",
        destacado: true,
      },
      {
        id: "est-remates",
        titulo: "Resane y remates de la zona intervenida",
        detalle:
          "Resane de muros, cielo y encuentros donde estaba el muro viejo, listo para estuco y pintura.",
        unidad: "global",
        icono: "pintura",
      },
    ],
    notas: [
      "Hay que ubicar en sitio dónde quedaba el muro original: casi siempre se alcanza a ver la huella en el piso, en el cielo o en el corte de la cornisa. De ahí sale la medida real de la franja que se recupera.",
      "El muro nuevo no lleva puerta: los dos espacios ya están separados y al cuarto útil se entra por el corredor del edificio.",
      "El sistema constructivo (bloque, ladrillo o drywall) queda a recomendación del contratista: nos interesa el resultado, no el material específico.",
    ],
  },
  {
    slug: "cuarto-util",
    nombre: "Cuarto útil",
    icono: "estanteria",
    resumen:
      "Retirar la cocineta, el baño y la ducha, y dejarlo con baldosa resistente y estantería con rieles.",
    intencion:
      "El cuarto útil hoy tiene cocineta, baño y ducha porque la dueña anterior lo acondicionó para alquilar. Queremos sacar todo eso, devolverlo a sus dimensiones originales y dejarlo como lo que es: un depósito bien resuelto, con piso resistente y una estantería con rieles que se pueda reconfigurar.",
    fotos: [],
    referencias: [],
    items: [
      {
        id: "cu-desmonte-cocineta",
        titulo: "Desmonte y retiro de la cocineta",
        detalle:
          "Retiro del mesón, el lavaplatos, los gabinetes y todo lo que compone la cocineta, con evacuación del material.",
        unidad: "global",
        icono: "cocineta",
        destacado: true,
      },
      {
        id: "cu-desmonte-bano",
        titulo: "Desmonte y retiro del baño y la ducha",
        detalle:
          "Retiro de sanitario, lavamanos, ducha, división o cortinero, puerta si la tiene, y de los muros o poyos que se hayan levantado para armar el baño.",
        unidad: "global",
        icono: "bano",
        destacado: true,
      },
      {
        id: "cu-anulacion-puntos",
        titulo: "Anulación y sellado de puntos hidráulicos, sanitarios y de gas",
        detalle:
          "Cerrar y sellar en debida forma las acometidas de agua, el desagüe del sanitario y el de la ducha, y el punto de gas si existe. El desagüe debe quedar sellado y sin olores. Dejar registro fotográfico de cómo quedó antes de tapar.",
        unidad: "global",
        icono: "ducha",
        destacado: true,
      },
      {
        id: "cu-retiro-enchapes",
        titulo: "Retiro de enchapes y resane de muros",
        detalle:
          "Picar y retirar el enchape de muro del baño y del salpicadero de la cocineta, y resanar toda la superficie para dejarla lista para estuco y pintura.",
        unidad: "m2",
        icono: "muro",
      },
      {
        id: "cu-electrico",
        titulo: "Anulación o traslado de los puntos eléctricos de los servicios",
        detalle:
          "Anular o reubicar los tomas, interruptores y salidas que quedaron de la cocineta y el baño, dejando el cuarto con la iluminación y los tomas que sí necesita.",
        unidad: "global",
        icono: "electrico",
      },
      {
        id: "cu-baldosa",
        titulo: "Baldosa resistente en el piso",
        detalle:
          "Piso de alto tráfico: porcelánico o gres de buena dureza, que aguante peso y arrastre, porque aquí se guardan cosas pesadas. Instalado sobre contrapiso nivelado y con pegante para alto tráfico. Por favor proponer la referencia y decir en observaciones qué resistencia tiene.",
        unidad: "m2",
        icono: "carga",
        destacado: true,
      },
      {
        id: "cu-estanteria",
        titulo: "Estantería con rieles — diseño del equipo de Óscar",
        detalle:
          "Sistema de rieles verticales anclados al muro, con ménsulas y entrepaños regulables en altura, como el esquema de esta página. Debe soportar carga: por favor indicar en observaciones cuántos kilos aguanta cada entrepaño.",
        unidad: "ml",
        icono: "estanteria",
        destacado: true,
      },
      {
        id: "cu-guardaescoba",
        titulo: "Guarda escoba y remates de piso",
        detalle: "Guarda escoba perimetral y remates en el vano de la puerta.",
        unidad: "ml",
        icono: "baldosa",
      },
    ],
    notas: [
      "El acceso es por el corredor común del edificio. Hay que coordinar con la administración los horarios y el manejo de escombros y materiales por zonas comunes.",
      "Antes de sellar los desagües avísenos: queremos ver cómo quedan, porque un sellado mal hecho después huele.",
      "Necesitamos que el equipo de Óscar mande el diseño de la estantería, con medidas y capacidad de carga, antes de comprar material.",
      "Si la baldosa la escogemos nosotros, por favor separar en la cotización el valor del material y el de la mano de obra.",
    ],
  },
  {
    slug: "cocina",
    nombre: "Cocina",
    icono: "estufa",
    resumen: "Mantenimiento general de la estufa y cambio de la llave del lavaplatos.",
    intencion:
      "La cocina está bien; sólo necesita puesta a punto. Dejar la estufa funcionando como nueva y cambiar la grifería del lavaplatos.",
    fotos: [
      {
        src: "/img/cocina.jpg",
        alt: "Cocina actual con estufa a gas empotrada y lavaplatos",
        pie: "Estufa de 4 puestos empotrada en el mesón y lavaplatos con la llave que se va a cambiar.",
      },
    ],
    referencias: [],
    items: [
      {
        id: "coc-estufa",
        titulo: "Mantenimiento general de la estufa",
        detalle:
          "Limpieza profunda de quemadores y parrillas, revisión y ajuste de inyectores, verificación de la llegada de gas y de que todos los puestos enciendan parejo. Reportar si alguna pieza necesita reemplazo.",
        unidad: "und",
        icono: "estufa",
        destacado: true,
      },
      {
        id: "coc-llave",
        titulo: "Cambio de la llave del lavaplatos",
        detalle:
          "Desmonte de la grifería actual, suministro e instalación de una llave nueva, revisión de acoples y sifón, y prueba de fugas.",
        unidad: "und",
        icono: "grifo",
        destacado: true,
      },
    ],
    notas: [
      "Si al revisar la estufa encuentran algo que valga la pena cambiar (perillas, inyectores, chispero), por favor cotizarlo aparte en las observaciones.",
    ],
  },
  {
    slug: "habitacion-principal",
    nombre: "Habitación principal",
    icono: "aire",
    resumen: "Instalación de aire acondicionado de 9.000 BTU.",
    intencion:
      "Poner un mini split de 9.000 BTU en la habitación principal, bien instalado y con el drenaje resuelto, sin cables ni tubería a la vista.",
    fotos: [
      {
        src: "/img/principal.jpg",
        alt: "Habitación principal con salida eléctrica junto a la ventana",
        pie: "Ya hay una salida eléctrica preparada en el muro junto a la ventana. Hay que revisar si sirve para el aire.",
      },
    ],
    referencias: [],
    items: [
      {
        id: "hab-aire",
        titulo: "Suministro e instalación de aire acondicionado 9.000 BTU",
        detalle:
          "Mini split de 9.000 BTU, preferiblemente inverter. Incluye unidad interior, unidad exterior, soportes, tubería de refrigeración y puesta en marcha.",
        unidad: "und",
        icono: "aire",
        destacado: true,
      },
      {
        id: "hab-punto",
        titulo: "Punto eléctrico y acometida para el aire",
        detalle:
          "Verificar si la salida existente sirve. Si no, acometida nueva desde el tablero con breaker independiente, calibre adecuado y protección.",
        unidad: "und",
        icono: "electrico",
      },
      {
        id: "hab-drenaje",
        titulo: "Perforación de muro, drenaje y remates",
        detalle:
          "Perforación para pasar la tubería, ruta de drenaje de condensados hacia un desagüe, canaleta o embebido, y resane y pintura de la zona intervenida.",
        unidad: "global",
        icono: "muro",
      },
    ],
    notas: [
      "En la foto se ve una salida eléctrica con cable colgando junto a la ventana: por favor confirmar si esa acometida sirve para el aire o si toca traer una nueva desde el tablero.",
      "Confirmar con la administración del edificio dónde se puede anclar la unidad exterior antes de instalar.",
    ],
  },
  {
    slug: "comedor",
    nombre: "Sala comedor",
    icono: "luz",
    resumen: "Lámpara colgante sobre la mesa del comedor.",
    intencion:
      "Colgar una lámpara sobre la mesa del comedor: centrada, a la altura correcta y con luz cálida.",
    fotos: [
      {
        src: "/img/comedor.jpg",
        alt: "Zona de comedor entre la barra de la cocina y el balcón",
        pie: "La zona del comedor, entre la barra de la cocina y la salida al balcón. Ahí va la lámpara colgante.",
      },
    ],
    referencias: [
      {
        src: "/img/ref-lampara-comedor.webp",
        alt: "Lámpara colgante blanca con detalle en madera",
        pie: "Lámpara que queremos: pantalla blanca tipo campana con cuello en madera.",
      },
    ],
    items: [
      {
        id: "com-lampara",
        titulo: "Suministro e instalación de lámpara colgante",
        detalle:
          "Lámpara colgante blanca con detalle en madera, según la imagen de referencia. Instalada centrada sobre donde va la mesa y a la altura correcta (aprox. 75–85 cm sobre la superficie de la mesa).",
        unidad: "und",
        icono: "luz",
        destacado: true,
      },
      {
        id: "com-punto",
        titulo: "Traslado o creación del punto eléctrico",
        detalle:
          "Llevar la salida de techo al centro exacto de donde va la mesa, con su resane y pintura. Incluye interruptor.",
        unidad: "und",
        icono: "electrico",
      },
    ],
    notas: [
      "Antes de romper el cielo, definimos juntos en sitio el punto exacto donde va a quedar la mesa.",
    ],
  },
  {
    slug: "corredor",
    nombre: "Corredor",
    icono: "luzIndirecta",
    resumen:
      "Luz indirecta sobre el muro del corredor y estantería empotrada con luz al fondo.",
    intencion:
      "El corredor es hoy un espacio muerto. Queremos dos cosas: iluminar con apliques dirigidos el muro que queda entre la habitación principal y el estudio, como en la referencia, y aprovechar el fondo del corredor con una estantería empotrada con luz LED integrada.",
    fotos: [
      {
        src: "/img/corredor.jpg",
        alt: "Corredor con cornisa de luz indirecta",
        pie: "El corredor actual, con la cornisa de luz indirecta que se va a repasar.",
      },
      {
        src: "/img/corredor2.jpg",
        alt: "Fondo del corredor, espacio disponible",
        pie: "El espacio disponible al fondo, donde va la estantería empotrada.",
      },
    ],
    referencias: [
      {
        src: "/img/ref-lampara-indirecta.jpg",
        alt: "Apliques dirigidos sobre cuadros en el muro de un corredor",
        pie: "Así queremos el muro del corredor: apliques pequeños de sobreponer que lo bañan con luz cálida.",
      },
      {
        src: "/img/ref-estanteria-fondo.png",
        alt: "Estantería empotrada en madera con tiras LED en cada entrepaño",
        pie: "Así queremos el fondo del corredor: estantería empotrada en madera, con tira LED bajo cada entrepaño.",
      },
    ],
    items: [
      {
        id: "cor-apliques",
        titulo: "Apliques de luz indirecta sobre el muro del corredor",
        detalle:
          "Apliques pequeños de sobreponer en el cielo, dirigidos hacia el muro que queda entre la habitación principal y el estudio, para bañarlo con luz cálida como en la referencia. Definir cantidad y separación según el ancho del muro.",
        unidad: "und",
        icono: "luzIndirecta",
        destacado: true,
      },
      {
        id: "cor-punto-apliques",
        titulo: "Punto eléctrico e interruptor para los apliques",
        detalle:
          "Acometida desde el circuito de iluminación hasta los apliques, con interruptor propio para poder dejarlos encendidos solos.",
        unidad: "und",
        icono: "electrico",
      },
      {
        id: "cor-estanteria",
        titulo: "Estantería empotrada al fondo del corredor",
        detalle:
          "Mueble a la medida del vano disponible al fondo, en madera o enchapado en madera, con entrepaños y base cerrada, según la imagen de referencia.",
        unidad: "und",
        icono: "estanteria",
        destacado: true,
      },
      {
        id: "cor-led-estanteria",
        titulo: "Iluminación LED integrada en la estantería",
        detalle:
          "Tira LED cálida oculta bajo cada entrepaño, con su driver, canaleta y control. Que no se vea la fuente de luz, sólo el efecto.",
        unidad: "ml",
        icono: "luzIndirecta",
        destacado: true,
      },
      {
        id: "cor-toma",
        titulo: "Punto eléctrico y toma para la estantería",
        detalle:
          "Toma eléctrica escondida dentro del mueble, para el driver de las tiras LED y para conectar cosas en los entrepaños.",
        unidad: "und",
        icono: "electrico",
      },
    ],
    notas: [
      "El muro de los apliques es el del corredor que queda entre la habitación principal y el estudio: ahí después colgamos cuadros, así que la luz debe quedar centrada sobre esa superficie. Lo confirmamos juntos en sitio.",
      "Para la estantería del fondo necesitamos las medidas exactas del vano antes de mandar a hacer el mueble.",
    ],
  },
  {
    slug: "balcon",
    nombre: "Balcón",
    icono: "baranda",
    resumen: "Quitar la malla de gatos y repintar las barandas.",
    intencion:
      "Recuperar el balcón: sacar la malla y dejar las barandas repintadas y sin óxido.",
    fotos: [],
    referencias: [],
    items: [
      {
        id: "bal-malla",
        titulo: "Desmonte y retiro de la malla de gatos",
        detalle:
          "Retirar la malla completa con sus anclajes, y resanar los huecos y marcas que queden en muro, cielo y baranda.",
        unidad: "global",
        icono: "baranda",
        destacado: true,
      },
      {
        id: "bal-preparacion",
        titulo: "Limpieza, lijado y anticorrosivo de barandas",
        detalle:
          "Retiro de óxido y pintura suelta, lijado y aplicación de anticorrosivo en toda la baranda antes de pintar.",
        unidad: "ml",
        icono: "baranda",
      },
      {
        id: "bal-pintura",
        titulo: "Repintada de barandas",
        detalle:
          "Esmalte para exteriores, mínimo dos manos, acabado parejo y sin goteos.",
        unidad: "ml",
        icono: "pintura",
        destacado: true,
      },
    ],
    notas: [
      "Confirmar con la administración del edificio si el color de las barandas está definido por el reglamento de fachada.",
    ],
  },
];

export const TODOS_LOS_ITEMS = ESPACIOS.flatMap((e) =>
  e.items.map((i) => ({ ...i, espacioSlug: e.slug, espacioNombre: e.nombre }))
);

export function getEspacio(slug: string) {
  return ESPACIOS.find((e) => e.slug === slug);
}

export const UNIDAD_LABEL: Record<Unidad, string> = {
  m2: "m²",
  ml: "ml",
  und: "und",
  global: "global",
};

export const UNIDAD_AYUDA: Record<Unidad, string> = {
  m2: "metros cuadrados",
  ml: "metros lineales",
  und: "unidades",
  global: "precio global",
};
