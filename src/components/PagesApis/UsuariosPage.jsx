import HeaderPanel from "../HeaderPanel";
import Menuadm from "../Menuadm";
import UsuariosApi from "./UsuariosApi";
export default function UsuariosPage() {
  return (
    <>
      <HeaderPanel/>
      <Menuadm />
      <div className="contactoRecep">
        <UsuariosApi />
      </div>
    </>
  );
}