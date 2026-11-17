import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { PRODUCTOS, TIENDA, TIPOS } from '../data/tienda'
import { minimo, precio, siguiente, waLink } from '../lib'
import { IconoIG, IconoWA } from '../components/Iconos'
import { Foto } from '../components/Tarjeta'
import Marca from '../components/Marca'
import { Buscar, Carrito, Casa, Charla, COMIDA, Corazon, Flecha, Grilla, Mas, Menos, Ticket, Trigo } from './Iconos'

// Favoritos guardados en el celular de cada cliente.
function useFavoritos() {
  const [favs, setFavs] = useState(() => {
    try { return JSON.parse(localStorage.getItem('favoritos') || '[]') } catch { return [] }
  })
  const alternar = (id) =>
    setFavs((f) => {
      const n = f.includes(id) ? f.filter((x) => x !== id) : [...f, id]
      try { localStorage.setItem('favoritos', JSON.stringify(n)) } catch { /* sin almacenamiento */ }
      return n
    })
  return [favs, alternar]
}

export default function AppCelu({ carrito, cambiar, sumar, abrirInfo, abrirPedido, unidades, historial, repetir }) {
  const [tab, setTab] = useState('inicio')
  const [tipo, setTipo] = useState('todo')
  const [busqueda, setBusqueda] = useState('')
  const [favs, alternarFav] = useFavoritos()
  const lista = useRef(null)

  const visibles = useMemo(() => {
    const q = busqueda.trim().toLowerCase()
    return PRODUCTOS.filter((p) => (tipo === 'todo' || p.tipo === tipo) && (!q || (p.nombre + ' ' + p.descripcion).toLowerCase().includes(q)))
  }, [tipo, busqueda])

  const elegirTipo = (t) => {
    setTipo((actual) => (actual === t ? 'todo' : t))
    setTab('inicio')
    setTimeout(() => lista.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 30)
  }

  useEffect(() => { window.scrollTo({ top: 0 }) }, [tab])

  return (
    <div className="celu">
      <header className="celu-arriba">
        <a href="#/" className="celu-marca" onClick={() => setTab('inicio')}>
          <span className="celu-logo">{TIENDA.logo?.verde ? <img src={TIENDA.logo.verde} alt="" /> : <Trigo size={20} />}</span>
          <Marca />
        </a>
        <button className="celu-carrito" onClick={abrirPedido} aria-label={`Carrito, ${unidades} productos`}>
          <Carrito size={24} />
          {unidades > 0 && <span className="celu-badge">{unidades}</span>}
        </button>
      </header>

      {tab === 'inicio' && (
        <>
          <div className="celu-hero">
            <label className="celu-buscar">
              <Buscar size={20} />
              <span className="oculto">Buscar productos</span>
              <input type="search" placeholder="Buscar productos…" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
            </label>

            {!busqueda && <Banners elegirTipo={elegirTipo} />}
          </div>

          <Chips tipo={tipo} elegirTipo={elegirTipo} />

          <section ref={lista} className="celu-seccion">
            <div className="celu-titulo">
              <h2>{tipo === 'todo' ? 'Nuestros productos' : TIPOS.find((t) => t.id === tipo)?.nombre}</h2>
              {tipo !== 'todo' && <button onClick={() => setTipo('todo')}>Ver todos <Flecha size={16} /></button>}
            </div>
            <Productos lista={visibles} carrito={carrito} cambiar={cambiar} sumar={sumar} abrirInfo={abrirInfo} favs={favs} alternarFav={alternarFav} tipo={tipo} />
          </section>
        </>
      )}

      {tab === 'categorias' && (
        <section className="celu-seccion">
          <div className="celu-titulo"><h2>Categorías</h2></div>
          <div className="celu-cats">
            {TIPOS.map((t) => {
              const Ic = COMIDA[t.icono]
              const n = PRODUCTOS.filter((p) => p.tipo === t.id).length
              return (
                <button key={t.id} className="celu-cat" onClick={() => elegirTipo(t.id)}>
                  <span className="celu-cat-icono"><Ic size={30} /></span>
                  <strong>{t.nombre}</strong>
                  <small>{n ? `${n} ${n === 1 ? 'producto' : 'productos'}` : 'Muy pronto'}</small>
                </button>
              )
            })}
          </div>
          {favs.length > 0 && (
            <>
              <div className="celu-titulo"><h2>Tus favoritos</h2></div>
              <Productos lista={PRODUCTOS.filter((p) => favs.includes(p.id))} carrito={carrito} cambiar={cambiar} sumar={sumar} abrirInfo={abrirInfo} favs={favs} alternarFav={alternarFav} />
            </>
          )}
        </section>
      )}

      {tab === 'pedidos' && <Pedidos historial={historial} repetir={repetir} />}
      {tab === 'contacto' && <Contacto />}

      <nav className="celu-tabs" aria-label="Secciones">
        <Tab id="inicio" tab={tab} setTab={setTab} Icono={Casa}>Inicio</Tab>
        <Tab id="categorias" tab={tab} setTab={setTab} Icono={Grilla}>Categorías</Tab>
        <button className="celu-tab-carrito" onClick={abrirPedido} aria-label={`Carrito, ${unidades} productos`}>
          <Carrito size={26} />
          {unidades > 0 && <span className="celu-badge">{unidades}</span>}
        </button>
        <Tab id="pedidos" tab={tab} setTab={setTab} Icono={Ticket}>Pedidos</Tab>
        <Tab id="contacto" tab={tab} setTab={setTab} Icono={Charla}>Contacto</Tab>
      </nav>
    </div>
  )
}

function Tab({ id, tab, setTab, Icono, children }) {
  return (
    <button className={'celu-tab' + (tab === id ? ' activa' : '')} onClick={() => setTab(id)} aria-current={tab === id ? 'page' : undefined}>
      <Icono size={24} />
      <span>{children}</span>
    </button>
  )
}

function Banners({ elegirTipo }) {
  const ref = useRef(null)
  const [actual, setActual] = useState(0)
  const pausa = useRef(false)
  const n = TIENDA.banners.length

  useEffect(() => {
    const el = ref.current
    const ver = () => setActual(Math.round(el.scrollLeft / el.clientWidth))
    el.addEventListener('scroll', ver, { passive: true })
    return () => el.removeEventListener('scroll', ver)
  }, [])

  // Avanza solo cada 5 segundos; se frena si el cliente lo toca o pide menos movimiento.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => {
      const el = ref.current
      if (!el || pausa.current) return
      const sig = (Math.round(el.scrollLeft / el.clientWidth) + 1) % n
      el.scrollTo({ left: sig * el.clientWidth, behavior: 'smooth' })
    }, 5000)
    return () => clearInterval(t)
  }, [n])

  const ir = (i) => ref.current.scrollTo({ left: i * ref.current.clientWidth, behavior: 'smooth' })

  return (
    <section className="celu-banners" aria-label="Promociones" onTouchStart={() => (pausa.current = true)}>
      <div className="celu-banners-pista" ref={ref}>
        {TIENDA.banners.map((b, i) => (
          <div key={b.titulo} className={'celu-banner celu-banner-' + i} aria-roledescription="diapositiva" aria-label={`${i + 1} de ${n}`}>
            <div className="celu-banner-texto">
              <h2>{b.titulo}</h2>
              <p>{b.texto}</p>
              <button className="celu-banner-boton" onClick={() => (b.destino === 'todo' ? elegirTipo('todo') : elegirTipo(b.destino))}>
                {b.boton} <Flecha size={16} />
              </button>
            </div>
            <div className="celu-banner-foto">
              {b.imagen ? <><span className="celu-banner-provisorio sin-marco" /><img src={b.imagen} alt="" className={b.imagen.includes('/recortes/') ? 'recorte' : undefined} /></> : <BannerIcono destino={b.destino} />}
            </div>
          </div>
        ))}
      </div>
      <div className="celu-puntos">
        {TIENDA.banners.map((b, i) => (
          <button key={b.titulo} className={i === actual ? 'activo' : ''} onClick={() => ir(i)} aria-label={`Ver promoción ${i + 1}`} />
        ))}
      </div>
    </section>
  )
}

// Sin foto, el banner muestra el ícono grande de su categoría.
function BannerIcono({ destino }) {
  // El primer banner (todo) lo saluda el gato chef.
  if (destino === 'todo' && TIENDA.mascota) {
    return (
      <span className="celu-banner-provisorio sin-marco celu-banner-gato" aria-hidden="true">
        <span className="celu-gato-globo">¡Hola! ¿Qué vas a pedir?</span>
        <img src={TIENDA.mascota} alt="" />
      </span>
    )
  }
  const t = TIPOS.find((x) => x.id === destino)
  const Ic = t ? COMIDA[t.icono] : Trigo
  return (
    <span className="celu-banner-provisorio sin-marco celu-banner-icono" aria-hidden="true">
      <span><Ic size={72} /></span>
    </span>
  )
}

// Categorías: una sección con borde que se desliza como carrusel, de a una "página" por vez.
function Chips({ tipo, elegirTipo }) {
  const ref = useRef(null)
  const [pag, setPag] = useState({ actual: 0, total: 1 })

  useEffect(() => {
    const el = ref.current
    const medir = () => {
      const total = Math.max(1, Math.ceil((el.scrollWidth - 4) / el.clientWidth))
      const actual = Math.min(total - 1, Math.round(el.scrollLeft / el.clientWidth))
      setPag({ actual, total })
    }
    medir()
    el.addEventListener('scroll', medir, { passive: true })
    window.addEventListener('resize', medir)
    return () => { el.removeEventListener('scroll', medir); window.removeEventListener('resize', medir) }
  }, [])

  const ir = (i) => ref.current.scrollTo({ left: i * ref.current.clientWidth, behavior: 'smooth' })

  return (
    <section className="celu-cats-carrusel" aria-label="Categorías">
      <div className="celu-cats-cabecera">
        <h2>Categorías</h2>
        <div className="celu-cats-flechas">
          <button onClick={() => ir(pag.actual - 1)} disabled={pag.actual === 0} aria-label="Categorías anteriores"><span className="voltear"><Flecha size={18} /></span></button>
          <button onClick={() => ir(pag.actual + 1)} disabled={pag.actual >= pag.total - 1} aria-label="Más categorías"><Flecha size={18} /></button>
        </div>
      </div>
      <div className="celu-chips" ref={ref} role="list">
        {TIPOS.map((t) => {
          const Ic = COMIDA[t.icono]
          return (
            <button key={t.id} role="listitem" className={'celu-chip' + (tipo === t.id ? ' activo' : '')} onClick={() => elegirTipo(t.id)} aria-pressed={tipo === t.id}>
              <span className="celu-chip-icono"><Ic size={28} /></span>
              <span>{t.nombre}</span>
            </button>
          )
        })}
      </div>
      {pag.total > 1 && (
        <div className="celu-puntos">
          {Array.from({ length: pag.total }, (_, i) => (
            <button key={i} className={i === pag.actual ? 'activo' : ''} onClick={() => ir(i)} aria-label={`Ver categorías, parte ${i + 1}`} />
          ))}
        </div>
      )}
    </section>
  )
}

function Productos({ lista, carrito, cambiar, sumar, abrirInfo, favs, alternarFav, tipo }) {
  if (!lista.length)
    return (
      <div className="celu-vacio">
        <p><strong>{tipo === 'comida' ? 'Estamos cocinando esta parte.' : 'No encontramos nada.'}</strong></p>
        <p>{tipo === 'comida' ? 'Muy pronto: sándwiches de miga, de pollo y más.' : 'Probá con otra palabra o mirá todas las categorías.'}</p>
        {tipo === 'comida' && (
          <a className="boton boton-wa" href={waLink(`Hola ${TIENDA.nombre}, quería consultar por la comida.`)} target="_blank" rel="noopener noreferrer"><IconoWA size={18} /> Consultar</a>
        )}
      </div>
    )
  return (
    <ul className="celu-grilla">
      <AnimatePresence initial={false}>
        {lista.map((p) => (
          <TarjetaCelu key={p.id} p={p} cant={carrito[p.id] || 0} cambiar={cambiar} sumar={sumar} abrirInfo={abrirInfo} fav={favs.includes(p.id)} alternarFav={alternarFav} />
        ))}
      </AnimatePresence>
    </ul>
  )
}

function TarjetaCelu({ p, cant, sumar, abrirInfo, fav, alternarFav }) {
  // La cantidad elegida antes de tocar el carrito. Arranca en 0; si tocás el carrito
  // sin elegir, suma lo mínimo (1, o una docena en los productos por docena).
  const [elegida, setElegida] = useState(0)
  const [sumado, setSumado] = useState(false)
  const agregar = () => {
    sumar(p.id, elegida || minimo(p))
    setSumado(true)
    setTimeout(() => setSumado(false), 900)
    setElegida(0)
  }
  return (
    <motion.li layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }} className="celu-tarjeta">
      <div className="celu-tarjeta-foto">
        <button className="celu-tarjeta-abrir" onClick={() => abrirInfo(p)} aria-label={`Ver ${p.nombre}`}><Foto p={p} /></button>
        <button className={'celu-fav' + (fav ? ' activo' : '')} onClick={() => alternarFav(p.id)} aria-label={fav ? `Quitar ${p.nombre} de favoritos` : `Guardar ${p.nombre} en favoritos`} aria-pressed={fav}>
          <Corazon size={18} lleno={fav} />
        </button>
        {p.etiqueta && <span className="celu-etiqueta">{p.etiqueta}</span>}
        {cant > 0 && <span className="celu-en-carrito">{cant} en el carrito</span>}
      </div>
      <button className="celu-tarjeta-texto" onClick={() => abrirInfo(p)}>
        <strong>{p.nombre}</strong>
        <span>{p.descripcion}</span>
        <em className={p.precio ? '' : 'sin-precio'}>{p.precio ? precio(p.precio) : 'Precio a consultar'}</em>
      </button>
      <div className="celu-tarjeta-acciones">
        <div className="celu-stepper">
          <button onClick={() => setElegida((n) => siguiente(p, n, -1))} disabled={elegida === 0} aria-label="Menos"><Menos size={16} /></button>
          <span aria-live="polite">{elegida}</span>
          <button onClick={() => setElegida((n) => siguiente(p, n, 1))} aria-label="Más"><Mas size={16} /></button>
        </div>
        <motion.button className={'celu-agregar' + (sumado ? ' ok' : '')} onClick={agregar} whileTap={{ scale: 0.9 }} aria-label={`Agregar ${elegida || minimo(p)} ${p.nombre} al carrito`}>
          {sumado ? (
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          ) : (
            <Carrito size={20} />
          )}
        </motion.button>
      </div>
    </motion.li>
  )
}

function Pedidos({ historial, repetir }) {
  return (
    <section className="celu-seccion">
      <div className="celu-titulo"><h2>Mis pedidos</h2></div>
      {historial.length === 0 ? (
        <div className="celu-vacio">
          <p><strong>Todavía no hiciste pedidos.</strong></p>
          <p>Cuando mandes uno por WhatsApp, queda guardado acá para repetirlo con un toque.</p>
        </div>
      ) : (
        <ul className="celu-historial">
          {historial.map((h) => (
            <li key={h.fecha}>
              <div>
                <strong>{new Date(h.fecha).toLocaleDateString('es-AR', { day: 'numeric', month: 'long' })}</strong>
                <span>{h.items.map((i) => `${i.cant} x ${PRODUCTOS.find((p) => p.id === i.id)?.nombre || i.id}`).join(', ')}</span>
              </div>
              <button className="boton boton-borde" onClick={() => repetir(h)}>Repetir</button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

function Contacto() {
  return (
    <section className="celu-seccion celu-contacto">
      <div className="celu-titulo"><h2>Contacto</h2></div>
      <a className="celu-contacto-fila" href={waLink(`Hola ${TIENDA.nombre}, tengo una consulta.`)} target="_blank" rel="noopener noreferrer">
        <span className="celu-contacto-icono wa"><IconoWA size={24} /></span>
        <span><strong>WhatsApp</strong><small>Pedidos y consultas</small></span>
        <Flecha size={18} />
      </a>
      <a className="celu-contacto-fila" href={`https://instagram.com/${TIENDA.instagram}`} target="_blank" rel="noopener noreferrer">
        <span className="celu-contacto-icono ig"><IconoIG size={22} /></span>
        <span><strong>Instagram</strong><small>@{TIENDA.instagram}</small></span>
        <Flecha size={18} />
      </a>
      <dl className="celu-datos">
        <div><dt>Horarios</dt><dd>{TIENDA.horarios}</dd></div>
        <div><dt>Entrega</dt><dd>{TIENDA.entrega}</dd></div>
        <div><dt>Pago</dt><dd>{TIENDA.pago.opciones.join(' o ')}. {TIENDA.pago.aviso}</dd></div>
      </dl>
    </section>
  )
}
