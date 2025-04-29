import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function GodocuApi() {
  const navigate = useNavigate();

  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [idEvento,setId] = useState("");
  

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState([]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/documents');
      if (response.data && response.data.success) {
        setDatos(response.data.data);
      }
    } catch (err) {
      setError('Error al obtener los datos');
    } finally {
      setLoading(false);
    }
  };

  const deleteDocuments = async () => {
    for (const id of selectedRows) {
      try {
        await axios.delete(`http://localhost:3000/api/v1/documents/${id}`);
      } catch (error) {
        console.error(`Error al eliminar documento con id ${id}:`, error);
      }
    }
    setSelectedRows([]);
    fetchMessages(); // Actualiza la tabla
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', options);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = datos.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(datos.length / rowsPerPage);

  const handleCheckboxChange = (id) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="contenedor-ADM">
      <div className="acciones-superiores">
        <button onClick={() => navigate('/GodocuEditor')}>Crear</button>

        {selectedRows.length > 0 && (
          <button onClick={deleteDocuments} style={{ marginLeft: '1rem', backgroundColor: 'red', color: 'white' }}>
            Eliminar
          </button>
        )}
      </div>

      <table className="contenedor-ADM-2">
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
          {currentRows.map((document) => (
            <tr key={document.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(document.id)}
                  onChange={() => handleCheckboxChange(document.id)}
                />
              </td>
              <td>{document.name}</td>
              <td>{document.category}</td>
              <td>{document.category}</td>
              
          



              <td>
                <a href={document.url} target="_blank" rel="noopener noreferrer">
                  {document.url}
                </a>
              </td>
              <td>{formatDate(document.createdAt)}</td>
              <td>
                {document.createdByData?.success && document.createdByData.data
                  ? `${document.createdByData.data.firstName} ${document.createdByData.data.lastName}`
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
  );
}

export default GodocuApi;
