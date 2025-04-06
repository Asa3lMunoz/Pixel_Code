import { useEffect } from "react";
import HeaderPanel from "../HeaderPanel";
import Menuadm from "../Menuadm";
import GodocuApi from "./GodocuApi";

export default function GodocuPage() {
  return (
    <>
      <HeaderPanel/>
      <Menuadm />
      <div className="godocupage">
        <GodocuApi/>
      </div>

    </>
  );
}