# Remodelación Apto — Belo Horizonte

Web que lleva las cuentas de la remodelación del apartamento: qué cotizó Óscar, con qué
transferencia se pagó y cómo va cada trabajo. Plano interactivo, fotos del estado actual,
cotizaciones y comprobantes descargables, y avance por línea que se guarda solo en MongoDB.

## Correr en local

```bash
npm install
npm run dev        # http://localhost:3000
```

Las variables ya están en `.env.local` (ese archivo **no** se sube a git).

## Variables de entorno

| Variable | Para qué |
|---|---|
| `MONGODB_URI` | Cadena de conexión de MongoDB Atlas |
| `MONGODB_DB` | Base de datos. Actual: `inspiratech` |
| `MONGODB_COLLECTION` | Colección. Actual: `apto_arreglos` (creada nueva, no toca las demás) |

## Desplegar en Vercel

1. Subir la carpeta a un repo de GitHub.
2. En Vercel: **Add New → Project** e importar el repo. Next.js se detecta solo.
3. En **Settings → Environment Variables**, agregar las tres variables de arriba
   (Production, Preview y Development).
4. En **MongoDB Atlas → Network Access**, permitir `0.0.0.0/0`. Vercel no tiene IP
   fija, así que sin esto la conexión falla en producción.
5. Deploy.

## Cómo está armado

```
app/
  page.tsx                 Portada: hero con cotizado / pagado, plano, tarjetas de espacios
  espacios/[slug]/page.tsx Ficha de cada espacio: intención, cotizaciones con sus pagos, fotos, líneas
  icon.svg                 Favicon
  resumen/page.tsx         Cuentas de la obra: cotización contra pagos, detalle por espacio
  api/seguimiento/route.ts GET todo el seguimiento · PATCH estado/observaciones de una línea
lib/
  cotizaciones.ts          Cotizaciones de Óscar, pagos y cuentas (la fuente de verdad)
  obra.ts                  Espacios: intención, fotos, referencias y lo pendiente de cotizar
  plano.ts                 Geometría del plano: zonas, marcas, vanos
  mongodb.ts               Conexión y lectura del seguimiento
  format.ts                Formato de pesos, fechas y diferencias
components/
  Plano.tsx                Plano interactivo (client)
  PlanoMini.tsx            Mini plano con el espacio resaltado
  DiagramaEstudio.tsx      Hoy / como debe quedar: el muro que se devuelve a su sitio
  DiagramaEstanteria.tsx   Ejemplo dibujado del sistema de rieles y entrepaños
  CotizacionesEspacio.tsx  Cotizaciones del espacio con sus pagos en la misma fila (cabecera)
  LineasEspacio.tsx        Líneas cotizadas con estado y observaciones (autoguardado)
  Pagos.tsx                Tarjetas de pago y de cotización con descarga (cuentas)
  Iconos.tsx               Set de iconos de línea
  Imprimir.tsx             Botón de imprimir / guardar en PDF
public/
  cotizaciones/            Imágenes de las cotizaciones (cotizacion-N.png)
  pagos/                   Comprobantes de transferencia (pago-N.jpeg)
reportes/                  Originales tal como llegaron (no se sirven)
```

**Las cuentas viven en el código** (`lib/cotizaciones.ts`): cada cotización con sus
líneas (mano de obra y materiales separados, como las manda Óscar), cada pago con su
comprobante, y las `CUENTAS` que dicen qué pagos cubrieron qué cotizaciones. Cada línea
apunta al `slug` del espacio donde se ejecuta. Mongo guarda únicamente el seguimiento:
estado y observaciones, indexado por el `id` de cada línea.

### Cuando Óscar mande una cotización nueva

1. Guardar la imagen en `public/cotizaciones/cotizacion-N.png`.
2. Agregar la cotización a `COTIZACIONES` en `lib/cotizaciones.ts`, con una línea por
   renglón y el `espacio` correcto.
3. Si el espacio la tenía en `pendientes` (`lib/obra.ts`), borrar esa entrada.
4. Cuando se pague: comprobante en `public/pagos/pago-N.jpeg`, el pago en `PAGOS` y la
   asociación en `CUENTAS`.

## Detalles que importan

- **Los valores no se editan en la web.** Son los de las cotizaciones, transcritos tal
  cual. Lo único que se escribe es el avance (Pendiente / En proceso / Terminado) y las
  observaciones, que se guardan solos ~0,7 s después de dejar de escribir.
- **Los pagos cubren cotizaciones completas.** Cuando una cotización reparte líneas entre
  varios espacios (la 1 y la 4), la ficha lo avisa para que el pago no se lea como propio.
- **Lo que no está cotizado no aparece como trabajo.** Queda como "pendiente de cotizar"
  en el espacio (cuarto útil, luces para los cuadros y moldura de madera del corredor).
- **Mobile first.** Se usa desde el celular en obra: campos de 16 px (para que iOS no
  haga zoom), plano con desplazamiento horizontal, tabla del resumen convertida en
  tarjetas y diagramas apilados.
- **El plano es un esquema, no está a escala.** Está trazado sobre la distribución real,
  incluido el cuarto útil, que no se comunica con el apartamento y se entra por el
  corredor común del edificio.
- **El muro del estudio.** La dueña anterior lo corrió hacia el estudio para agrandar el
  cuarto útil y alquilarlo con cocineta, baño y ducha. La obra retira esos servicios y
  devuelve el muro a su posición original. Dónde quedaba exactamente se confirma en sitio:
  es el único dato del alcance que no está definido.
- **Imprimible.** `/resumen` tiene estilos de impresión para sacar las cuentas en PDF.
