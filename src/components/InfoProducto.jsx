import { useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { mensajeRapido, minimo, precio, waLink } from '../lib'
import { Foto, Stepper } from './Tarjeta'
import { IconoWA } from './Iconos'

export default function InfoProducto({ p, cerrar, cant, cambiar }) {
  useEffect(() => {
    if (!p) return
    const esc = (e) => e.key === 'Escape' && cerrar()
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [p, cerrar])

  return (
    <AnimatePresence>
      {p && (
        <>
          <motion.div className="fondo-oscuro" onClick={cerrar} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} />
          <motion.div
            role="dialog" aria-modal="true" aria-label={p.nombre} className="hoja hoja-info"
            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%', transition: { duration: 0.22, ease: [0.4, 0, 1, 1] } }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          >
            <button className="cerrar" onClick={cerrar} aria-label="Cerrar">
              <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
            </button>
            <div className="info-foto"><Foto p={p} /></div>
            <div className="info-cuerpo">
              <h2>{p.nombre}</h2>
              <p className="info-precio">{p.precio ? precio(p.precio) : 'Precio a consultar'}{p.unidad && <span> · {p.unidad}</span>}</p>
              <p className="info-detalle">{p.detalle || p.descripcion}</p>
              <div className="info-acciones">
                <a className="boton boton-wa" href={waLink(mensajeRapido(p, cant || minimo(p)))} target="_blank" rel="noopener noreferrer">
                  <IconoWA size={20} /> Pedir ya
                </a>
                {cant === 0 ? (
                  <button className="boton boton-borde" onClick={() => cambiar(p.id, 1)}>Agregar al carrito</button>
                ) : (
                  <Stepper p={p} cant={cant} cambiar={cambiar} />
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
