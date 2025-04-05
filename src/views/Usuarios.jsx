import { useEffect } from "react";
import Header from "../components/Header";
import Menuadm from "../components/Menuadm";

export default function Usuarios() {
  return (
    <div>
      <Header />
      <Menuadm />
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th></th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Funcionario de</th>
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