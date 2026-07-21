import { Link, useLocation } from "react-router-dom";
import LogoutButton from "./Logout";

const NAV_ITEMS = [
  { to: "/Dashboard",      label: "Dashboard",   icon: "📊" },
  { to: "/Contacto",       label: "Contactos",   icon: "✉️" },
  { to: "/Clientes",       label: "Clientes",    icon: "💼" },
  { to: "/DocumentosPage", label: "Documentos",  icon: "📄" },
  { to: "/UsuariosPage",   label: "Usuarios",    icon: "👥" },
  { to: "/Godocupage",     label: "Godocu",      icon: "📑" },
];

const Menuadm = () => {
  const location = useLocation();
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <ul>
          {NAV_ITEMS.map(({ to, label, icon }) => (
            <li key={to}>
              <Link
                to={to}
                className={`sidebar-link${location.pathname === to ? " active" : ""}`}
              >
                <span className="sidebar-icon">{icon}</span>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="sidebar-footer">
        <LogoutButton />
      </div>
    </aside>
  );
};

export default Menuadm;