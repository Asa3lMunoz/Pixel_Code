import HeaderPanel from "../HeaderPanel";
import Menuadm from "../Menuadm";
import GodocuApi from "./GodocuApi";

export default function GodocuPage() {
  return (
    <>
      <HeaderPanel />
      <Menuadm />
      <div className="adm-page-content">
        <div className="adm-page-header">
          <h1>Godocu</h1>
          <p>Administración de documentos y descargas</p>
        </div>
        <GodocuApi />
      </div>
    </>
  );
}