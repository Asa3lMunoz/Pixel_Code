import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UsuariosApi() {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10); // opción 2 por defecto
  const [selectedRows, setSelectedRows] = useState([]); // Estado para las filas seleccionadas

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/users');
      if (response.data && response.data.success) {
        setDatos(response.data.data);
      }
      setLoading(false);
    } catch (err) {
      setError('Error al obtener los datos');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  // Paginación lógica
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = datos.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(datos.length / rowsPerPage);

  // Función para manejar el cambio en la checkbox
  const handleCheckboxChange = (index) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(index)) {
        return prevSelectedRows.filter((item) => item !== index); // Deseleccionar
      } else {
        return [...prevSelectedRows, index]; // Seleccionar
      }
    });
  };

  return (
    <>
      <div className='contenedor-ADM'>
        
        <table className='contenedor-ADM-2'>
          <thead>
            <tr>
              <th>Seleccionar</th> {/*checkbox */}
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Funcionario de</th>
              <th>Fecha Creación</th>
              <th>Fecha Edición</th>
              <th>Activo</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((datos, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(index)} // Verificar si esta fila está seleccionada
                    onChange={() => handleCheckboxChange(index)} // Llamar al handler para actualizar estado
                  />
                </td>
                <td>{datos.firstName}</td>
                <td>{datos.lastName}</td>
                <td>{datos.email}</td>
                <td>**Faltan los datos**</td>
                <td>**Faltan los datos**</td>
                <td>**Faltan los datos**</td>
                <td>{datos.active ? '✔' : 'X'}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Paginación visual */}
        <div className="pagination">
          <span>Filas por página:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(parseInt(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
          </select>

          <span>
            {indexOfFirstRow + 1}-{Math.min(indexOfLastRow, datos.length)} de {datos.length}
          </span>

          <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
            Anterior
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={currentPage === i + 1 ? 'active' : ''}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Siguiente
          </button>
        </div>
      </div>
    </>
  );
}

export default UsuariosApi;
