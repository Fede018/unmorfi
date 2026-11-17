import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { TIENDA } from '../data/tienda'
import { waLink } from '../lib'
import { IconoIG, IconoWA } from './Iconos'

// Portada. Sin video: portada abierta con los productos (IntroFoto).
// Con video: el nombre gigante es un "agujero" que se abre al bajar, y después el video (la mano que gira y cambia de producto) se ve de dos formas:
// modo 'bucle': el video se repite solo y el nombre de cada producto cambia con el video.
// modo 'scroll': el video avanza con el scroll (necesita la codificación especial del README).
export default function Intro() {
  const { video: src, imagen, frase, escenas, modo = 'bucle' } = TIENDA.hero
  // La configuración no cambia mientras la página está abierta, así que el orden de los hooks es estable.
  if (src && modo === 'bucle') return <IntroBucle />
  if (src) return <IntroScroll />
  return <IntroFoto />
}

function IntroScroll() {
  const { video: src, imagen, frase, escenas } = TIENDA.hero
  const reducir = useReducedMotion()
  const zona = useRef(null)
  const videoRef = useRef(null)
  const { scrollYProgress: p } = useScroll({ target: zona, offset: ['start start', 'end end'] })

  // 0 a 0.22: se abre el nombre. 0.22 a 1: escenas.
  const escala = useTransform(p, [0, 0.22], [1, 14])
  const capa = useTransform(p, [0.12, 0.22], [1, 0])
  const pista = useTransform(p, [0, 0.05], [1, 0])
  const fraseOp = useTransform(p, [0, 0.08], [1, 0])
  const zoomMedio = useTransform(p, [0, 0.22, 1], [1.25, 1, 1.06])

  useEffect(() => {
    const v = videoRef.current
    if (!v || reducir) return
    let cuadro = null
    return p.on('change', (x) => {
      if (!v.duration) return
      const t = Math.min(1, Math.max(0, (x - 0.18) / 0.82))
      cancelAnimationFrame(cuadro)
      cuadro = requestAnimationFrame(() => (v.currentTime = t * v.duration))
    })
  }, [p, reducir])

  const tramo = 0.78 / escenas.length

  // La máscara usa el tamaño real de la pantalla, así el nombre entra entero.
  const [vista, setVista] = useState({ w: 1000, h: 1000 })
  useEffect(() => {
    const medir = () => setVista({ w: window.innerWidth, h: window.innerHeight })
    medir()
    window.addEventListener('resize', medir)
    return () => window.removeEventListener('resize', medir)
  }, [])
  const nombre = TIENDA.nombre.toUpperCase()
  const fuente = Math.min((vista.w * 0.92) / (nombre.length * 0.5), vista.h * 0.42)

  return (
    <section ref={zona} className={'intro' + (reducir ? ' intro-quieta' : '')} aria-label="Portada">
      <div className="intro-escena">
        <motion.div className="intro-medio" style={{ scale: reducir ? 1 : zoomMedio }}>
          {src ? (
            <video ref={videoRef} src={src} poster={imagen || undefined} muted playsInline preload="auto" />
          ) : imagen ? (
            <img src={imagen} alt="" />
          ) : (
            <div className="intro-provisorio" aria-hidden="true" />
          )}
        </motion.div>
        <div className="intro-velo" />

        {escenas.map((e, i) => (
          <Escena key={e.titulo} e={e} p={p} desde={0.22 + i * tramo} hasta={0.22 + (i + 1) * tramo} ultima={i === escenas.length - 1} reducir={reducir} i={i} />
        ))}

        {!reducir && (
          <motion.svg className="intro-mascara" style={{ opacity: capa }} aria-hidden="true" viewBox={`0 0 ${vista.w} ${vista.h}`}>
            <defs>
              <mask id="agujero">
                <rect width={vista.w} height={vista.h} fill="white" />
                <motion.g style={{ scale: escala, originX: `${vista.w / 2}px`, originY: `${vista.h / 2}px` }}>
                  <text x={vista.w / 2} y={vista.h / 2} textAnchor="middle" dominantBaseline="central" className="intro-mascara-texto" style={{ fontSize: fuente }}>{nombre}</text>
                </motion.g>
              </mask>
            </defs>
            <rect width={vista.w} height={vista.h} fill="var(--marca)" mask="url(#agujero)" />
          </motion.svg>
        )}

        <motion.p className="intro-frase" style={{ opacity: reducir ? 1 : fraseOp }}>{frase}</motion.p>
        {!reducir && <motion.span className="intro-pista" style={{ opacity: pista }}>Bajá para ver</motion.span>}
        <h1 className="oculto">{TIENDA.nombre}: {frase}</h1>
      </div>
    </section>
  )
}

// Mientras no hay video: portada abierta, con los productos en un plato a la derecha,
// el gato chef saludando y el mensaje con los botones a la izquierda.
function IntroFoto() {
  const { imagen, frase, fondo = 'composicion' } = TIENDA.hero
  const reducir = useReducedMotion()
  const zona = useRef(null)
  const { scrollYProgress: p } = useScroll({ target: zona, offset: ['start start', 'end start'] })
  const giro = useTransform(p, [0, 1], [-10, 14])
  const entrar = (d) => (reducir ? {} : { initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: d, ease: [0.16, 1, 0.3, 1] } })

  return (
    <section ref={zona} className={'intro intro-foto intro-abierta intro-fondo-' + fondo} aria-label="Portada">
      <div className="intro-escena">
        <div className="intro-medio">
          {imagen ? (
            <img src={imagen} alt="" fetchpriority="high" />
          ) : (
            // Composición provisoria con las fotos sin fondo, hasta que llegue la imagen de portada.
            <div className="composicion" aria-hidden="true">
              <motion.div className="comp-plato" style={reducir ? undefined : { rotate: giro }} {...(reducir ? {} : { initial: { scale: 0.85, opacity: 0 }, animate: { scale: 1, opacity: 1 }, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } })}>
                <img src="/img/recortes/pastaflora.webp" alt="" />
              </motion.div>
            </div>
          )}
        </div>
        <div className="intro-velo" />

        {TIENDA.mascota && (
          <motion.div className="intro-gato" {...(reducir ? {} : { initial: { opacity: 0, y: 60, rotate: -8 }, animate: { opacity: 1, y: 0, rotate: 0 }, transition: { duration: 0.9, delay: 0.5, type: 'spring', bounce: 0.45 } })}>
            <span className="intro-gato-globo">¡Hola! ¿Qué vas a pedir hoy?</span>
            <img src={TIENDA.mascota} alt="" />
          </motion.div>
        )}

        <div className="intro-foto-texto wrap">
          <motion.span className="intro-chip" {...entrar(0.1)}>Casero · Dulce y salado · Pedidos por WhatsApp</motion.span>
          <motion.h1 {...entrar(0.2)}>{frase}</motion.h1>
          <motion.p {...entrar(0.3)}>Elegí lo que te guste, armá tu pedido y te lo preparamos apenas se acredita el pago.</motion.p>
          <motion.div className="intro-botones" {...entrar(0.4)}>
            <a className="boton boton-naranja" href="#productos" onClick={(e) => { e.preventDefault(); document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' }) }}>
              Ver productos
            </a>
            <a className="boton boton-blanco-borde" href={waLink(`Hola ${TIENDA.nombre}, quería hacer una consulta.`)} target="_blank" rel="noopener noreferrer">
              Escribinos
            </a>
          </motion.div>
          <motion.div className="intro-redes" {...entrar(0.5)}>
            <a href={waLink(`Hola ${TIENDA.nombre}, quería hacer una consulta.`)} target="_blank" rel="noopener noreferrer"><span><IconoWA size={16} /></span> WhatsApp</a>
            <a href={`https://instagram.com/${TIENDA.instagram}`} target="_blank" rel="noopener noreferrer"><span><IconoIG size={16} /></span> @{TIENDA.instagram}</a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Portada con video en bucle: se abre el nombre al bajar y el video sigue solo.
function IntroBucle() {
  const { video: src, imagen, frase, escenas } = TIENDA.hero
  const reducir = useReducedMotion()
  const zona = useRef(null)
  const videoRef = useRef(null)
  const [actual, setActual] = useState(0)
  const { scrollYProgress: p } = useScroll({ target: zona, offset: ['start start', 'end end'] })
  const escala = useTransform(p, [0, 0.6], [1, 14])
  const capa = useTransform(p, [0.35, 0.6], [1, 0])
  const pista = useTransform(p, [0, 0.1], [1, 0])
  const fraseOp = useTransform(p, [0, 0.2], [1, 0])
  const zoomMedio = useTransform(p, [0, 0.6], [1.25, 1])
  const textosOp = useTransform(p, [0.5, 0.7], [0, 1])

  // El nombre del producto sigue al video: cada producto ocupa una parte igual del video.
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (reducir) { v.pause(); return }
    const ver = () => v.duration && setActual(Math.min(escenas.length - 1, Math.floor((v.currentTime / v.duration) * escenas.length)))
    v.addEventListener('timeupdate', ver)
    return () => v.removeEventListener('timeupdate', ver)
  }, [reducir, escenas.length])

  const [vista, setVista] = useState({ w: 1000, h: 1000 })
  useEffect(() => {
    const medir = () => setVista({ w: window.innerWidth, h: window.innerHeight })
    medir()
    window.addEventListener('resize', medir)
    return () => window.removeEventListener('resize', medir)
  }, [])
  const nombre = TIENDA.nombre.toUpperCase()
  const fuente = Math.min((vista.w * 0.92) / (nombre.length * 0.5), vista.h * 0.42)
  const e = escenas[actual]

  return (
    <section ref={zona} className={'intro intro-bucle' + (reducir ? ' intro-quieta' : '')} aria-label="Portada">
      <div className="intro-escena">
        <motion.div className="intro-medio" style={{ scale: reducir ? 1 : zoomMedio }}>
          <video ref={videoRef} src={src} poster={imagen || undefined} muted playsInline autoPlay={!reducir} loop preload="auto" />
        </motion.div>
        <div className="intro-velo" />

        <motion.div className="intro-texto" style={reducir ? undefined : { opacity: textosOp }} aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={e.titulo} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
              <span className="intro-num">0{actual + 1}</span>
              <h2>{e.titulo}</h2>
              <p>{e.texto}</p>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {!reducir && (
          <motion.svg className="intro-mascara" style={{ opacity: capa }} aria-hidden="true" viewBox={`0 0 ${vista.w} ${vista.h}`}>
            <defs>
              <mask id="agujero">
                <rect width={vista.w} height={vista.h} fill="white" />
                <motion.g style={{ scale: escala, originX: `${vista.w / 2}px`, originY: `${vista.h / 2}px` }}>
                  <text x={vista.w / 2} y={vista.h / 2} textAnchor="middle" dominantBaseline="central" className="intro-mascara-texto" style={{ fontSize: fuente }}>{nombre}</text>
                </motion.g>
              </mask>
            </defs>
            <rect width={vista.w} height={vista.h} fill="var(--marca)" mask="url(#agujero)" />
          </motion.svg>
        )}

        <motion.p className="intro-frase" style={{ opacity: reducir ? 1 : fraseOp }}>{frase}</motion.p>
        {!reducir && <motion.span className="intro-pista" style={{ opacity: pista }}>Bajá para ver</motion.span>}
        <h1 className="oculto">{TIENDA.nombre}: {frase}</h1>
      </div>
    </section>
  )
}

function Escena({ e, p, desde, hasta, ultima, reducir, i }) {
  const largo = hasta - desde
  const op = useTransform(p, ultima ? [desde, desde + largo * 0.2, 1] : [desde, desde + largo * 0.2, hasta - largo * 0.2, hasta], ultima ? [0, 1, 1] : [0, 1, 1, 0])
  const y = useTransform(p, [desde, desde + largo * 0.25], [40, 0])
  if (reducir && i > 0) return null
  return (
    <motion.div className="intro-texto" style={reducir ? undefined : { opacity: op, y }}>
      <span className="intro-num">0{i + 1}</span>
      <h2>{e.titulo}</h2>
      <p>{e.texto}</p>
    </motion.div>
  )
}
