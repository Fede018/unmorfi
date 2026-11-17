// =====================================================================
//  DATOS DE LA TIENDA — editá solo este archivo para cambiar contenido.
//  Fotos sin fondo (PNG/WebP transparente): ponelas en public/img/recortes/.
//  Así la página las muestra flotando sobre el color, sin recortarlas.
// =====================================================================

export const TIENDA = {
  nombre: 'unMorfi',
  // Logo sin fondo: versión verde (para fondos claros) y blanca (para fondos verdes).
  logo: { verde: '/img/logo/logo-verde.png', blanco: '/img/logo/logo-blanco.png' },
  // Mascota que saluda en el inicio (compu y celu). Dejala vacía ('') para sacarla.
  mascota: '/img/gato-chef.webp',
  // Código de país + área + número, sin "+", espacios ni guiones. Ej: 5491112345678
  whatsapp: '5493884841330',
  instagram: 'fedef0188', // usuario de Instagram, sin @
  pago: {
    opciones: ['Transferencia'], // si hay una sola, no se muestra para elegir
    alias: '', // ej: 'tumarca.mp'
    aviso: 'Preparamos tu pedido cuando se acredita el pago.',
  },
  horarios: 'Lunes a sábado, 9 a 20 h',
  entrega: 'Retiro o envío en la zona, a coordinar',

  // CELULAR: banners deslizables de la pantalla de inicio.
  banners: [
    { titulo: 'Pastelería artesanal', texto: 'Hecha con amor, en cada detalle.', boton: 'Ver productos', destino: 'todo', imagen: '' },
    { titulo: 'Alfajores de maicena', texto: 'Con dulce de leche y coco.', boton: 'Ver alfajores', destino: 'alfajores', imagen: '' },
    { titulo: 'Pastaflora casera', texto: 'Con membrillo, como la de siempre.', boton: 'Ver tartas', destino: 'tartas', imagen: '' },
    { titulo: 'Sándwiches de miga', texto: 'De jamón y queso o de pollo, por docena.', boton: 'Ver sándwiches', destino: 'comida', imagen: '' },
  ],

  // PORTADA: el video de la mano girando que cambia de producto.
  // Avanza con el scroll. Cada "escena" es el texto que aparece en cada tramo.
  hero: {
    video: '', // ej: '/video/hero.mp4'
    modo: 'bucle', // 'bucle': el video se repite solo. 'scroll': avanza con el scroll.
    // Imagen de fondo de la portada mientras no hay video.
    // fondo 'composicion': imagen armada con los productos a la derecha y lugar libre a la
    //   izquierda para el texto (ver prompts-fotos.md, Parte 3). Si imagen está vacía, la
    //   página arma una composición provisoria con las fotos sin fondo.
    // fondo 'foto': una foto común (ej. '/img/portada.webp') tapada con un velo verde.
    fondo: 'composicion',
    imagen: '',
    frase: 'Dulce y salado, como en casa.',
    escenas: [
      { titulo: 'Medialunas', texto: 'De manteca, recién horneadas.' },
      { titulo: 'Pastaflora', texto: 'Con membrillo, como la de siempre.' },
      { titulo: 'Alfajores', texto: 'De maicena, con dulce de leche y coco.' },
    ],
  },
}

// Las dos "puertas" de la portada. Cada una abre su página de productos.
export const CATEGORIAS = [
  {
    id: 'pasteleria',
    nombre: 'Pastelería',
    bajada: 'Medialunas, tortas, budines y alfajores para la merienda y los cumples.',
    imagen: '', // ej: '/img/cat-pasteleria.webp'
  },
  {
    id: 'comida',
    nombre: 'Comida',
    bajada: 'Sándwiches de miga de jamón y queso y de pollo. Muy pronto, más.',
    imagen: '', // ej: '/img/cat-comida.webp'
  },
]

// Categorías chicas del celular (los íconos). "tipo" de cada producto apunta acá.
export const TIPOS = [
  { id: 'tortas', nombre: 'Tortas', icono: 'torta' },
  { id: 'facturas', nombre: 'Facturas', icono: 'medialuna' },
  { id: 'alfajores', nombre: 'Alfajores', icono: 'alfajor' },
  { id: 'tartas', nombre: 'Tartas', icono: 'tarta' },
  { id: 'budines', nombre: 'Budines', icono: 'budin' },
  { id: 'empanadillas', nombre: 'Empanadillas', icono: 'empanada' },
  { id: 'comida', nombre: 'Comida', icono: 'sandwich' },
]

// precio: número sin puntos, o null si todavía no está definido.
// porDocena: true = se encarga por docena; el contador va 0, 12, 18, 24... y el precio es por docena.
// detalle: lo que se ve al tocar "Info" (tamaño, porciones, sabores...).
// imagen: ruta dentro de /public, ej '/img/medialunas.webp'.
export const PRODUCTOS = [
  { id: 'medialunas', nombre: 'Medialunas', categoria: 'pasteleria', tipo: 'facturas', etiqueta: 'Popular', precio: null, unidad: 'Docena', porDocena: true, descripcion: 'De manteca, con almíbar.', detalle: 'Recién horneadas. Se venden por docena o media docena.', imagen: '/img/recortes/medialunas.webp', disponible: true },
  { id: 'pastaflora', nombre: 'Pastaflora', categoria: 'pasteleria', tipo: 'tartas', etiqueta: 'Casera', precio: null, unidad: 'Entera', descripcion: 'Con dulce de membrillo.', detalle: 'Masa casera y enrejado dorado. Rinde 8 porciones.', imagen: '/img/recortes/pastaflora.webp', disponible: true },
  { id: 'maizenas', nombre: 'Alfajores de maicena', categoria: 'pasteleria', tipo: 'alfajores', etiqueta: 'Artesanal', precio: null, unidad: 'Docena', descripcion: 'Dulce de leche y coco.', detalle: 'Bien rellenos, se deshacen en la boca.', imagen: '/img/recortes/alfajores.webp', disponible: true },
  { id: 'budin', nombre: 'Budín', categoria: 'pasteleria', tipo: 'budines', etiqueta: '', precio: null, unidad: 'Unidad', descripcion: 'Húmedo y esponjoso.', detalle: 'Ideal para el mate. Consultá sabores.', imagen: '/img/recortes/budin.webp', disponible: true },
  { id: 'torta', nombre: 'Torta', categoria: 'pasteleria', tipo: 'tortas', etiqueta: 'Por encargo', precio: null, unidad: 'Por encargo', descripcion: 'Crema chantilly decorada con rosas.', detalle: 'Se hace por encargo para cumpleaños y eventos. Contanos para cuántas personas y el relleno.', imagen: '/img/recortes/torta.webp', disponible: true },
  { id: 'bonnafe', nombre: 'Bonnafe', categoria: 'pasteleria', tipo: 'tartas', etiqueta: 'Nuevo', precio: null, unidad: 'Porción', descripcion: 'Banana, dulce de leche y crema.', detalle: 'Base de galletitas, dulce de leche, banana en rodajas y crema batida con canela. También entera, por encargo.', imagen: '/img/recortes/banoffee.webp', disponible: true },
  { id: 'empanadillas', nombre: 'Empanadillas', categoria: 'pasteleria', tipo: 'empanadillas', etiqueta: '', precio: null, unidad: 'Docena', descripcion: 'Descripción a completar.', detalle: 'Descripción a completar.', imagen: '/img/recortes/empanadillas.webp', disponible: true },
  { id: 'cabsha', nombre: 'Cabsha', categoria: 'pasteleria', tipo: 'tartas', etiqueta: 'Nuevo', precio: null, unidad: 'Entera', descripcion: 'Chocolate y dulce de leche.', detalle: 'Bizcochuelo de chocolate relleno de dulce de leche, con cobertura de chocolate y borde de dulce de leche. Contanos para cuántas personas.', imagen: '/img/recortes/cabsha.webp', disponible: true },
  { id: 'lemon-pie', nombre: 'Lemon pie', categoria: 'pasteleria', tipo: 'tartas', etiqueta: 'Nuevo', precio: null, unidad: 'Entera', descripcion: 'Crema de limón y merengue.', detalle: 'Masa crocante, crema de limón bien ácida y merengue italiano dorado.', imagen: '/img/recortes/lemon-pie.webp', disponible: true },
  { id: 'miga-jyq', nombre: 'Sándwiches de miga de jamón y queso', categoria: 'comida', tipo: 'comida', etiqueta: 'Clásico', precio: null, unidad: 'Docena', porDocena: true, descripcion: 'Jamón cocido y queso, en pan de miga.', detalle: 'Triples de jamón y queso, bien rellenos. Se venden por docena.', imagen: '/img/recortes/miga-jyq.webp', disponible: true },
  { id: 'miga-pollo', nombre: 'Sándwiches de miga de pollo', categoria: 'comida', tipo: 'comida', etiqueta: '', precio: null, unidad: 'Docena', porDocena: true, descripcion: 'Pollo, morrón y aceitunas.', detalle: 'Relleno cremoso de pollo con morrón y aceitunas. Se venden por docena.', imagen: '/img/recortes/miga-pollo.webp', disponible: true },
]
