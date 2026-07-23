import Header from "../components/Header";
import Formulario from "./Formulario";
import Footer from "../components/Footer";

import hero from "../img/cabezera.png";
import icono from "../img/icono.png";
import Logo2 from "../img/Logo2.png";
import Letra from "../img/E.png";

export default function IndexPage() {

  const handleScroll = () => {
    window.scrollBy({
      top: 730,
      behavior: "smooth",
    });
  };

  return (
    <div className="indexpageblobal">
      <Header />

      {/* HERO */}
      <div className="hero">
        <img src={hero} alt="hero" className="hero-image" />
        <img src={icono} alt="icono" className="icono" />
        <img src={Logo2} alt="logo" className="logo2" />

        <div className="eslogan">
          <h3 className="PD">Diseño</h3>
          <img src={Letra} alt="E" className="letrae" />
          <h3 className="PC">Código</h3>
        </div>

        <button className="button" onClick={handleScroll}>
          ¡Hablemos!
        </button>
      </div>

      <Formulario />
      <Footer />
    </div>
  );
}
