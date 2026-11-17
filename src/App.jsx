import { useEffect, useMemo, useState } from 'react'
import { MotionConfig } from 'motion/react'
import { CATEGORIAS, PRODUCTOS } from './data/tienda'
import { siguiente, useRuta } from './lib'
import Header from './components/Header'
import Inicio from './pages/Inicio'
import Categoria from './pages/Categoria'
import InfoProducto from './components/InfoProducto'
import Pedido from './components/Pedido'
import Pie from './components/Pie'
import AppCelu from './celu/AppCelu'

// En pantallas chicas la página se usa como una app de delivery.
function useEsCelu() {
  const q = '(max-width: 899px)'
  const [celu, setCelu] = useState(() => window.matchMedia(q).matches)
  useEffect(() => {
    const m = window.matchMedia(q)
    const cambio = () => setCelu(m.matches)
    m.addEventListener('change', cambio)
    return () => m.removeEventListener('change', cambio)
  }, [])
  useEffect(() => {
    document.documentElement.classList.toggle('tema-celu', celu)
  }, [celu])
  return celu
}

function leerHistorial() {
  try { return JSON.parse(localStorage.getItem('pedidos') || '[]') } catch { return [] }
}

export default function App() {
  const celu = useEsCelu()
  const [historial, setHistorial] = useState(leerHistorial)
  const ruta = useRuta()
  const cat = CATEGORIAS.find((c) => c.id === ruta)
  const [carrito, setCarrito] = useState({}) // { idProducto: cantidad }
  const [info, setInfo] = useState(null) // producto abierto en "Info"
  const [verPedido, setVerPedido] = useState(false)

  // cambiar(id, 1) o cambiar(id, -1): un paso (de a 1, o de a docena en los productos por docena).
  // sumar(id, n): suma n de una (lo usa la tarjeta del celu, que elige la cantidad antes).
  const poner = (id, calcular) =>
    setCarrito((c) => {
      const cant = calcular(c[id] || 0)
      const nuevo = { ...c }
      if (cant <= 0) delete nuevo[id]
      else nuevo[id] = cant
      return nuevo
    })
  const cambiar = (id, dir) => poner(id, (cant) => siguiente(PRODUCTOS.find((x) => x.id === id), cant, dir))
  const sumar = (id, n) => poner(id, (cant) => cant + n)

  const items = useMemo(
    () => Object.entries(carrito).map(([id, cant]) => ({ p: PRODUCTOS.find((x) => x.id === id), cant })),
    [carrito],
  )
  const unidades = items.length // cuántos productos distintos hay en el carrito
  const comun = { carrito, cambiar, sumar, abrirInfo: setInfo }

  // Cada pedido enviado queda guardado en el celular del cliente, para repetirlo.
  const alEnviar = () => {
    const nuevo = [{ fecha: Date.now(), items: items.map(({ p, cant }) => ({ id: p.id, cant })) }, ...historial].slice(0, 10)
    setHistorial(nuevo)
    try { localStorage.setItem('pedidos', JSON.stringify(nuevo)) } catch { /* sin almacenamiento */ }
  }
  const repetir = (h) => {
    setCarrito(Object.fromEntries(h.items.filter((i) => PRODUCTOS.some((p) => p.id === i.id)).map((i) => [i.id, i.cant])))
    setVerPedido(true)
  }

  return (
    <MotionConfig reducedMotion="user">
      <a href="#contenido" className="saltar">Saltar al contenido</a>
      {celu ? (
        <main id="contenido">
          <AppCelu {...comun} abrirPedido={() => setVerPedido(true)} unidades={unidades} historial={historial} repetir={repetir} />
        </main>
      ) : (
        <>
          <Header ruta={ruta} unidades={unidades} abrirPedido={() => setVerPedido(true)} />
          <main id="contenido">{cat ? <Categoria key={cat.id} cat={cat} {...comun} /> : <Inicio {...comun} />}</main>
          <Pie />
        </>
      )}
      <InfoProducto p={info} cerrar={() => setInfo(null)} cant={info ? carrito[info.id] || 0 : 0} cambiar={cambiar} />
      <Pedido items={items} cambiar={cambiar} vaciar={() => setCarrito({})} abierto={verPedido} setAbierto={setVerPedido} alEnviar={alEnviar} />
    </MotionConfig>
  )
}
