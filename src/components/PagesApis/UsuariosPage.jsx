import HeaderPanel from "../HeaderPanel";
import Menuadm from "../Menuadm";
import UsuariosApi from "./UsuariosApi";

export default function UsuariosPage() {
  return (
    <>
      <HeaderPanel />
      <Menuadm />
      <div className="adm-page-content">
        <div className="adm-page-header">
          <h1>Usuarios</h1>
          <p>Gestión de usuarios del sistema</p>
        </div>
        <UsuariosApi />
      </div>
    </>
  );
}