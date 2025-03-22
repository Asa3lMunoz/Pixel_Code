import Header from "../components/Header"
import Formulario from '../components/Formulario'
import Footer from '../components/Footer'
import hero from '../img/ss.png'
export default function IndexPage() {
  return (
    <>
    
        <Header/>
        <div className='hero'>
          <img src={hero} alt="hero.png" />
          <a href="">Hablemos!</a>
        </div>
        <Formulario/>
        <Footer/>
        
    </>
  )
}
