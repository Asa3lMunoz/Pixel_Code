import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DocumentosApi() {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState([]); // Estado para las filas seleccionadas

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/documents');
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

  // Paginación
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
              <th>Seleccionar</th> {/* Nueva columna para checkbox */}
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Cliente</th>
              <th>Funcionario Creador</th>
              <th>Fecha Creación</th>
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
                <td>{datos.name}</td>
                <td>{datos.description}</td>
                <td>{datos.client?.name ?? 'Sin cliente'}</td>
                <td>{`${datos.createdBy?.firstName ?? ''} ${datos.createdBy?.lastName ?? ''}`}</td>
                <td>{new Date(datos.createdAt).toLocaleDateString()}</td>
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

export default DocumentosApi;
