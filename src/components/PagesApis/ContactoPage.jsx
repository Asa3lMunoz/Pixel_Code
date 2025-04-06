import { useEffect } from "react";
import Header from "../Header";
import Menuadm from "../Menuadm";
import HeaderPanel from "../HeaderPanel";
import TablaContacto from "./Contacto"

export default function ContactoPage() {
  return (
    <>
      <HeaderPanel />
      <Menuadm />
      <div className="contactoRecep">
        <TablaContacto />
      </div>
    </>


  );
}