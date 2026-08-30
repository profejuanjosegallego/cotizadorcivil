/**
 * Geometría del plano del apartamento, trazada sobre la distribución real.
 * No está a escala: sirve para ubicar cada intervención y para navegar.
 * Las medidas reales las toma el contratista en sitio.
 *
 * Dato clave: el CUARTO ÚTIL no se comunica con el apartamento. Cuelga del
 * costado del estudio y se entra por el corredor común del edificio, igual que
 * la puerta principal del apartamento.
 */

export type IconoNombre =
  | "luz"
  | "luzIndirecta"
  | "aire"
  | "estanteria"
  | "muro"
  | "pintura"
  | "baldosa"
  | "grifo"
  | "estufa"
  | "baranda"
  | "electrico"
  | "puerta"
  | "bano"
  | "ducha"
  | "cocineta"
  | "carga";

export type Zona = {
  slug: string | null;
  label: string;
  sub?: string;
  x: number;
  y: number;
  w: number;
  h: number;
  /** Corrimiento vertical de la etiqueta cuando el centro está ocupado. */
  labelDy?: number;
};

export const VIEWBOX = "0 0 820 474";
/** Ancho mínimo en píxeles para que el plano siga siendo legible en el celular. */
export const PLANO_MIN_ANCHO = 660;

export const ZONAS: Zona[] = [
  { slug: "balcon", label: "BALCÓN", x: 30, y: 30, w: 109, h: 307 },
  { slug: "comedor", label: "SALA", sub: "COMEDOR", x: 139, y: 30, w: 280, h: 94 },
  { slug: "cocina", label: "COCINA", x: 419, y: 30, w: 331, h: 94 },
  // El corredor arranca en la puerta principal y llega derecho hasta el balcón:
  // la entrada no es un espacio aparte, es su comienzo.
  { slug: "corredor", label: "CORREDOR", x: 139, y: 124, w: 611, h: 98 },
  {
    slug: "habitacion-principal",
    label: "HABITACIÓN",
    sub: "PRINCIPAL",
    x: 139,
    y: 222,
    w: 220,
    h: 115,
  },
  { slug: null, label: "BAÑO", x: 359, y: 222, w: 119, h: 115 },
  { slug: "estudio", label: "ESTUDIO", x: 478, y: 222, w: 272, h: 115 },
  { slug: "cuarto-util", label: "CUARTO ÚTIL", x: 478, y: 337, w: 272, h: 119, labelDy: 16 },
];

export type Marca = {
  n: number;
  slug: string;
  x: number;
  y: number;
  titulo: string;
  icono: IconoNombre;
};

export const MARCAS: Marca[] = [
  {
    n: 1,
    slug: "balcon",
    x: 84,
    y: 250,
    icono: "baranda",
    titulo: "Quitar la malla de gatos y repintar las barandas",
  },
  {
    n: 2,
    slug: "comedor",
    x: 210,
    y: 48,
    icono: "luz",
    titulo: "Lámpara colgante sobre la mesa del comedor",
  },
  {
    n: 3,
    slug: "cocina",
    x: 470,
    y: 60,
    icono: "estufa",
    titulo: "Mantenimiento de la estufa y cambio de la llave del lavaplatos",
  },
  {
    n: 4,
    slug: "corredor",
    x: 205,
    y: 112,
    icono: "estanteria",
    titulo: "Estantería empotrada con luz LED al fondo del corredor",
  },
  {
    n: 5,
    slug: "corredor",
    x: 430,
    y: 145,
    icono: "luzIndirecta",
    titulo:
      "Apliques de luz indirecta sobre el muro del corredor, entre la habitación principal y el estudio",
  },
  {
    n: 6,
    slug: "habitacion-principal",
    x: 330,
    y: 250,
    icono: "aire",
    titulo: "Aire acondicionado de 9.000 BTU",
  },
  {
    n: 7,
    slug: "estudio",
    x: 700,
    y: 262,
    icono: "luz",
    titulo: "Lámpara LED de techo en el estudio",
  },
  {
    n: 8,
    slug: "estudio",
    x: 545,
    y: 337,
    icono: "muro",
    titulo: "Devolver el muro a su posición original y recuperar el área del estudio",
  },
  {
    n: 9,
    slug: "cuarto-util",
    x: 520,
    y: 405,
    icono: "carga",
    titulo: "Baldosa resistente y estantería con rieles en el cuarto útil",
  },
  {
    n: 10,
    slug: "cuarto-util",
    x: 703,
    y: 415,
    icono: "bano",
    titulo: "Retirar la cocineta, el baño y la ducha que se instalaron para alquilar",
  },
];

/**
 * Vanos: se pintan encima del muro para abrirlo.
 *
 * La mitad social del apartamento —sala, comedor, cocina, corredor y la entrada—
 * es un solo espacio abierto: no hay muros ni puertas entre ellos. Lo único que
 * separa la cocina de la entrada es la barra americana.
 */
export const VANOS = [
  { x: 141, y: 119, w: 276, h: 10 }, // sala comedor abierta al corredor
  { x: 414, y: 34, w: 10, h: 86 }, // sala comedor abierta a la cocina
  { x: 597, y: 119, w: 151, h: 10 }, // cocina abierta al corredor, con la barra
  { x: 134, y: 162, w: 10, h: 52 }, // salida al balcón, junto a la estantería del fondo
  { x: 745, y: 148, w: 10, h: 50 }, // puerta principal del apartamento
  { x: 185, y: 217, w: 52, h: 10 }, // puerta habitación principal
  { x: 398, y: 217, w: 44, h: 10 }, // puerta baño
  { x: 520, y: 217, w: 52, h: 10 }, // puerta estudio
  { x: 745, y: 372, w: 10, h: 48 }, // puerta del cuarto útil, desde el edificio
];

/** Bordes sin muro: se marcan punteados para que el espacio se lea continuo. */
export const BORDES_ABIERTOS = [
  { x1: 176, y1: 124, x2: 417, y2: 124, nota: "sin muro · espacio continuo" },
  { x1: 419, y1: 36, x2: 419, y2: 118, nota: null },
  { x1: 599, y1: 124, x2: 746, y2: 124, nota: null },
];

/**
 * Barra americana: sale en voladizo del mesón de la cocina hacia la entrada,
 * apoyada al final en una pata metálica. Se puede rodear por los dos lados.
 */
export const BARRA = { x: 638, y: 58, w: 15, h: 92 };

/** Muro actual entre estudio y cuarto útil (el que corrió la dueña anterior). */
export const MURO_ACTUAL_Y = 337;
/** Posición original del muro, a la que se devuelve. Se confirma en sitio. */
export const MURO_ORIGINAL_Y = 376;

export const INK = "#141414";
export const CLAY = "#B4633A";
export const PAPER = "#FAF9F6";
export const MOSS = "#5C6B4F";
