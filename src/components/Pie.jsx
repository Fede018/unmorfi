import { CATEGORIAS, TIENDA } from '../data/tienda'
import { waLink } from '../lib'
import { IconoIG, IconoWA } from './Iconos'
import Marca from './Marca'

export default function Pie() {
  return (
    <footer className="pie">
      <div className="wrap">
        <a className="pie-banda" href={waLink(`Hola ${TIENDA.nombre}, quiero recibir las novedades.`)} target="_blank" rel="noopener noreferrer">
          <strong>{TIENDA.logo?.blanco && <img src={TIENDA.logo.blanco} alt="" className="pie-logo" />}<Marca /></strong>
          <span>Escribinos por WhatsApp y te avisamos cuando haya productos nuevos y promos.</span>
        </a>
        <div className="pie-redes">
          <a href={waLink(`Hola ${TIENDA.nombre}, tengo una consulta.`)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><IconoWA size={20} /></a>
          <a href={`https://instagram.com/${TIENDA.instagram}`} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><IconoIG size={20} /></a>
        </div>
        <nav className="pie-links" aria-label="Pie">
          <a href="#/">Inicio</a>
          {CATEGORIAS.map((c) => <a key={c.id} href={`#/${c.id}`}>{c.nombre}</a>)}
        </nav>
        <p className="pie-chico">{TIENDA.horarios} · {TIENDA.entrega} · © {new Date().getFullYear()} {TIENDA.nombre}</p>
      </div>
    </footer>
  )
}
