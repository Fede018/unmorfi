import { AnimatePresence, motion } from 'motion/react'
import { mensajeRapido, minimo, precio, waLink } from '../lib'
import { IconoWA } from './Iconos'

const mas = <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
const menos = <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><path d="M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
const cambio = { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.9 }, transition: { duration: 0.16, ease: [0.16, 1, 0.3, 1] } }

export function Foto({ p }) {
  if (p.imagen?.includes('/recortes/'))
    return (
      <div className="provisorio-producto foto-recorte">
        <img src={p.imagen} alt={p.nombre} loading="lazy" />
      </div>
    )
  return p.imagen ? (
    <img src={p.imagen} alt={p.nombre} loading="lazy" />
  ) : (
    <div className="provisorio provisorio-producto" aria-hidden="true"><span>{p.nombre}</span></div>
  )
}

export function Stepper({ p, cant, cambiar }) {
  return (
    <div className="stepper">
      <button onClick={() => cambiar(p.id, -1)} aria-label={`Quitar ${p.nombre}`}>{menos}</button>
      <span aria-live="polite">{cant}</span>
      <button onClick={() => cambiar(p.id, 1)} aria-label={`Sumar ${p.nombre}`}>{mas}</button>
    </div>
  )
}

export default function Tarjeta({ p, i, cant, cambiar, abrirInfo }) {
  const agotado = p.disponible === false
  return (
    <motion.li
      className={'tarjeta' + (agotado ? ' agotado' : '')}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5% 0px' }}
      transition={{ duration: 0.6, delay: (i % 3) * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      <button className="tarjeta-foto" onClick={() => abrirInfo(p)} aria-label={`Ver información de ${p.nombre}`}>
        <Foto p={p} />
        {agotado && <span className="etiqueta">Sin stock</span>}
      </button>
      <div className="tarjeta-cuerpo">
        <div className="tarjeta-texto">
          <h3>{p.nombre}</h3>
          <p>{p.descripcion}</p>
          <p className="tarjeta-precio">
            {p.precio ? precio(p.precio) : 'Precio a consultar'}
            {p.unidad && <span> · {p.unidad}</span>}
          </p>
        </div>
        <div className="tarjeta-acciones">
          <a
            className={'boton boton-wa boton-pedir' + (agotado ? ' deshabilitado' : '')}
            href={agotado ? undefined : waLink(mensajeRapido(p, cant || minimo(p)))}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={agotado || undefined}
          >
            <IconoWA size={18} /> Pedir ya
          </a>
          <button className="icono-boton" onClick={() => abrirInfo(p)} aria-label={`Información de ${p.nombre}`}>
            <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><circle cx="10" cy="10" r="7.5" fill="none" stroke="currentColor" strokeWidth="1.6" /><path d="M10 9v5M10 6.2v.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
          </button>
          <div className="tarjeta-carrito">
            <AnimatePresence mode="popLayout" initial={false}>
              {cant === 0 ? (
                <motion.button key="sumar" {...cambio} className="icono-boton icono-sumar" disabled={agotado} onClick={() => cambiar(p.id, 1)} aria-label={`Agregar ${p.nombre} al carrito`}>
                  {mas}
                </motion.button>
              ) : (
                <motion.div key="cant" {...cambio}>
                  <Stepper p={p} cant={cant} cambiar={cambiar} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.li>
  )
}
