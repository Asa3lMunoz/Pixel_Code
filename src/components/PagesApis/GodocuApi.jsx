import React, { useEffect, useState } from 'react';
import axios from 'axios';

function GodocuApi() {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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

  // Paginación lógica
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = datos.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(datos.length / rowsPerPage);

  return (
    <>
      <div className='contenedor-ADM'>
        <table className='contenedor-ADM-2'>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripcion</th>
              <th>Item Agrupación</th>
              <th>Link Descarga</th>
              <th>Fecha Creación</th>
              <th>Creado por</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((datos, index) => (
              <tr key={index}>
                <td>{datos.name}</td>
                <td>{datos.category}</td>
                <td>{datos.category}</td>
                <td><a href={datos.url} target='_blank' rel='noopener noreferrer'>{datos.url}</a></td>
                <td>{datos.created}</td>
                <td>**Faltan los datos**</td>
              </tr>
            ))}
          </tbody>
        </table>

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

export default GodocuApi;
