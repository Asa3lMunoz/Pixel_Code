import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function GodocuApi() {
  const navigate = useNavigate();

  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // 1) Función para borrar los documentos seleccionados
  const deleteDocuments = async () => {
    try {
      // por cada id seleccionado, hacemos DELETE
      await Promise.all(
        selectedRows.map(id =>
          axios.delete(`http://localhost:3000/api/v1/documents/${id}`)
        )
      );
      // limpiamos selección
      setSelectedRows([]);
      // recargamos datos
      fetchMessages();
    } catch (err) {
      console.error('Error al eliminar documentos:', err);
    }
  };

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/api/v1/documents');
      if (response.data?.success) {
        const sortedData = response.data.data.sort((a, b) =>
          new Date(b.createdAt) - new Date(a.createdAt)
        );
        setDatos(sortedData);
      }
    } catch {
      setError('Error al obtener los datos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMessages(); }, []);

  const formatDate = d =>
    new Date(d).toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' });

  const handleCheckboxChange = id => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleDetails = id => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  // paginación
  const last = currentPage * rowsPerPage;
  const first = last - rowsPerPage;
  const currentRows = datos.slice(first, last);
  const totalPages = Math.ceil(datos.length / rowsPerPage);

  if (loading) return <div>Cargando...</div>;
  if (error)   return <div>{error}</div>;

  return (
    <div className="contenedor-ADM">
      <div className="acciones-superiores">
        <button onClick={() => navigate('/GodocuEditor')}>Crear</button>

        {/* 2) Conectamos deleteDocuments aquí */}
        {selectedRows.length > 0 && (
          <button
            onClick={deleteDocuments}
            style={{ marginLeft: '1rem', backgroundColor: 'red', color: 'white' }}
          >
            Eliminar ({selectedRows.length})
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
            <th>Detalles</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map(doc => (
            <React.Fragment key={doc.id}>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(doc.id)}
                    onChange={() => handleCheckboxChange(doc.id)}
                  />
                </td>
                <td>{doc.name}</td>
                <td>{doc.category}</td>
                <td>{doc.category}</td>
                <td>
                  <a href={doc.url} target="_blank" rel="noopener noreferrer">
                    {doc.url}
                  </a>
                </td>
                <td>{formatDate(doc.createdAt)}</td>
                <td>
                  {doc.createdByData?.success
                    ? `${doc.createdByData.data.firstName} ${doc.createdByData.data.lastName}`
                    : 'No disponible'}
                </td>
                <td>
                  <button className="btn-detalles" onClick={() => toggleDetails(doc.id)}>
                    {expandedRow === doc.id ? '▲' : '▼'} Detalles
                  </button>
                </td>
              </tr>

              {expandedRow === doc.id && (
                <tr>
                  <td colSpan="8">
                    <div className="detalle-descargas">
                      <h4>Detalle Descargas</h4>
                      <div className="columnas-detalle">
                        <div className="columna">
                          <strong>General:</strong>
                          <div>Destinatarios: {/* tu dato aquí */}</div>
                          <div>Descargas únicas: -</div>
                          <div>Porcentaje de descarga: -</div>
                        </div>
                        <div className="columna">
                          <strong>Descargaron:</strong>
                          <div>{/* tu dato aquí */}</div>
                        </div>
                        <div className="columna">
                          <strong>Pendientes:</strong>
                          <div>•</div>
                          <div>•</div>
                          <div>•</div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <span>Filas por página:</span>
        <select
          value={rowsPerPage}
          onChange={e => { setRowsPerPage(+e.target.value); setCurrentPage(1); }}
        >
          {[5,10,25].map(n => <option key={n} value={n}>{n}</option>)}
        </select>

        <span>
          {first+1}-{Math.min(last, datos.length)} de {datos.length}
        </span>

        <button onClick={() => setCurrentPage(p => Math.max(p-1,1))} disabled={currentPage===1}>
          Anterior
        </button>
        {[...Array(totalPages)].map((_,i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i+1)}
            className={currentPage===i+1 ? 'active' : ''}
          >
            {i+1}
          </button>
        ))}
        <button onClick={() => setCurrentPage(p => Math.min(p+1,totalPages))} disabled={currentPage===totalPages}>
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default GodocuApi;
