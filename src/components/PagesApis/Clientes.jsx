import HeaderPanel from "../HeaderPanel";
import Menuadm from "../Menuadm";

export default function Clientes() {
  return (
    <div>
      <HeaderPanel />
      <Menuadm />
      <div className="adm-page-content">
        <div className="adm-page-header">
          <h1>Clientes</h1>
          <p>Listado de clientes registrados</p>
        </div>
        <div className="contenedor-ADM">
        <table className="contenedor-ADM-2">
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
    </div>
  );
}