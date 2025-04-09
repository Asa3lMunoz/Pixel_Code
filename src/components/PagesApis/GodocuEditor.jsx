import React, { useState, useEffect } from "react";
import Header from "../Header";
import Menuadm from "../Menuadm";

const EmailEditor = () => {
  const [bannerImage, setBannerImage] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [dataFile, setDataFile] = useState(null);

  useEffect(() => {
    const scriptId = "unlayer-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://editor.unlayer.com/embed.js";
      script.async = true;

      script.onload = () => {
        if (window.unlayer) {
          unlayer.init({
            id: "editor-container",
            displayMode: "email",
            projectId: 1234,
          });
        } else {
          console.error("No se pudo cargar Unlayer.");
        }
      };

      document.body.appendChild(script);
    } else {
      console.log("El script de Unlayer ya está cargado.");
    }
  }, []);

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDataFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDataFile(file);
      console.log("Archivo de datos seleccionado:", file);
    }
  };

  return (
    <>
      <Header />
      <Menuadm />
      <div className="container">
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

            {/* Subida de imagen */}
            <div className="full-width dropzone">
              <label>Imagen para usar como banner</label>
              <input type="file" accept="image/*" onChange={handleBannerChange} />
              {bannerPreview && (
                <img
                  src={bannerPreview}
                  alt="Vista previa del banner"
                  className="preview-image"
                  style={{ marginTop: "10px", maxWidth: "100%", height: "auto" }}
                />
              )}
            </div>

            {/* Subida de archivo de datos */}
            <div className="full-width dropzone">
              <label>Archivo de datos</label>
              <input
                type="file"
                accept=".csv, .xlsx, .xls, .txt"
                onChange={handleDataFileChange}
              />
              {dataFile && (
                <p style={{ marginTop: "10px" }}>
                  Archivo seleccionado: <strong>{dataFile.name}</strong>
                </p>
              )}
            </div>

            {/* Mostrar info de contacto */}
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

        {/* Editor Unlayer */}
        <div className="editor-container">
          <h2>Diseño de Plantilla</h2>
          <p>
            Para que aparezcan los datos a reemplazar, rodea el nombre de la columna entre
            <br />
            Por ejemplo, si tu archivo de datos incluye las columnas <code>email</code> y <code>nombre</code>:
          </p>
          <div id="editor-container" style={{ minHeight: "500px", border: "1px solid #ccc" }}></div>
          <button type="submit" className="boton-guardar-diseño">📂 Guardar Diseño</button>
          <button type="submit" className="boton-recargar-diseño">📰 Recargar Diseño</button>
          <button type="submit" className="boton-eliminar-diseño">🗑️ Eliminar</button>
        </div>
      </div>
    </>
  );
};

export default EmailEditor;
