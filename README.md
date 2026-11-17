# Página de pedidos por WhatsApp (React + Vite)

## Qué editar
- **Todo el contenido** (nombre, WhatsApp, horarios, productos, precios, categorías): `src/data/tienda.js`
- **Fotos de productos:** poné los archivos en `public/img/` y en `tienda.js` escribí la ruta, ej. `imagen: '/img/pastaflora.webp'`. Ideal: formato 4:5 (ej. 1080x1350), WebP, menos de 200 KB.
- **Colores, tipografía y espaciado:** variables al principio de `src/index.css`.

## Portada con video que avanza con el scroll
1. Guardá el video en `public/video/hero.mp4` y una imagen fija en `public/img/hero.webp`.
2. En `tienda.js` → `hero: { video: '/video/hero.mp4', imagen: '/img/hero.webp' }`.
3. Para que el scroll sea fluido, el video tiene que tener todos los cuadros clave. Convertilo así (ffmpeg):
   ```
   ffmpeg -i original.mp4 -vf "scale=1080:-2" -c:v libx264 -g 1 -crf 26 -pix_fmt yuv420p -an -movflags +faststart public/video/hero.mp4
   ```
   Duración recomendada: 4 a 6 segundos, sin audio.
Si el visitante tiene activado "reducir movimiento", se muestra solo la imagen.

## Mensaje de pedido (para n8n)
El formato es fijo, para que n8n lo pueda leer:
```
¡Hola <marca>! Quiero hacer este pedido:
• 2 x Medialunas ($ 1.200 c/u) = $ 2.400
Total: $ 2.400
Nombre: Ana
Entrega: Retiro | Envío
Nota: ...
```

## Probar en tu compu
Necesitás Node.js 20 o más.
```
npm install
npm run dev
```

## Publicar en Render (Static Site)
- Build command: `npm install && npm run build`
- Publish directory: `dist`

## Versión celular (tipo app)

En pantallas de menos de 900 px la página cambia sola a una versión tipo app de delivery
(`src/celu/AppCelu.jsx`): blanco + verde pistacho oscuro, buscador, banners, categorías con
íconos, productos en 2 columnas con favorito y cantidad, y barra de abajo con Inicio,
Categorías, Carrito, Pedidos y Contacto. En la compu se sigue viendo la portada oscura.

- Banners: `TIENDA.banners` en `src/data/tienda.js` (título, texto, botón, imagen y a qué categoría lleva).
- Categorías con ícono: `TIPOS` en `src/data/tienda.js`. Cada producto tiene un `tipo`.
- Color de la marca en celular: `--marca` y `--marca-suave` en `src/index.css` (bloque `:root.tema-celu`).
- "Mis pedidos" y los favoritos quedan guardados en el celular del cliente.

## Instalar como app (gratis, sin Play Store)

La página ya trae `public/manifest.webmanifest`, íconos en `public/icons/` y `public/sw.js`.
Cuando esté publicada en Render, el cliente la abre en el celular y:

- Android (Chrome): menú ⋮ → "Instalar app" o "Agregar a la pantalla principal".
- iPhone (Safari): botón Compartir → "Agregar a inicio".

Queda un ícono como cualquier app y se abre a pantalla completa. Cuando tengas logo,
reemplazá los PNG de `public/icons/` (192, 512 y 180 px).

## Video de la portada en bucle

Por defecto `TIENDA.hero.modo` es `'bucle'`: el video se repite solo y el nombre de cada
producto cambia según la parte del video (3 productos = 3 partes iguales). Para el video en
bucle no hace falta la codificación especial. Si algún día querés que avance con el scroll,
poné `modo: 'scroll'` y codificalo con el comando de arriba.
