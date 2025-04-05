import { useEffect } from "react";
import Header from "../components/Header";
import Menuadm from "../components/Menuadm";


const EmailEditor = () => {
  useEffect(() => {
    const scriptId = "unlayer-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;  // Establecer ID único para el script
      script.src = "https://editor.unlayer.com/embed.js";
      script.async = true;
      
      
      script.onload = () => {
        if (window.unlayer) {
          unlayer.init({
            id: "editor-container",
            displayMode: "email",
            projectId: 1234, // opcional: tu projectId si estás registrado
          });
        } else {
          console.error("No se pudo cargar Unlayer.");
        }
      };
      
      document.body.appendChild(script);
    } else {
      console.log("El script de Unlayer ya está cargado.");
    }
  }, []);  // Dependencia vacía asegura que solo se ejecute una vez al montar el componente

  return (
    <>
    <Header/>
    <Menuadm/>
    <div className="container">
      {/* Sección del Formulario de Eventos */}
      <div className="form-container">
        <h2>Crear Evento</h2>
        <div className="grid">
          <div className="full-width">
            <label>Nombre</label>
            <input type="text" placeholder="Evento 1" />
          </div>

          <div className="full-width">
            <label>Descripción</label>
            <textarea placeholder="Descripción 1"></textarea>
          </div>

          <div>
            <label>Evento o categoría</label>
            <input type="text" placeholder="categ 1" />
          </div>

          <div>
            <label>Link descarga</label>
            <input type="text" placeholder="link 1" />
          </div>

          <div className="full-width">
            <label>Encabezado página de descarga</label>
            <input type="text" placeholder="Descargue su cartón" />
          </div>

          <div className="full-width">
            <label>Bajada página de descarga</label>
            <input type="text" placeholder="Utiliza tu email" />
          </div>

          {/* Selección de formato */}
          <div className="full-width">
            <label>Formato del documento</label>
            <div className="radio-group">
              <label>
                <input type="radio" name="format" />
                Vertical / Retrato
              </label>
              <label>
                <input type="radio" name="format" defaultChecked />
                Horizontal / Paisaje
              </label>
            </div>
          </div>

          {/* Upload de imágenes y archivos */}
          <div className="full-width dropzone">
            <label>Imagen para usar como banner</label>
            <div>Arrastre alguna imagen para subir o haga clic para seleccionarla.</div>
          </div>

          <div className="full-width dropzone">
            <label>Archivo de datos</label>
            <div>Arrastre un archivo para subir o haga clic para seleccionarlo.</div>
          </div>

          {/* Mostrar información de contacto */}
          <div className="full-width">
            <label>Mostrar información de contacto en página de descarga</label>
            <div className="radio-group">
              <label>
                <input type="radio" name="contactInfo" defaultChecked />
                Sí, mostrar información
              </label>
              <label>
                <input type="radio" name="contactInfo" />
                No, no mostrar información
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Sección del Editor de Emails */}
      <div className="editor-container">
        <h2>Diseño de Plantilla</h2>
        <p>Para que aparezcan los datos a reemplazar, rodea el nombre de la columna entre <br></br>Por ejemplo, si tu archivo de datos incluye las columnas email y nombre:</p>
        <div id="editor-container"></div>
        <button type="submit" className="boton-guardar-diseño">📂 Guardar Diseño</button>
        <button type="submit" className="boton-recargar-diseño">📰 Recargar Diseño</button>
        <button type="submit" className="boton-descargar-diseño">📥 Descargar Diseño</button>
        <button type="submit" className="boton-eliminar-diseño">🗑️ Eliminar</button>
      </div>
    </div>
    </>
  );
};

export default EmailEditor;
