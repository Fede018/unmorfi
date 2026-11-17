import Intro from '../components/Intro'
import Pasos from '../components/Pasos'
import Elegir from '../components/Elegir'
import Contacto from '../components/Contacto'

export default function Inicio(props) {
  return (
    <>
      <Intro />
      <Pasos />
      <Elegir {...props} />
      <Contacto />
    </>
  )
}
