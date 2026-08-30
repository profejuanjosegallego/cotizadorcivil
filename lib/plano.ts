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
  | "puerta";

export type Zona = {
  slug: string | null;
  label: string;
  sub?: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

export const VIEWBOX = "0 0 820 474";
/** Ancho mínimo en píxeles para que el plano siga siendo legible en el celular. */
export const PLANO_MIN_ANCHO = 660;

export const ZONAS: Zona[] = [
  { slug: "balcon", label: "BALCÓN", x: 30, y: 30, w: 109, h: 307 },
  { slug: "comedor", label: "SALA", sub: "COMEDOR", x: 139, y: 30, w: 280, h: 94 },
  { slug: "cocina", label: "COCINA", x: 419, y: 30, w: 331, h: 94 },
  { slug: "corredor", label: "CORREDOR", x: 139, y: 124, w: 456, h: 98 },
  { slug: null, label: "ENTRADA", x: 595, y: 124, w: 155, h: 98 },
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
  { slug: "cuarto-util", label: "CUARTO ÚTIL", x: 478, y: 337, w: 272, h: 119 },
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
    x: 190,
    y: 60,
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
    x: 195,
    y: 178,
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
    titulo: "Demoler el muro actual y cerrar el estudio del cuarto útil",
  },
  {
    n: 9,
    slug: "cuarto-util",
    x: 520,
    y: 370,
    icono: "baldosa",
    titulo: "Estantería con rieles y baldosa nueva en el cuarto útil",
  },
];

/** Vanos: se pintan encima del muro para abrir la puerta o la ventana. */
export const VANOS = [
  { x: 134, y: 50, w: 10, h: 46 }, // salida al balcón
  { x: 210, y: 119, w: 60, h: 10 }, // paso sala–corredor
  { x: 745, y: 148, w: 10, h: 50 }, // puerta principal del apartamento
  { x: 185, y: 217, w: 52, h: 10 }, // puerta habitación principal
  { x: 398, y: 217, w: 44, h: 10 }, // puerta baño
  { x: 520, y: 217, w: 52, h: 10 }, // puerta estudio
  { x: 745, y: 372, w: 10, h: 48 }, // puerta del cuarto útil, desde el edificio
];

export const INK = "#141414";
export const CLAY = "#B4633A";
export const PAPER = "#FAF9F6";
export const MOSS = "#5C6B4F";
