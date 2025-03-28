import Header from "../components/Header"
import Formulario from '../components/Formulario'
import Footer from '../components/Footer'
import hero from '../img/cabezera.png'


import icono from '../img/icono.png'
import Logo2 from '../img/Logo2.png'
import Letra from '../img/E.png'

export default function IndexPage() {
  return (
    <>

        <div className="indexpageblobal">
          

          <Header/>
          
          <div className="hero">
            <img src={hero} alt="hero.png" class="hero-image" />
            <img src={icono} alt="icono" class="icono" />
            <img src={Logo2} className="logo2"/>
  
            <div className="eslogan">
              <h3 className="PD">Diseño</h3>
  
              <img src={Letra} className="letrae"/>
              <h3 className="PC">Código</h3>
            </div>
  
            <div className="parrafo">
              <p>
                En PixelCode tenemos la experiencia necesaria para que juntos llevemos a la realidad tus ideas y proyectos.
              </p>
              <br />
              <p>
                Nos caracterizamos por diseñar y desarrollar soluciones incorporando a nuestros clientes durante todo el proceso, lo que nos permite llegar en conjunto, a productos precisos y acorde a la realidad de cada cliente.
              </p>
  
            </div>
  
            <button className="button">Hablemos!</button>
          </div>
  
  
  
          <Formulario/>
          <Footer/>

        </div>

        
    </>
  )
}
