import { useEffect } from "react";
import Header from "../components/Header";
import Menuadm from "../components/Menuadm";

export default function Documentos() {
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
              <th>Descripción</th>
              <th>Cliente</th>
              <th>Funcionario Creador</th>
              <th>Fecha Creación</th>
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