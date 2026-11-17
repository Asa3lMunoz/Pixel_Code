export default function HomeFooter() {
  return (
    <footer>
      <div className="wrap foot">
        <a href="/#inicio" className="logo">
          <span className="logo-mark" aria-hidden="true"><i /><i /><i /><i /></span>
          <span>Pixel<b>Code</b></span>
        </a>
        <ul>
          <li><a href="/#servicios">Servicios</a></li>
          <li><a href="/#proceso">Proceso</a></li>
          <li><a href="/#nosotros">Nosotros</a></li>
          <li><a href="/#contacto">Contacto</a></li>
        </ul>
        <span>© {new Date().getFullYear()} PixelCode. Todos los derechos reservados.</span>
      </div>
    </footer>
  );
}
