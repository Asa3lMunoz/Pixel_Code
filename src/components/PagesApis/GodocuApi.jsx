import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function GodocuApi() {
  const navigate = useNavigate();

  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const deleteDocuments = async () => {
    await Promise.all(
      selectedRows.map(id =>
        axios.delete(`http://localhost:3000/api/v1/documents/${id}`)
      )
    );
    setSelectedRows([]);
    fetchMessages();
  };

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:3000/api/v1/documents');
      if (!res.data.success) throw new Error('API falló');
      setDatos(
        res.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
    } catch (e) {
      setError('Error al obtener datos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const formatDate = d =>
    new Date(d).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });

  const toggleDetails = id =>
    setExpandedRow(expandedRow === id ? null : id);

  const start = (currentPage - 1) * rowsPerPage;
  const pageData = datos.slice(start, start + rowsPerPage);
  const totalPages = Math.ceil(datos.length / rowsPerPage);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="contenedor-ADM">
      <div className="acciones-superiores">
        <button onClick={() => navigate('/GodocuEditor')}>Crear</button>
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
          {pageData.map(doc => {
            const total = Array.isArray(doc.rows) ? doc.rows.length : 0;
            const history = Array.isArray(doc.downloadHistory) ? doc.downloadHistory : [];
            const descargados = history.map(h => h.email);
            const pendientes = Array.isArray(doc.rows)
              ? doc.rows.filter(r => !descargados.includes(r.email))
              : [];
            const porcentaje = total
              ? Math.round((descargados.length / total) * 100)
              : 0;

            return (
              <React.Fragment key={doc.id}>
                <tr
                  onClick={e => {
                    if (
                      e.target.tagName !== 'INPUT' &&
                      e.target.tagName !== 'BUTTON' &&
                      e.target.tagName !== 'A'
                    ) {
                      navigate(`/GodocuEditorEdit/${doc.id}`);
                    }
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <td onClick={e => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(doc.id)}
                      onChange={() =>
                        setSelectedRows(s =>
                          s.includes(doc.id)
                            ? s.filter(x => x !== doc.id)
                            : [...s, doc.id]
                        )
                      }
                    />
                  </td>
                  <td>{doc.name}</td>
                  <td>{doc.description || '-'}</td>
                  <td>{doc.category}</td>
                  <td>
                    <a href={`certificado/${doc.id}`} target="_blank" rel="noopener noreferrer">
                        Acceder a link de Descarga
                    </a>
                  </td>
                  <td>{formatDate(doc.createdAt)}</td>
                  <td>
                    {doc.createdByData?.success
                      ? `${doc.createdByData.data.firstName} ${doc.createdByData.data.lastName}`
                      : 'No disponible'}
                  </td>
                  <td onClick={e => e.stopPropagation()}>
                    <button
                      className="btn-detalles"
                      onClick={() => toggleDetails(doc.id)}
                    >
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
                            <div>Destinatarios: {total}</div>
                            <div>Descargas únicas: {history.length}</div>
                            <div>Porcentaje: {porcentaje}%</div>
                          </div>
                          <div className="columna">
                            <strong>Descargaron:</strong>
                            {history.length ? (
                              history.map((h, i) => (
                                <div key={i}>
                                  ✔ {h.email} ({h.downloads} veces)
                                </div>
                              ))
                            ) : (
                              <div>No hay descargas</div>
                            )}
                          </div>
                          <div className="columna">
                            <strong>Pendientes:</strong>
                            {pendientes.length ? (
                              pendientes.map((r, i) => (
                                <div key={i}>• {r.email}</div>
                              ))
                            ) : (
                              <div>Todos descargaron</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>

      <div className="pagination">
        <span>Filas por página:</span>
        <select
          value={rowsPerPage}
          onChange={e => {
            setRowsPerPage(+e.target.value);
            setCurrentPage(1);
          }}
        >
          {[5, 10, 25].map(n => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
        <span>
          {start + 1}-{Math.min(start + rowsPerPage, datos.length)} de {datos.length}
        </span>
        <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>
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
          onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
