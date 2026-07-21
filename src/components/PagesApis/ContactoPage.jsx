import Menuadm from "../Menuadm";
import HeaderPanel from "../HeaderPanel";
import TablaContacto from "./Contacto"

export default function ContactoPage() {
  return (
    <>
      <HeaderPanel />
      <Menuadm />
      <div className="adm-page-content">
        <div className="adm-page-header">
          <h1>Contactos</h1>
          <p>Mensajes recibidos desde el formulario</p>
        </div>
        <TablaContacto />
      </div>
    </>
  );
}