import { Link } from "react-router-dom";
import LogoutButton from "./Logout";

const Menuadm = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/Dashboard">📊 Dashboard</Link></li>
        <li><Link to="/Contacto">✉️ Contactos</Link></li>
        <li><Link to="/Clientes">💼 Clientes</Link></li>
        <li><Link to="/DocumentosPage">📄 Documentos</Link></li>
        <li><Link to="/UsuariosPage">👥 Usuarios</Link></li>
        <li><Link to="/Godocupage">📑 Godocu</Link></li>
        <li> <LogoutButton/></li>
      </ul>
    </div>
  );
};

export default Menuadm;