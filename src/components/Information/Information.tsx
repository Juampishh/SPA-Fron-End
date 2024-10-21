import React, { useState } from "react";
import { NavbarComponent } from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

// Componente Modal
const Modal: React.FC<{
  title: string;
  onClose: () => void;
  onSubmit: () => void;
}> = ({ title, onClose, onSubmit }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="p-4 rounded shadow-lg bg-AntiFlashWhite">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="mt-2">
        ¿Desea descargar el PDF de las ganancias totales del{" "}
        {title.toLowerCase()}?
      </p>
      <div className="flex justify-between mt-4 space-x-2">
        <button onClick={onClose} className="text-blue-500">
          Cerrar
        </button>
        <button onClick={onSubmit} className="text-blue-500">
          Aceptar
        </button>
      </div>
    </div>
  </div>
);

const Information: React.FC = () => {
  const [modalTitle, setModalTitle] = useState<string | null>(null);

  const handleItemClick = (title: string) => {
    setModalTitle(title);
  };

  const closeModal = () => {
    setModalTitle(null);
  };
  const handleSubmit = () => {
    let reportType = "";

    switch (modalTitle) {
      case "Informe Semanal":
        reportType = "week";
        break;
      case "Informe Mensual":
        reportType = "month";
        break;
      case "Informe Anual":
        reportType = "year";
        break;
      default:
        console.error("Tipo de informe desconocido");
        return;
    }

    fetch(`https://spa-api-psi.vercel.app/appointments/report`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        period: reportType,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${reportType}-report.pdf`); // Nombre del archivo
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
      })
      .catch((error) => {
        console.error("Error al descargar el informe:", error);
      });

    closeModal();
  };
  return (
    <div className="flex flex-col min-h-screen bg-AntiFlashWhite">
      <NavbarComponent />
      <div className="flex items-center justify-center flex-grow">
        <div className="max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow-lg">
          <div className="px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Solicitar Informes de Ganancias
            </h2>
            <div className="mt-4 space-y-2">
              <button
                className="flex items-center justify-center w-full p-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => handleItemClick("Informe Semanal")}
              >
                <span className="text-gray-600">Informe Semanal</span>
              </button>
              <button
                className="flex items-center justify-center w-full p-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => handleItemClick("Informe Mensual")}
              >
                <span className="text-gray-600">Informe Mensual</span>
              </button>
              <button
                className="flex items-center justify-center w-full p-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => handleItemClick("Informe Anual")}
              >
                <span className="text-gray-600">Informe Anual</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {modalTitle && (
        <Modal
          title={modalTitle}
          onClose={closeModal}
          onSubmit={handleSubmit}
        />
      )}
      <Footer />
    </div>
  );
};

export default Information;
