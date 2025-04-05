import { useEffect } from "react";
import Header from "../components/Header";
import Menuadm from "../components/Menuadm";

export default function ContactoRecep() {
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
              <th>Email</th>
              <th>Teléfono</th>
              <th>Mensaje</th>
              <th>Fecha Recepción</th>
              <th>Contestado</th>
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