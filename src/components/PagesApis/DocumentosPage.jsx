import { useEffect } from "react";
import HeaderPanel from "../HeaderPanel";
import Menuadm from "../Menuadm";
import DocumentosApi from "./DocumentosApi";

export default function DocumentosPage() {
  return (
    <>
      <HeaderPanel/>
      <Menuadm />
      <div className="documentosapi">
        <DocumentosApi />
      </div>
    </>
  );
}