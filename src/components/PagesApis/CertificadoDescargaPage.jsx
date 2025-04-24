import { useState } from "react";
import { useParams } from "react-router-dom";

export default function CertificadoDescargaPage() {
  const { evento } = useParams();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [certUrl, setCertUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const bannerUrl = `/Pixel_Code/eventos/${evento}/banner.jpg`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCopied(false);

    if (!email) {
      setError("Por favor ingresa un correo.");
      return;
    }

    const url = `http://localhost:3000/api/v1/certificados/${encodeURIComponent(evento)}?email=${encodeURIComponent(email)}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Certificado no encontrado");
      setCertUrl(url);
      setError("");
    } catch (err) {
      setCertUrl("");
      setError("No se encontró ningún certificado para este email.");
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(certUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("No se pudo copiar el enlace.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div className="bg-white shadow-md rounded-2xl p-8 max-w-md w-full">
        <img
          src={bannerUrl}
          alt={`Banner del evento ${evento}`}
          className="rounded-xl mb-6 max-h-60 object-cover w-full"
        />

        <h1 className="text-2xl font-bold mb-4 text-center">
          Descarga tu certificado
        </h1>
        <p className="mb-4 text-center text-gray-600">
          Ingresa tu correo electrónico para obtener tu certificado del evento:{" "}
          <strong>{evento}</strong>
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
