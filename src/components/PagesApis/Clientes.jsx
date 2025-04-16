import { useEffect } from "react";
import HeaderPanel from "../HeaderPanel";
import Menuadm from "../Menuadm";

export default function Clientes() {
  return (
    <div>
      <HeaderPanel />
      <Menuadm />
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th></th>
              <th>Nombre</th>
              <th>Razón Social</th>
              <th>Fecha último Pago</th>
              <th>Email</th>
              <th>Web</th>
              <th>Fecha Creación</th>
              <th>Fecha Edición</th>
              <th>Activo</th>
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