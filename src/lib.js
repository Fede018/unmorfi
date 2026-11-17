import { useEffect, useState } from 'react'
import { TIENDA } from './data/tienda'

export const precio = (n) => '$ ' + Number(n).toLocaleString('es-AR')

// Productos que se encargan por docena (porDocena: true): el primer toque suma 12
// y después va de a 6 (12, 18, 24...). Al bajar de 12 vuelve a 0.
export const minimo = (p) => (p?.porDocena ? 12 : 1)
export function siguiente(p, cant, dir) {
  if (!p?.porDocena) return Math.max(0, cant + dir)
  if (dir > 0) return cant < 12 ? 12 : cant + 6
  return cant <= 12 ? 0 : cant - 6
}
// El precio de los productos por docena es por docena.
export const subtotal = (p, cant) => (p.precio || 0) * (p.porDocena ? cant / 12 : cant)

export const waLink = (texto) => `https://wa.me/${TIENDA.whatsapp}?text=${encodeURIComponent(texto)}`

// Mensaje de "Pedir ya" para un solo producto.
export const mensajeRapido = (p, cant = 1) =>
  `Hola ${TIENDA.nombre}, me gustaría encargar ${cant} x ${p.nombre}${p.unidad ? ` (${p.unidad.toLowerCase()})` : ''}.`

// Mensaje del carrito. Formato fijo para que n8n lo pueda leer:
// una línea por producto "• cantidad x producto".
export function mensajePedido(items, { nombre, entrega, pago, nota }) {
  const total = items.reduce((s, { p, cant }) => s + subtotal(p, cant), 0)
  const faltan = items.some(({ p }) => !p.precio)
  return [
    `Hola ${TIENDA.nombre}, me gustaría encargar:`,
    ...items.map(({ p, cant }) => `• ${cant} x ${p.nombre}${p.precio ? ` (${precio(subtotal(p, cant))})` : ''}`),
    `Total: ${total ? precio(total) + (faltan ? ' + a confirmar' : '') : 'a confirmar'}`,
    nombre && `Nombre: ${nombre}`,
    `Entrega: ${entrega}`,
    pago && `Pago: ${pago}`,
    nota && `Nota: ${nota}`,
  ]
    .filter(Boolean)
    .join('\n')
}

// Rutas simples con "#/": funcionan en cualquier hosting estático, sin configurar nada.
export function useRuta() {
  const leer = () => window.location.hash.replace(/^#\/?/, '') || ''
  const [ruta, setRuta] = useState(leer)
  useEffect(() => {
    const cambio = () => {
      setRuta(leer())
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
    window.addEventListener('hashchange', cambio)
    return () => window.removeEventListener('hashchange', cambio)
  }, [])
  return ruta
}

export function irA(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
