import { Link } from "react-router-dom";

const Menuadm = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/Dashboard">📊 Dashboard</Link></li>
        <li><Link to="/ContactoRecep">✉️ Contactos</Link></li>
        <li><Link to="/Clientes">💼 Clientes</Link></li>
        <li><Link to="/Documentos">📄 Documentos</Link></li>
        <li><Link to="/Usuarios">👥 Usuarios</Link></li>
        <li><Link to="/Godocupage1">📑 Godocu</Link></li>
      </ul>
    </div>
  );
};

export default Menuadm;