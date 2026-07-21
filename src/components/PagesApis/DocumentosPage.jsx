import HeaderPanel from "../HeaderPanel";
import Menuadm from "../Menuadm";
import DocumentosApi from "./DocumentosApi";

export default function DocumentosPage() {
  return (
    <>
      <HeaderPanel />
      <Menuadm />
      <div className="adm-page-content">
        <div className="adm-page-header">
          <h1>Documentos</h1>
          <p>Listado de documentos registrados</p>
        </div>
        <DocumentosApi />
      </div>
    </>
  );
}