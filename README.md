# Remodelación Apto — Belo Horizonte

Web para que el contratista vea, entienda y cotice la remodelación del apartamento:
plano interactivo, fotos del estado actual, referencias visuales y un formulario de
cantidades de obra y costos que se guarda solo en MongoDB.

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
  page.tsx                 Portada: hero, plano interactivo, tarjetas de espacios
  espacios/[slug]/page.tsx Ficha de cada espacio: intención, fotos, referencias, cotización
  resumen/page.tsx         Cotización consolidada e imprimible
  api/cotizacion/route.ts  GET todas las cotizaciones · PATCH un ítem (upsert)
lib/
  obra.ts                  Catálogo de espacios e ítems de obra (la fuente de verdad)
  plano.ts                 Geometría del plano: zonas, marcas, vanos
  mongodb.ts               Conexión y lectura de cotizaciones
  format.ts                Formato de pesos colombianos y totales
components/
  Plano.tsx                Plano interactivo (client)
  PlanoMini.tsx            Mini plano con el espacio resaltado
  DiagramaEstudio.tsx      Antes / después del muro del estudio
  EspacioItems.tsx         Formulario de cotización con autoguardado
  Iconos.tsx               Set de iconos de línea
  Imprimir.tsx             Botón de imprimir / guardar en PDF
```

El **catálogo de obra vive en el código** (`lib/obra.ts`); Mongo guarda únicamente lo
que escribe el contratista: cantidad, valor unitario, estado y observaciones, indexado
por el `id` de cada ítem. Para agregar o cambiar un trabajo, se edita `lib/obra.ts`.

## Detalles que importan

- **Todo arranca en cero.** No hay valores precargados: las cantidades y precios los
  pone el contratista.
- **Autoguardado.** Cada campo se guarda ~0,7 s después de dejar de escribir. El estado
  ("Guardando…" / "Guardado ✓") se muestra en cada ítem.
- **Mobile first.** Se usa desde el celular en obra: campos de 16 px (para que iOS no
  haga zoom), plano con desplazamiento horizontal, tabla del resumen convertida en
  tarjetas y diagramas apilados.
- **El plano es un esquema, no está a escala.** Está trazado sobre la distribución real,
  incluido el cuarto útil, que no se comunica con el apartamento y se entra por el
  corredor común del edificio.
- **Imprimible.** `/resumen` tiene estilos de impresión para sacar la cotización en PDF.
