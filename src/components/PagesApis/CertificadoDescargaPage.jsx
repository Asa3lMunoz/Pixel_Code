import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function CertificadoDescargaPage() {
    const { evento } = useParams();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [certUrl, setCertUrl] = useState("");
    const [copied, setCopied] = useState(false);
    const [banner, setbanner] = useState("");
    const [NombreEvento, setNombreE] = useState("");
    const [emailsUsuario, setEmailsUsuario] = useState([]); // Estado para guardar los emails de la API
    const [initialData, setInitialData] = useState(null);
    const [mensajeEncontrado, setMensajeEncontrado] = useState(""); // Nuevo estado para el mensaje

    useEffect(() => {
        const fetchData = async () => {
            const url = `http://localhost:3000/api/v1/documents/${evento}`;
           
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    console.error("Error al obtener datos iniciales:", response);
                    throw new Error("No se pudieron cargar los datos iniciales");
                }
                const respuesta = await response.json();
                const data = respuesta.data.docRef;

                
                setInitialData(data);
                setbanner(data.bannerUrl);
                setNombreE(data.description);

                // Extraer los correos electrónicos del array data.rows
                if (data.rows && Array.isArray(data.rows)) {
                    const extractedEmails = data.rows.map(row => row.email);
                    setEmailsUsuario(extractedEmails);

                } else {
                    console.warn("data.rows no es un array o está vacío", data);
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
        setCopied(false);
        setMensajeEncontrado(""); // Limpiar mensaje anterior

        if (!email) {
            setError("Por favor ingresa un correo.");
            return;
        }

        // Verificar si el email ingresado está en la lista de emailsUsuario
        if (!emailsUsuario.includes(email)) {
            setError("Correo electrónico no encontrado en la lista de participantes.");
            setCertUrl("");
            return;
        } else {
            setMensajeEncontrado("Correo electrónico encontrado.  Puede continuar."); // Establecer el mensaje
        }

        const url = `http://localhost:3000/api/v1/documents/${evento}`;
        

        try {
            console.log("Intentando fetch en handleSubmit con URL:", url);
            const response = await fetch(url);
            if (!response.ok) {
                console.error("Error en la respuesta:", response);
                throw new Error("Certificado no encontrado");
            }
            const data = await response.json();
            
            setCertUrl(data.url);
            setError("");
        } catch (err) {
            console.error("Error al obtener el certificado:", err);
            setCertUrl("");
            setError("No se encontró ningún certificado para este email.");
        }
    };

    const handleCopy = async () => {
        if (!certUrl) {
            console.warn("No hay URL para copiar.");
            return;
        }
        try {
            await navigator.clipboard.writeText(certUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("No se pudo copiar el enlace:", err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
            <div className="bg-white shadow-md rounded-2xl p-8 max-w-md w-full">
                <img
                    src={banner}
                    alt={`Banner del evento ${evento}`}
                    className="rounded-xl mb-6 max-h-60 object-cover w-full"
                />

                <h1 className="text-2xl font-bold mb-4 text-center">
                    Descarga tu certificado
                </h1>
                <p className="mb-4 text-center text-gray-600">
                    Ingresa tu correo electrónico para obtener tu certificado del evento:{" "}
                    <strong>{NombreEvento}</strong>
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="correo@ejemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
                    >
                        Buscar certificado
                    </button>
                </form>

                {error && (
                    <p className="text-red-500 text-center mt-4 font-medium">{error}</p>
                )}
                {mensajeEncontrado && (
                    <p className="text-green-600 text-center mt-4 font-medium">{mensajeEncontrado}</p>
                )}

                {certUrl && (
                    <div className="mt-6 text-center space-y-4">
                        <a
                            href={certUrl}
                            download
                            className="block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                        >
                            Descargar certificado
                        </a>
                        <button
                            onClick={handleCopy}
                            className="text-sm text-blue-600 underline hover:text-blue-800"
                        >
                            {copied ? "¡Enlace copiado!" : "Copiar enlace para compartir"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

