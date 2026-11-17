import { motion } from 'motion/react'
import { CATEGORIAS, PRODUCTOS, TIENDA } from '../data/tienda'
import { waLink } from '../lib'
import Tarjeta from '../components/Tarjeta'
import { IconoWA } from '../components/Iconos'

export default function Categoria({ cat, carrito, cambiar, abrirInfo }) {
  const lista = PRODUCTOS.filter((p) => p.categoria === cat.id)
  const otra = CATEGORIAS.find((c) => c.id !== cat.id)
  return (
    <>
      <section className="cat-cabecera">
        <div className="wrap">
          <a href="#/" className="volver">
            <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><path d="M16 10H5m4-5-5 5 5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Inicio
          </a>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
            {cat.nombre}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.15 }}>{cat.bajada}</motion.p>
        </div>
      </section>

      <section className="catalogo">
        <div className="wrap">
          {lista.length ? (
            <ul className="grilla">
              {lista.map((p, i) => (
                <Tarjeta key={p.id} p={p} i={i} cant={carrito[p.id] || 0} cambiar={cambiar} abrirInfo={abrirInfo} />
              ))}
            </ul>
          ) : (
            <div className="pronto">
              <h2>Estamos cocinando esta parte.</h2>
              <p>Si querés encargar algo de {cat.nombre.toLowerCase()} ya, escribinos.</p>
              <a className="boton boton-wa" href={waLink(`Hola ${TIENDA.nombre}, quería consultar por ${cat.nombre.toLowerCase()}.`)} target="_blank" rel="noopener noreferrer">
                <IconoWA size={20} /> Consultar
              </a>
            </div>
          )}
          {otra && (
            <a href={`#/${otra.id}`} className="ver-otra">
              <span>Ver también</span>
              <strong>{otra.nombre}</strong>
            </a>
          )}
        </div>
      </section>
    </>
  )
}
