import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HeaderPanel from "../HeaderPanel";
import Menuadm from "../Menuadm";
import Swal from 'sweetalert2';

const GodocuEditorEdit = () => {
    const { eventId } = useParams();

    const [bannerImage, setBannerImage] = useState(null);
    const [bannerPreview, setBannerPreview] = useState(null);
    const [dataFile, setDataFile] = useState(null);
    const [nombreEvento, setNombreEvento] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [categoria, setCategoria] = useState("");
    const [downloadUrl, setDownloadUrl] = useState("");
    const [encabezado, setEncabezado] = useState("");
    const [formato, setFormato] = useState("horizontal");
    const [mostrarContacto, setMostrarContacto] = useState(true);
    const [currentDesign, setCurrentDesign] = useState(null);
    const [html, setHtml] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const scriptId = "unlayer-script";
        if (!document.getElementById(scriptId)) {
            const script = document.createElement("script");
            script.id = scriptId;
            script.src = "https://editor.unlayer.com/embed.js";
            script.async = true;
            script.onload = () => {
                if (window.unlayer) initEditor();
            };
            document.body.appendChild(script);
        } else {
            initEditor();
        }
        fetch(`http://localhost:3000/api/v1/documents/${eventId}`)
            .then(res => res.json())
            .then(({ data }) => {
                const doc = data.docRef;

                setNombreEvento(doc.name);
                setDescripcion(doc.description || "");
                setCategoria(doc.linkSlug || "");
                setDownloadUrl(doc.url || "");
                setEncabezado(doc.downloadHeader || "");
                setFormato(doc.pageFormat === "landscape" ? "horizontal" : "vertical");
                setMostrarContacto(doc.showContactInfo);
                setCurrentDesign(doc.design);
                setHtml(doc.template || ""); // En caso de que tengas un campo template por separado
                setBannerPreview(doc.bannerUrl);

                if (window.unlayer && doc.design) {
                    window.unlayer.loadDesign(JSON.parse(doc.design));
                }
            })
            .catch(err => console.error("Error al cargar datos del evento:", err));
    }, [eventId]);

    const initEditor = () => {
        window.unlayer.init({
            id: "editor-container",
            displayMode: "email",
            projectId: 1234,
        });
    };

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
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (!nombreEvento.trim()) {
            await Swal.fire({
                icon: "warning",
                title: "⚠️ Nombre de evento requerido",
                text: "Por favor, ingresa un nombre para el evento.",
            });
            setIsLoading(false);
            return;
        }

        window.unlayer.exportHtml(async (data) => {
            const formData = new FormData();
            const userData = JSON.parse(localStorage.getItem("user"));

            formData.append("uid", eventId); // Incluimos el uid (eventId)
            formData.append("name", nombreEvento);
            formData.append("description", descripcion);
            formData.append("category", categoria);
            formData.append("downloadLink", downloadUrl);
            formData.append("header", encabezado);
            formData.append("documentFormat", formato);
            formData.append("showContactInfo", mostrarContacto);
            formData.append("template", data.html);
            formData.append("design", JSON.stringify(data.design));
            formData.append("createdBy", userData ? userData.uid : "");
            if (bannerImage) formData.append("bannerImg", bannerImage);
            if (dataFile) formData.append("xlsxFile", dataFile);

            try {
                const response = await fetch(`http://localhost:3000/api/v1/documents/${eventId}`, {
                    method: "POST", // O "PUT" si tu API lo requiere
                    body: formData,
                });
                const result = await response.json();
                console.log("Respuesta del servidor:", result); // Para depuración

                if (result.success) {
                    await Swal.fire({
                        icon: "success",
                        title: "Evento actualizado",
                        text: "Los datos se han actualizado correctamente.",
                    });
                } else {
                    await Swal.fire({
                        icon: "error",
                        title: "Error al actualizar",
                        text: result.details,
                    });
                }
            } catch (error) {
                console.error("Error de red:", error);
                alert("Error de red al actualizar el evento.");
            } finally {
                setIsLoading(false);
            }
        });
    };

    return (
        <>
            <HeaderPanel />
            <Menuadm />

            <div className="container">
                <div className="form-container">
                    <h2>Editar Evento</h2>
                    <div className="grid">
                        <div className="full-width">
                            <label>Nombre</label>
                            <input type="text" value={nombreEvento} onChange={(e) => setNombreEvento(e.target.value)} />
                        </div>

                        <div className="full-width">
                            <label>Descripción</label>
                            <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)}></textarea>
                        </div>

                        <div>
                            <label>Evento o categoría</label>
                            <input type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)} />
                        </div>

                        <div>
                            <label>Link descarga</label>
                            <input type="text" value={downloadUrl} onChange={(e) => setDownloadUrl(e.target.value)} />
                        </div>

                        <div className="full-width">
                            <label>Encabezado página de descarga</label>
                            <input type="text" value={encabezado} onChange={(e) => setEncabezado(e.target.value)} />
                        </div>

                        <div className="full-width">
                            <label>Formato del documento</label>
                            <div className="radio-group">
                                <label>
                                    <input
                                        type="radio"
                                        name="format"
                                        value="vertical"
                                        checked={formato === "vertical"}
                                        onChange={() => setFormato("vertical")}
                                    />
                                    Vertical / Retrato
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="format"
                                        value="horizontal"
                                        checked={formato === "horizontal"}
                                        onChange={() => setFormato("horizontal")}
                                    />
                                    Horizontal / Paisaje
                                </label>
                            </div>
                        </div>

                        <div className="full-width dropzone">
                            <label>Imagen del banner</label>
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
                                    <input
                                        type="radio"
                                        name="contactInfo"
                                        checked={mostrarContacto === true}
                                        onChange={() => setMostrarContacto(true)}
                                    />
                                    Sí, mostrar información
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="contactInfo"
                                        checked={mostrarContacto === false}
                                        onChange={() => setMostrarContacto(false)}
                                    />
                                    No, no mostrar información
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="editor-container">
                    <h2>Diseño de Plantilla</h2>
                    <div id="editor-container" style={{ minHeight: "500px", border: "1px solid #ccc" }}></div>

                    <button
                        type="button"
                        className="boton-guardar-diseño"
                        onClick={handleUpdate}
                        disabled={isLoading}
                    >
                        {isLoading ? "⏳ Guardando..." : "💾 Actualizar evento"}
                    </button>
                </div>
            </div>
        </>
    );
};

export default GodocuEditorEdit;