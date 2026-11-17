import { motion } from 'motion/react'
import { TIENDA } from '../data/tienda'
import { waLink } from '../lib'
import { IconoIG, IconoWA } from './Iconos'
import Marca from './Marca'

// Segunda portada: el nombre grande y las redes.
export default function Contacto() {
  return (
    <section id="contacto" className="contacto">
      <div className="contacto-brillo" aria-hidden="true" />
      <div className="wrap contacto-centro">
        {TIENDA.logo?.blanco && <img src={TIENDA.logo.blanco} alt="" className="contacto-logo" />}
        <motion.h2
          initial={{ y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <Marca />
        </motion.h2>
        <p>Seguinos para ver lo que sale del horno cada día, o escribinos para encargar.</p>
        <div className="redes">
          <a className="boton boton-wa" href={waLink(`Hola ${TIENDA.nombre}, tengo una consulta.`)} target="_blank" rel="noopener noreferrer">
            <IconoWA size={20} /> WhatsApp
          </a>
          <a className="boton boton-borde" href={`https://instagram.com/${TIENDA.instagram}`} target="_blank" rel="noopener noreferrer">
            <IconoIG size={20} /> Instagram
          </a>
        </div>
      </div>
    </section>
  )
}
