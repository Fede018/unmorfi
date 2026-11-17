import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { PRODUCTOS } from '../data/tienda'
import { COMIDA } from '../celu/Iconos'
import Tarjeta from './Tarjeta'

// Las dos opciones del filtro: lo dulce (pastelería) y lo salado (comida).
const OPCIONES = [
  { id: 'pasteleria', nombre: 'Dulce', icono: 'torta', bajada: 'Tortas, tartas, facturas y alfajores' },
  { id: 'comida', nombre: 'Salado', icono: 'sandwich', bajada: 'Sándwiches de miga y más' },
]

// "¿Qué se te antoja?": el cliente toca Dulce o Salado y se despliegan esos productos.
export default function Elegir({ carrito, cambiar, abrirInfo }) {
  const [abierto, setAbierto] = useState(null)
  const lista = PRODUCTOS.filter((p) => p.categoria === abierto)

  return (
    <section id="productos" className="elegir elegir-filtro">
      <div className="wrap">
        <motion.h2
          className="titulo-seccion"
          initial={{ y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          ¿Qué se te <em>antoja</em>?
        </motion.h2>
        <p className="elegir-ayuda">Tocá una opción y te mostramos todo.</p>

        <div className="filtro" role="group" aria-label="Elegí dulce o salado">
          {OPCIONES.map((o) => {
            const Ic = COMIDA[o.icono]
            const cuantos = PRODUCTOS.filter((p) => p.categoria === o.id).length
            const activo = abierto === o.id
            return (
              <button
                key={o.id}
                type="button"
                className={'filtro-opcion filtro-' + o.id + (activo ? ' activo' : '')}
                aria-pressed={activo}
                aria-controls="filtro-panel"
                onClick={() => setAbierto(activo ? null : o.id)}
              >
                <span className="filtro-icono"><Ic size={64} /></span>
                <span className="filtro-texto">
                  <strong>{o.nombre}</strong>
                  <small>{o.bajada}</small>
                </span>
                <span className="filtro-cuenta">{cuantos}</span>
                <svg className="filtro-flecha" viewBox="0 0 20 20" width="22" height="22" aria-hidden="true"><path d="m5 8 5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            )
          })}
        </div>

        <AnimatePresence initial={false} mode="wait">
          {abierto && (
            <motion.div
              key={abierto}
              id="filtro-panel"
              className="filtro-panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="filtro-panel-dentro">
                {lista.length ? (
                  <ul className="grilla">
                    {lista.map((p, i) => (
                      <Tarjeta key={p.id} p={p} i={i} cant={carrito[p.id] || 0} cambiar={cambiar} abrirInfo={abrirInfo} />
                    ))}
                  </ul>
                ) : (
                  <p className="filtro-vacio">Muy pronto vas a encontrar productos acá.</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
