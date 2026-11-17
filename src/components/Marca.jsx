import { TIENDA } from '../data/tienda'

// El nombre escrito como logotipo: "un" fino y "Morfi" bien grueso.
// Si el nombre no empieza en minúscula, se escribe entero en grueso.
export default function Marca({ className = '' }) {
  const m = TIENDA.nombre.match(/^([a-záéíóúñ]+)(.+)$/)
  return (
    <span className={'nombre-marca ' + className} aria-label={TIENDA.nombre}>
      {m ? (
        <>
          <span className="nm-a" aria-hidden="true">{m[1]}</span>
          <span className="nm-b" aria-hidden="true">{m[2]}</span>
        </>
      ) : (
        <span className="nm-b" aria-hidden="true">{TIENDA.nombre}</span>
      )}
    </span>
  )
}
