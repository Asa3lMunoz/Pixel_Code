import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function GodocuApi() {
  const navigate = useNavigate(); // ✅ Asegúrate de que esto está dentro del componente

  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState([]);

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

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', options);
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = datos.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(datos.length / rowsPerPage);

  const handleCheckboxChange = (index) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(index)) {
        return prevSelectedRows.filter((item) => item !== index);
      } else {
        return [...prevSelectedRows, index];
      }
    });
  };

  return (
    <>
      <div className='contenedor-ADM'>

        <div className="acciones-superiores">
          <button onClick={() => navigate('/GodocuEditor')}>
             Crear
          </button>
        </div>

        <table className='contenedor-ADM-2'>
          <thead>
            <tr>
              <th>Seleccionar</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Item Agrupación</th>
              <th>Link Descarga</th>
              <th>Fecha Creación</th>
              <th>Creado por</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((datos, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(index)}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </td>
                <td>{datos.name}</td>
                <td>{datos.category}</td>
                <td>{datos.category}</td>
                <td>
                  <a href={datos.url} target='_blank' rel='noopener noreferrer'>
                    {datos.url}
                  </a>
                </td>
                <td>
                    {formatDate(datos.createdAt)}
                </td>
                <td>
                  {datos.createdByData && datos.createdByData.success && datos.createdByData.data
                      ? `${datos.createdByData.data.firstName} ${datos.createdByData.data.lastName}`
                      : 'No disponible'}
                </td>
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
