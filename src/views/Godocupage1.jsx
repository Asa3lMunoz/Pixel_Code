import { useEffect } from "react";
import Header from "../components/Header";
import Menuadm from "../components/Menuadm";

export default function Godocupage1() {
  return (
    <div>
      <Header />
      <Menuadm />
      <div className="table-container">
      <button>Crear</button>
        <table className="custom-table">
          <thead>
            <tr>
              <th></th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Item Agrupación</th>
              <th>Link descarga</th>
              <th>Fecha creación</th>
              <th>Creado por</th>
            </tr>
          </thead>
          <tbody>
            {/* Aquí puedes agregar filas dinámicamente */}
          </tbody>
        </table>
      </div>
    </div>
  );
}