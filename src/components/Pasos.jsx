const PASOS = [
  ['Elegí', 'Dulce o salado, sumá al carrito.'],
  ['Pedí', 'Te llega armado por WhatsApp.'],
  ['Pagá', 'Por transferencia, antes de cocinar.'],
  ['Disfrutá', 'Retirás o te lo llevamos.'],
]

// Versión chica, justo debajo de la portada.
export default function Pasos() {
  return (
    <section className="pasos pasos-mini" aria-labelledby="pasos-titulo">
      <div className="wrap">
        <div className="pasos-caja">
          <h2 id="pasos-titulo">Así de fácil</h2>
          <ol className="pasos-lista">
            {PASOS.map(([t, d]) => (
              <li key={t}>
                <h3>{t}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
