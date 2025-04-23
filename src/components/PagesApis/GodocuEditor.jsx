import React, { useState, useEffect } from "react";
import HeaderPanel from "../HeaderPanel";
import Menuadm from "../Menuadm";

const GodocuEditor = () => {
  const [bannerImage, setBannerImage] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [dataFile, setDataFile] = useState(null);
  const [nombreEvento, setNombreEvento] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [currentDesign, setCurrentDesign] = useState(null);

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
    }
  }, []);

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setBannerPreview(reader.result);
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

  const handleGuardarJson = async () => {
    if (!dataFile) {
      alert("⚠️ Debes seleccionar un archivo Excel primero.");
      return;
    }

    window.unlayer.exportHtml(async (data) => {
      const design = data.design;
      setCurrentDesign(design);

      try {
        const resJson = await fetch("http://localhost:3000/api/v1/editor/guardar-json", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            design,
            nombreEvento: nombreEvento.trim() || "sin_nombre",
          }),
        });
        const json = await resJson.json();
        setDownloadUrl(json.url);
        alert("✅ Diseño guardado como JSON");

        const reader = new FileReader();
        reader.onload = async () => {
          const excelBase64 = reader.result.split(",")[1];

          const resCert = await fetch("http://localhost:3000/api/v1/editor/generar-certificados", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              nombreEvento: nombreEvento.trim() || "sin_nombre",
              excelBase64,
              nombreArchivo: dataFile.name,
            }),
          });

          const certResult = await resCert.json();
          if (resCert.ok) {
            alert("🎉 Certificados generados exitosamente.");
            console.log("Ruta base de certificados:", certResult.rutaBase);
          } else {
            console.error(certResult.error);
            alert("❌ Error generando certificados");
          }
        };

        reader.readAsDataURL(dataFile);
      } catch (err) {
        console.error("Error general:", err);
        alert("❌ Error guardando el evento");
      }
    });
  };

  const handleRecargarDiseno = () => {
    if (currentDesign) {
      window.unlayer.loadDesign(currentDesign);
    } else {
      alert("⚠️ Aún no hay diseño cargado para recargar.");
    }
  };

  return (
    <>
      <HeaderPanel />
      <Menuadm />
      <div className="container">
        <div className="form-container">
          <h2>Crear Evento</h2>
          <div className="grid">
            <div className="full-width">
              <label>Nombre</label>
              <input
                type="text"
                placeholder="Evento 1"
                value={nombreEvento}
                onChange={(e) => setNombreEvento(e.target.value)}
              />
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

        <div className="editor-container">
          <h2>Diseño de Plantilla</h2>
          <p>
            Para que aparezcan los datos a reemplazar, rodea el nombre de la columna entre
            <br />
            Por ejemplo, si tu archivo de datos incluye las columnas <code>email</code> y <code>nombre</code>:
          </p>
          <div
            id="editor-container"
            style={{ minHeight: "500px", border: "1px solid #ccc" }}
          ></div>
          <button
            type="button"
            className="boton-guardar-diseño"
            onClick={handleGuardarJson}
          >
            📂 Guardar evento
          </button>

          <button
            type="button"
            className="boton-recargar-diseño"
            onClick={handleRecargarDiseno}
            style={{ marginLeft: "10px" }}
          >
            🔄 Recargar diseño
          </button>

          {downloadUrl && (
            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="boton-descargar-json"
              style={{ display: "inline-block", marginTop: "10px" }}
            >
              📥 Descargar Diseño JSON
            </a>
          )}
        </div>
      </div>
    </>
  );
};

export default GodocuEditor;
