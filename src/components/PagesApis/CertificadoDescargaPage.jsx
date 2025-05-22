import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import Swal from "sweetalert2";

export default function CertificadoDescargaPage() {
    const {evento} = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [certUrl, setCertUrl] = useState("");
    const [copied, setCopied] = useState(false);
    const [banner, setbanner] = useState("");
    const [NombreEvento, setNombreE] = useState("");
    const [emailsUsuario, setEmailsUsuario] = useState([]);
    const [initialData, setInitialData] = useState(null);
    const [mensajeEncontrado, setMensajeEncontrado] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const url = `https://pixel-code-back-891804194195.southamerica-west1.run.app/api/v1/documents/${evento}`;
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("No se pudieron cargar los datos iniciales");
                }
                const respuesta = await response.json();
                const data = respuesta.data.docRef;
                setInitialData(data);
                setbanner(data.bannerUrl);
                setNombreE(data.description);

                if (data.rows && Array.isArray(data.rows)) {
                    const extractedEmails = data.rows.map((row) => row.email);
                    setEmailsUsuario(extractedEmails);
                } else {
                    setEmailsUsuario([]);
                }
            } catch (err) {
                console.error("Error al obtener datos iniciales:", err);
                setError("No se pudieron cargar los datos iniciales.");
            }
        };

        fetchData();
    }, [evento]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setCopied(false);
        setMensajeEncontrado("");

        if (!email) {
            setError("Por favor ingresa un correo.");
            return;
        }

        if (!emailsUsuario.includes(email)) {
            setError("Correo electrónico no encontrado en la lista de participantes.");
            setCertUrl("");
            return;
        } else {
            setMensajeEncontrado("Correo electrónico encontrado. Puede continuar.");
        }

        // Llamada a la API para obtener el certificado con esta url: https://pixel-code-back-891804194195.southamerica-west1.run.app/api/v1/documents/get-certificado con un body que tiene el id del evento y el email
        const body = {
            idEvento: evento,
            email: email,
        }

        const url = `https://pixel-code-back-891804194195.southamerica-west1.run.app/api/v1/documents/get-certificado`;
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            const data = await response.json();
            if (data.success) {
                // base64 a blob y que se descargue el archivo
                const base64Data = data.data;
                const byteCharacters = atob(base64Data);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray], {type: "application/pdf"});
                const url = window.URL.createObjectURL(blob);

                // window.open(url, "_blank");
                const link = document.createElement("a");
                link.href = url;
                link.download = `certificado-${evento}-${email}.pdf`;
                link.click();


            } else {
                await Swal.fire({
                    icon: "error",
                    title: data.error,
                    text: data.details,
                    confirmButtonText: "Aceptar",
                })
            }
        } catch (err) {
            await Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se encontró el certificado. Por favor verifica el correo electrónico.",
                footer: err.message,
                confirmButtonText: "Aceptar",
            })
        }
        setIsLoading(false);
    }

    const handleCopy = async () => {
        if (!certUrl) return;
        try {
            await navigator.clipboard.writeText(certUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("No se pudo copiar el enlace:", err);
        }
    };

    return (
        <>
            <div className="cert-page">
                <div className="cert-container">
                    <img src={banner} alt={`Banner del evento ${evento}`} className="cert-banner"/>

                    <h1 className="cert-title">Descargue su certificado</h1>
                    <p className="cert-subtitle">
                        Ingresando con el email que se registró para el evento: <strong>{NombreEvento}</strong>
                    </p>

                    <form onSubmit={handleSubmit}>
                        <label className="cert-label">* Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="cert-input"
                            placeholder="correo@ejemplo.com"
                            required
                        />
                        <button
                            type="submit"
                            className="cert-button"
                            disabled={isLoading}
                            style={{ opacity: isLoading ? 0.5 : 1, pointerEvents: isLoading ? 'none' : 'auto' }}
                        >
                            {isLoading ? 'Generando certificado...' : 'Preparar Documentos'}
                        </button>
                    </form>

                    {error && <p className="cert-msg cert-error">{error}</p>}
                    {mensajeEncontrado && <p className="cert-msg cert-success">{mensajeEncontrado}</p>}

                    {certUrl && (
                        <div style={{marginTop: "1.5rem"}}>
                            <a href={certUrl} download className="cert-button" style={{backgroundColor: "#2e7d32"}}>
                                Descargar certificado
                            </a>
                            <div style={{marginTop: "0.5rem"}}>
                                <button
                                    onClick={handleCopy}
                                    className="cert-msg"
                                    style={{
                                        color: "#174fa6",
                                        textDecoration: "underline",
                                        background: "none",
                                        border: "none",
                                        cursor: "pointer",
                                    }}
                                >
                                    {copied ? "¡Enlace copiado!" : "Copiar enlace para compartir"}
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="cert-footer">
                        &lt;PixelCode&gt;<br/>
                        Diseño, publicidad y desarrollo de soluciones tecnológicas
                    </div>
                </div>
            </div>
        </>
    );
}
