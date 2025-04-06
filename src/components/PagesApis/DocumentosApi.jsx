import React, { useEffect, useState } from 'react';
import axios from 'axios';
function DocumentosApi() {

  // Definimos el estado para almacenar los datos de la API Propio de React
const [datos, setDatos] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);


const fetchMessages = async () => {
  try {
    //Solicitud GET a la API
    const response = await axios.get('http://localhost:3000/api/v1/documents');
    if (response.data && response.data.success) {
      setDatos(response.data.data); // Se Almacena los datos en el estado
    }
    setLoading(false);
  } catch (err) {
    setError('Error al obtener los datos');
    setLoading(false);
  }
};

// useEffect para llamar la API cuando el componente se monta
useEffect(() => {
  fetchMessages();
}, []);

if (loading) {
  return <div>Cargando...</div>;
}

if (error) {
  return <div>{error}</div>;
}

return (
    <>

      <div className='contenedorcontacto'>
        
        <table className='contenedorcontacto-table'>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Cliente</th>
                    <th>Funcionario Creador</th>
                    <th>Fecha Creación</th>
                </tr>
            </thead>

            <tbody>
                {datos.map((datos, index) => (
                <tr key={index}>
                    <td>{datos.name}</td>
                    <td>{datos.description}</td>
                    <td>**Faltan los datos**</td>
                    <td>**Faltan los datos**</td>
                    {/* <td>{datos.createdAt}</td> */}
                </tr>
                ))}
            </tbody>
        </table>

      </div>

    </>

);
}

export default DocumentosApi
