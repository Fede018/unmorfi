import { useEffect, useState } from 'react'
import { TIENDA } from '../data/tienda'
import { irA } from '../lib'
import Marca from './Marca'

export default function Header({ ruta, unidades, abrirPedido }) {
  const [solido, setSolido] = useState(false)
  useEffect(() => {
    const ver = () => setSolido(window.scrollY > 40 || ruta !== '')
    ver()
    window.addEventListener('scroll', ver, { passive: true })
    return () => window.removeEventListener('scroll', ver)
  }, [ruta])

  const productos = (e) => {
    e.preventDefault()
    if (ruta !== '') {
      window.location.hash = '#/'
      setTimeout(() => irA('productos'), 60)
    } else irA('productos')
  }

  return (
    <header className={'nav' + (solido ? ' nav-solido' : '')}>
      <div className="wrap nav-fila">
        <a href="#/" className="marca">{TIENDA.logo?.blanco && <img src={TIENDA.logo.blanco} alt="" className="marca-logo" />}<Marca /></a>
        <nav aria-label="Principal" className="nav-links">
          <a href="#/" className="nav-link" aria-current={ruta === '' ? 'page' : undefined}>Inicio</a>
          <a href="#/" onClick={productos} className="nav-link" aria-current={ruta !== '' ? 'page' : undefined}><span className="solo-compu">Nuestros p</span><span className="solo-celu">P</span>roductos</a>
        </nav>
        <button className="nav-carrito" onClick={abrirPedido} aria-label={`Ver pedido, ${unidades} productos`}>
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M5 7h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 7Zm3 0V6a4 4 0 0 1 8 0v1" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></svg>
          {unidades > 0 && <span className="badge">{unidades}</span>}
        </button>
      </div>
    </header>
  )
}
