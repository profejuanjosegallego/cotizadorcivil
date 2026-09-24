/**
 * Cotizaciones que envió Óscar y pagos que se le hicieron, transcritos de los
 * archivos de `reportes/` (las imágenes viven en public/cotizaciones y
 * public/pagos). Esta es la fuente de verdad de las cuentas de la obra.
 *
 * Cada línea de cotización apunta al espacio (slug de lib/obra.ts) donde se
 * ejecuta. Los pagos se cruzan con las cotizaciones a través de CUENTAS: una
 * cuenta agrupa las cotizaciones que se liquidaron con los mismos pagos.
 */

export type Linea = {
  /** Único en toda la obra: es la llave del seguimiento en Mongo. */
  id: string;
  /** Slug del espacio de lib/obra.ts. */
  espacio: string;
  descripcion: string;
  cantidad?: number;
  valorUnitario?: number;
  manoObra: number;
  /** Materiales y otros costos (transporte, costales…), como los separa Óscar. */
  materiales: number;
  nota?: string;
};

export type Cotizacion = {
  numero: number;
  servicio: string;
  /** ISO, sin hora. */
  fecha: string;
  /** Imagen original de la cotización, descargable. */
  archivo: string;
  lineas: Linea[];
  nota?: string;
};

export type Pago = {
  numero: number;
  /** ISO con hora local de Colombia. */
  fecha: string;
  valor: number;
  comprobante: string;
  destino: string;
  /** Comprobante de la transferencia, descargable. */
  archivo: string;
  nota?: string;
};

export type Cuenta = {
  cotizaciones: number[];
  pagos: number[];
  /** Lo que se pagó de más a propósito (redondeos acordados). Se suma a lo cotizado. */
  redondeo?: number;
  nota?: string;
};

export const COTIZACIONES: Cotizacion[] = [
  {
    numero: 1,
    servicio: "Demolición, pintura, cocina, estudio y balcón",
    fecha: "2026-09-05",
    archivo: "/cotizaciones/cotizacion-1.png",
    lineas: [
      {
        id: "c1-demolicion",
        espacio: "estudio",
        descripcion: "Demolición sin botada de escombros",
        manoObra: 500_000,
        materiales: 0,
        nota: "Es el muro entre el estudio y el cuarto útil, y el retiro de la cocineta, el baño y la ducha del cuarto útil. La botada de escombros va en la cotización 4.",
      },
      {
        id: "c1-pintura",
        espacio: "general",
        descripcion: "Pintura (reboque, resane, filetería)",
        manoObra: 4_800_000,
        materiales: 1_200_000,
      },
      {
        id: "c1-mortero",
        espacio: "cocina",
        descripcion: "Mortero horno microcemento",
        manoObra: 280_000,
        materiales: 150_000,
      },
      {
        id: "c1-piso-estudio",
        espacio: "estudio",
        descripcion: "Reparación piso y guardo escoba habitación",
        manoObra: 480_000,
        materiales: 320_000,
        nota: "La habitación de la cotización es el estudio.",
      },
      {
        id: "c1-reja-balcon",
        espacio: "balcon",
        descripcion: "Pintura reja balcón",
        manoObra: 200_000,
        materiales: 80_000,
      },
    ],
  },
  {
    numero: 2,
    servicio: "Aire acondicionado",
    fecha: "2026-09-07",
    archivo: "/cotizaciones/cotizacion-2.png",
    lineas: [
      {
        id: "c2-minisplit",
        espacio: "habitacion-principal",
        descripcion: "Suministro e instalación equipo MiniSplit de 12.000 BTU tecnología inverter",
        manoObra: 600_000,
        materiales: 1_450_000,
      },
      {
        id: "c2-tuberia",
        espacio: "habitacion-principal",
        descripcion: "Suministro e instalación de tubería de cobre con aislamiento",
        manoObra: 180_000,
        materiales: 90_000,
      },
      {
        id: "c2-cable",
        espacio: "habitacion-principal",
        descripcion: "Cable de control",
        manoObra: 60_000,
        materiales: 32_000,
      },
      {
        id: "c2-drenaje",
        espacio: "habitacion-principal",
        descripcion: "Drenaje por gravedad",
        manoObra: 30_000,
        materiales: 20_000,
      },
      {
        id: "c2-canaleta",
        espacio: "habitacion-principal",
        descripcion: "Canaleta plástica y accesorios",
        manoObra: 150_000,
        materiales: 225_000,
      },
      {
        id: "c2-acometida",
        espacio: "habitacion-principal",
        descripcion: "Acometida eléctrica de 220 V",
        manoObra: 420_000,
        materiales: 0,
        nota: "No está en la cotización escrita: se acordó al instalar y subió el total de 2.837.000 a 3.257.000.",
      },
    ],
    nota: "La cotización escrita suma 2.837.000; con la acometida de 220 V quedó en 3.257.000, que fue lo pagado.",
  },
  {
    numero: 3,
    servicio: "Lavamanos",
    fecha: "2026-09-11",
    archivo: "/cotizaciones/cotizacion-3.png",
    lineas: [
      {
        id: "c3-combo",
        espacio: "banos",
        descripcion: "Combo lavamanos / mueble",
        cantidad: 2,
        valorUnitario: 469_000,
        manoObra: 0,
        materiales: 938_000,
      },
      {
        id: "c3-materiales",
        espacio: "banos",
        descripcion: "Materiales de instalación (silicona, adaptadores, otros)",
        cantidad: 1,
        valorUnitario: 96_750,
        manoObra: 0,
        materiales: 96_750,
      },
      {
        id: "c3-accesorios",
        espacio: "banos",
        descripcion: "Accesorios (desagüe, llaves, etc.)",
        cantidad: 2,
        valorUnitario: 120_000,
        manoObra: 0,
        materiales: 240_000,
      },
      {
        id: "c3-transporte",
        espacio: "banos",
        descripcion: "Transporte",
        cantidad: 1,
        valorUnitario: 30_000,
        manoObra: 0,
        materiales: 30_000,
      },
      {
        id: "c3-instalacion",
        espacio: "banos",
        descripcion: "Compra, ensamble e instalación",
        cantidad: 2,
        valorUnitario: 250_000,
        manoObra: 500_000,
        materiales: 0,
      },
    ],
  },
  {
    numero: 4,
    servicio: "Botada de escombros",
    fecha: "2026-09-14",
    archivo: "/cotizaciones/cotizacion-4.png",
    lineas: [
      {
        id: "c4-transporte",
        espacio: "general",
        descripcion: "Transporte",
        cantidad: 1,
        valorUnitario: 200_000,
        manoObra: 200_000,
        materiales: 0,
      },
      {
        id: "c4-traslado",
        espacio: "general",
        descripcion: "Traslado del 4 piso a la calle",
        cantidad: 1,
        valorUnitario: 80_000,
        manoObra: 80_000,
        materiales: 0,
      },
      {
        id: "c4-costales",
        espacio: "general",
        descripcion: "Costales",
        cantidad: 10,
        valorUnitario: 2_000,
        manoObra: 0,
        materiales: 20_000,
      },
    ],
  },
  {
    numero: 5,
    servicio: "Cabina de baño",
    fecha: "2026-09-15",
    archivo: "/cotizaciones/cotizacion-5.png",
    lineas: [
      {
        id: "c5-limpieza",
        espacio: "banos",
        descripcion: "Limpieza y siliconado",
        cantidad: 1,
        valorUnitario: 120_000,
        manoObra: 120_000,
        materiales: 0,
      },
      {
        id: "c5-materiales",
        espacio: "banos",
        descripcion: "Silicona, cemento, boquilla, cinta",
        cantidad: 1,
        valorUnitario: 80_000,
        manoObra: 0,
        materiales: 80_000,
      },
    ],
  },
  {
    numero: 6,
    servicio: "Gabinete de cocina",
    fecha: "2026-09-16",
    archivo: "/cotizaciones/cotizacion-6.png",
    lineas: [
      {
        id: "c6-herrajes",
        espacio: "cocina",
        descripcion: "Brazos, bisagras, silicona",
        cantidad: 9,
        valorUnitario: 28_000,
        manoObra: 0,
        materiales: 252_000,
      },
      {
        id: "c6-repisa",
        espacio: "cocina",
        descripcion: "Repisa",
        valorUnitario: 50_000,
        manoObra: 0,
        materiales: 0,
        nota: "Quedó sin cantidad en la cotización, así que suma $0.",
      },
      {
        id: "c6-citofono",
        espacio: "cocina",
        descripcion: "Tapa citófono",
        cantidad: 1,
        valorUnitario: 10_000,
        manoObra: 0,
        materiales: 10_000,
      },
      {
        id: "c6-luz",
        espacio: "cocina",
        descripcion: "Luz indirecta",
        cantidad: 1,
        valorUnitario: 30_000,
        manoObra: 0,
        materiales: 30_000,
      },
      {
        id: "c6-mano-obra",
        espacio: "cocina",
        descripcion: "Mano de obra",
        manoObra: 200_000,
        materiales: 0,
      },
    ],
  },
  {
    numero: 7,
    servicio: "Mano de obra cuarto útil",
    fecha: "2026-09-19",
    archivo: "/cotizaciones/cotizacion-7.png",
    lineas: [
      {
        id: "c7-mano-obra",
        espacio: "cuarto-util",
        descripcion:
          "Levantar el piso de madera, resanes, reubicación de la iluminación, pintura, instalación de zócalo y sacar los residuos",
        manoObra: 1_400_000,
        materiales: 0,
        nota: "Sólo mano de obra: los materiales van en la cotización 9. Los residuos salen al camión el martes, o la basura al lugar destinado en el edificio.",
      },
    ],
    nota: "Llegó por WhatsApp, sin fecha propia: se toma la del pago.",
  },
  {
    numero: 8,
    servicio: "Servicios varios",
    fecha: "2026-09-22",
    archivo: "/cotizaciones/cotizacion-8.png",
    lineas: [
      {
        id: "c8-varios",
        espacio: "general",
        descripcion: "Llave de regulación del lavaplatos, pestillo puerta baño y tope magnético",
        manoObra: 100_000,
        materiales: 0,
        nota: "Óscar cobró 100.000 por las tres, materiales incluidos, sin separar: va todo como mano de obra.",
      },
    ],
    nota: "Llegó por WhatsApp, sin fecha propia: se toma la del pago.",
  },
  {
    numero: 9,
    servicio: "Materiales cuarto útil",
    fecha: "2026-09-23",
    archivo: "/cotizaciones/cotizacion-9.png",
    lineas: [
      { id: "c9-acrilica", espacio: "cuarto-util", descripcion: "Acrílica blanca 1/4", manoObra: 0, materiales: 40_000 },
      { id: "c9-rodillo", espacio: "cuarto-util", descripcion: "Rodillo", manoObra: 0, materiales: 10_000 },
      { id: "c9-masilla", espacio: "cuarto-util", descripcion: "Masilla y cinta malla", manoObra: 0, materiales: 60_000 },
      { id: "c9-estribos", espacio: "cuarto-util", descripcion: "Estribos hierro", manoObra: 0, materiales: 20_000 },
      { id: "c9-lampara", espacio: "cuarto-util", descripcion: "Lámpara y encauchetado", manoObra: 0, materiales: 30_000 },
      { id: "c9-estuco", espacio: "cuarto-util", descripcion: "Estuco plástico", manoObra: 0, materiales: 24_500 },
      {
        id: "c9-toma",
        espacio: "cuarto-util",
        descripcion: "Toma sobreponer",
        manoObra: 0,
        materiales: 10_000,
        nota: "En el mensaje dice $10.00; son 10.000, que es lo que cuadra con el total de 195.000.",
      },
      { id: "c9-tapa", espacio: "cuarto-util", descripcion: "Tapa lisa", manoObra: 0, materiales: 500 },
    ],
    nota: "Llegó por WhatsApp, sin fecha propia: se toma la del pago.",
  },
];

export const PAGOS: Pago[] = [
  {
    numero: 1,
    fecha: "2026-09-05T08:22",
    valor: 450_000,
    comprobante: "0000064100",
    destino: "Oscar Monsalve Garcia",
    archivo: "/pagos/pago-1.jpeg",
    nota: "Anticipo al inicio de la obra. Se descontó de las cotizaciones 5 y 6.",
  },
  {
    numero: 2,
    fecha: "2026-09-07T07:08",
    valor: 1_750_000,
    comprobante: "0000070300",
    destino: "Oscar Monsalve Garcia",
    archivo: "/pagos/pago-2.jpeg",
    nota: "Materiales de la cotización 1.",
  },
  {
    numero: 3,
    fecha: "2026-09-08T12:35",
    valor: 3_000_000,
    comprobante: "0000060300",
    destino: "Oscar Monsalve Garcia",
    archivo: "/pagos/pago-3.jpeg",
  },
  {
    numero: 4,
    fecha: "2026-09-08T14:55",
    valor: 257_000,
    comprobante: "0000068000",
    destino: "Oscar Ferreteria",
    archivo: "/pagos/pago-4.jpeg",
  },
  {
    numero: 5,
    fecha: "2026-09-10T13:44",
    valor: 6_260_000,
    comprobante: "0000002100",
    destino: "Oscar Ferreteria",
    archivo: "/pagos/pago-5.jpeg",
    nota: "Mano de obra de la cotización 1.",
  },
  {
    numero: 6,
    fecha: "2026-09-11T20:08",
    valor: 1_805_000,
    comprobante: "0000085800",
    destino: "Oscar Ferreteria",
    archivo: "/pagos/pago-6.jpeg",
  },
  {
    numero: 7,
    fecha: "2026-09-14T19:16",
    valor: 300_000,
    comprobante: "0000075200",
    destino: "Oscar Ferreteria",
    archivo: "/pagos/pago-7.jpeg",
  },
  {
    numero: 8,
    fecha: "2026-09-16T20:03",
    valor: 250_000,
    comprobante: "0000000900",
    destino: "Oscar Ferreteria",
    archivo: "/pagos/pago-8.jpeg",
  },
  {
    numero: 9,
    fecha: "2026-09-19T14:10",
    valor: 1_400_000,
    comprobante: "0000031900",
    destino: "Oscar Ferreteria",
    archivo: "/pagos/pago-9.jpeg",
    nota: "Mano de obra del cuarto útil.",
  },
  {
    numero: 10,
    fecha: "2026-09-22T14:53",
    valor: 100_000,
    comprobante: "0000092800",
    destino: "Oscar Ferreteria",
    archivo: "/pagos/pago-10.jpeg",
  },
  {
    numero: 11,
    fecha: "2026-09-23T20:57",
    valor: 220_000,
    comprobante: "0000068200",
    destino: "Oscar Ferreteria",
    archivo: "/pagos/pago-11.jpeg",
    nota: "Materiales del cuarto útil.",
  },
];

export const CUENTAS: Cuenta[] = [
  { cotizaciones: [1], pagos: [2, 5], nota: "Materiales en un pago y mano de obra en otro." },
  { cotizaciones: [2], pagos: [3, 4] },
  {
    cotizaciones: [3],
    pagos: [6],
    redondeo: 250,
    nota: "Los 1.804.750 se redondearon a 1.805.000 al pagar.",
  },
  { cotizaciones: [4], pagos: [7] },
  {
    cotizaciones: [5, 6],
    pagos: [1, 8],
    redondeo: 8_000,
    nota: "El anticipo del 5 de septiembre (pago 1, 450.000) quedó como saldo a favor y se descontó de estas dos cotizaciones. La de cocina (492.000) se redondeó a 500.000: 200.000 + 500.000 = 700.000, que es lo pagado.",
  },
  { cotizaciones: [7], pagos: [9] },
  { cotizaciones: [8], pagos: [10] },
  {
    cotizaciones: [9],
    pagos: [11],
    redondeo: 25_000,
    nota: "Los 195.000 se subieron a 220.000: 25.000 de propina por venir más rápido el viernes.",
  },
];

/* ---------------------------------------------------------------- helpers */

export const TODAS_LAS_LINEAS = COTIZACIONES.flatMap((c) =>
  c.lineas.map((l) => ({ ...l, cotizacion: c.numero }))
);

export type LineaConCotizacion = (typeof TODAS_LAS_LINEAS)[number];

export function totalLinea(l: Linea): number {
  return l.manoObra + l.materiales;
}

export function totalCotizacion(c: Cotizacion): number {
  return c.lineas.reduce((a, l) => a + totalLinea(l), 0);
}

export function getCotizacion(numero: number): Cotizacion | undefined {
  return COTIZACIONES.find((c) => c.numero === numero);
}

export function getPago(numero: number): Pago | undefined {
  return PAGOS.find((p) => p.numero === numero);
}

export function cuentaDeCotizacion(numero: number): Cuenta | undefined {
  return CUENTAS.find((c) => c.cotizaciones.includes(numero));
}

export function totalCuenta(cuenta: Cuenta): number {
  return cuenta.cotizaciones.reduce((a, n) => a + totalCotizacion(getCotizacion(n)!), 0);
}

export function pagadoCuenta(cuenta: Cuenta): number {
  return cuenta.pagos.reduce((a, n) => a + (getPago(n)?.valor ?? 0), 0);
}

/** Lo que se acordó pagar por la cuenta: lo cotizado más el redondeo, si lo hubo. */
export function acordadoCuenta(cuenta: Cuenta): number {
  return totalCuenta(cuenta) + (cuenta.redondeo ?? 0);
}

export function lineasDeEspacio(slug: string): LineaConCotizacion[] {
  return TODAS_LAS_LINEAS.filter((l) => l.espacio === slug);
}

export function cotizadoEnEspacio(slug: string): number {
  return lineasDeEspacio(slug).reduce((a, l) => a + totalLinea(l), 0);
}

/** Cotizaciones que tocan el espacio, en orden. */
export function cotizacionesDeEspacio(slug: string): Cotizacion[] {
  return COTIZACIONES.filter((c) => c.lineas.some((l) => l.espacio === slug));
}

/** Pagos que cubren las cotizaciones del espacio, sin repetir y en orden. */
export function pagosDeEspacio(slug: string): Pago[] {
  const numeros = new Set<number>();
  for (const c of cotizacionesDeEspacio(slug)) {
    for (const p of cuentaDeCotizacion(c.numero)?.pagos ?? []) numeros.add(p);
  }
  return PAGOS.filter((p) => numeros.has(p.numero));
}

export const TOTAL_COTIZADO = COTIZACIONES.reduce((a, c) => a + totalCotizacion(c), 0);
export const TOTAL_PAGADO = PAGOS.reduce((a, p) => a + p.valor, 0);
export const TOTAL_REDONDEOS = CUENTAS.reduce((a, c) => a + (c.redondeo ?? 0), 0);
/** Cotizado más redondeos acordados: contra esto se compara lo pagado. */
export const TOTAL_ACORDADO = TOTAL_COTIZADO + TOTAL_REDONDEOS;
