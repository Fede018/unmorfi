import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { TIENDA } from '../data/tienda'
import { mensajePedido, precio, subtotal, waLink } from '../lib'
import { Stepper } from './Tarjeta'
import { IconoWA } from './Iconos'

const suave = { duration: 0.38, ease: [0.16, 1, 0.3, 1] }

export default function Pedido({ items, cambiar, vaciar, abierto, setAbierto, alEnviar }) {
  const [nombre, setNombre] = useState('')
  const [entrega, setEntrega] = useState('Retiro')
  const [pago, setPago] = useState(TIENDA.pago.opciones[0])
  const [nota, setNota] = useState('')
  const unidades = items.length // cuántos productos distintos hay en el carrito
  const total = items.reduce((s, { p, cant }) => s + subtotal(p, cant), 0)

  useEffect(() => {
    if (!abierto) return
    const esc = (e) => e.key === 'Escape' && setAbierto(false)
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [abierto, setAbierto])

  const enviar = waLink(mensajePedido(items, { nombre: nombre.trim(), entrega, pago, nota: nota.trim() }))
  const opciones = (nombreCampo, lista, valor, set) => (
    <div className="opciones">
      {lista.map((op) => (
        <label key={op} className={'opcion' + (valor === op ? ' activa' : '')}>
          <input type="radio" name={nombreCampo} value={op} checked={valor === op} onChange={() => set(op)} />
          {op}
        </label>
      ))}
    </div>
  )

  return (
    <>
      <AnimatePresence>
        {unidades > 0 && !abierto && (
          <motion.div className="barra" initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} transition={suave}>
            <button className="barra-boton" onClick={() => setAbierto(true)}>
              <span>{unidades} {unidades === 1 ? 'producto' : 'productos'}{total > 0 && <> · {precio(total)}</>}</span>
              <span className="barra-ver">Ver carrito</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {abierto && (
          <>
            <motion.div className="fondo-oscuro" onClick={() => setAbierto(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} />
            <motion.div
              role="dialog" aria-modal="true" aria-label="Tu carrito" className="hoja"
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%', transition: { duration: 0.22, ease: [0.4, 0, 1, 1] } }} transition={suave}
            >
              <div className="hoja-cabecera">
                <h2>Tu carrito</h2>
                <button className="cerrar cerrar-carrito" aria-label="Cerrar el carrito" onClick={() => setAbierto(false)}>
                  <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
                </button>
              </div>

              {unidades === 0 ? (
                <p className="vacio">Todavía no agregaste nada. Elegí un producto y tocá el carrito.</p>
              ) : (
                <>
                  <ul className="lista">
                    {items.map(({ p, cant }) => (
                      <li key={p.id}>
                        <div>
                          <strong>{p.nombre}</strong>
                          <small>{p.precio ? precio(subtotal(p, cant)) : 'Precio a consultar'}</small>
                        </div>
                        <Stepper p={p} cant={cant} cambiar={cambiar} />
                      </li>
                    ))}
                  </ul>

                  <div className="campos">
                    <label>
                      <span>Tu nombre <span className="opcional">(opcional)</span></span>
                      <input value={nombre} onChange={(e) => setNombre(e.target.value)} autoComplete="name" />
                    </label>
                    <fieldset>
                      <legend>Entrega</legend>
                      {opciones('entrega', ['Retiro', 'Envío'], entrega, setEntrega)}
                    </fieldset>
                    <fieldset>
                      <legend>Pago</legend>
                      {TIENDA.pago.opciones.length > 1 ? opciones('pago', TIENDA.pago.opciones, pago, setPago) : <p className="pago-unico">Por {pago.toLowerCase()}</p>}
                      <p className="aviso-pago">
                        {TIENDA.pago.aviso}
                        {TIENDA.pago.alias ? <> Alias: <strong>{TIENDA.pago.alias}</strong></> : ' Te pasamos los datos por WhatsApp.'}
                      </p>
                    </fieldset>
                    <label>
                      <span>Nota <span className="opcional">(opcional)</span></span>
                      <textarea rows={2} value={nota} onChange={(e) => setNota(e.target.value)} placeholder="Ej: para el sábado a la tarde" />
                    </label>
                  </div>

                  <div className="hoja-pie">
                    <div className="total"><span>Total</span><strong>{total > 0 ? precio(total) : 'A confirmar'}</strong></div>
                    <a className="boton boton-wa boton-ancho" href={enviar} target="_blank" rel="noopener noreferrer" onClick={() => alEnviar?.()}>
                      <IconoWA size={20} /> Enviar pedido por WhatsApp
                    </a>
                    <button className="boton boton-ancho boton-vaciar" onClick={vaciar}>
                      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M4 7h16M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13M10 11v5.5M14 11v5.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      Vaciar carrito
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
