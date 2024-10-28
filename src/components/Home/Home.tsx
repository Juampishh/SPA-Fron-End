import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaBars,
  FaArrowLeft,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useUsuario } from "../../Context/usuarioContex";
import { useNavigate } from "react-router-dom";
import { useAppointments } from "../../Hooks/Appointments";
import toast from "react-hot-toast";

const appItems = [
  { name: "Ruta Falsa 1", path: "/fake-route-1" },
  { name: "Ruta Falsa 2", path: "/fake-route-2" },
  { name: "Ruta Falsa 3", path: "/fake-route-3" },
];

const navigationItems = [
  { name: "Inicio", path: "/" },
  { name: "Perfil", path: "/edit-profile" },
  { name: "Servicios", path: "/services" },
  { name: "Sobre nosotros", path: "/about-us" },
  { name: "Contacto", path: "/contact" },
  { name: "Noticias", path: "/notices" },
  { name: "Opiniones", path: "/opinions" },
];

const Home: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedService, setSelectedService] = useState("masajes");
  const { usuario } = useUsuario();
  const navigate = useNavigate();
  const { appointments, fetchAppointmentsData, loading } = useAppointments();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    fetchAppointmentsData();
  }, [fetchAppointmentsData]);

  console.log(appointments);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleButtonClick = (reportType: string) => {
    console.log(
      `Botón clickeado: ${reportType}, Servicio seleccionado: ${selectedService}`
    );
    switch (reportType) {
      case "Reporte Semanal":
        reportType = "week";
        break;
      case "Reporte Mensual":
        reportType = "month";
        break;
      case "Reporte Anual":
        reportType = "year";
        break;
      default:
        console.error("Tipo de informe desconocido");
        return;
    }
    let userType;
    switch (selectedService) {
      case "masajes":
        userType = "masseuse";
        break;
      case "faciales":
        userType = "beautician";
        break;
    }

    fetch(`https://spa-api-psi.vercel.app/appointments/report`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        period: reportType,
        userType: userType,
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
        link.setAttribute("download", `${reportType}-report.pdf`);
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
      })
      .catch((error) => {
        console.error("Error al descargar el informe:", error);
      });
  };

  const fetchIncomeReport = async () => {
    fetch("https://spa-api-psi.vercel.app/appointments/financial-report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startDate,
        endDate,
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
        link.setAttribute("download", `financial-report.pdf`);
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
      })
      .catch((error) => {
        console.error("Error al descargar el informe financiero:", error);
      });
  };

  const headerText =
    usuario.type !== "admin" && usuario.type !== "secretariat"
      ? "Clientes a atender"
      : "Clientes";

  const renderRole = () => {
    switch (usuario.type) {
      case "admin":
        return "Administrador";
      case "secretariat":
        return "Secretaria";
      case "masseuse":
        return "Masajista";
      case "beautician":
        return "Esteticista";
    }
  };

  const [currentPageToAttend, setCurrentPageToAttend] = useState(1);
  const [currentPageAttended, setCurrentPageAttended] = useState(1);
  const itemsPerPage = 6;

  const handlePageChangeToAttend = (newPage: number) => {
    const maxPage = Math.ceil(
      appointments.filter((appointment) => appointment.status === "pending")
        .length / itemsPerPage
    );
    if (newPage > 0 && newPage <= maxPage) {
      setCurrentPageToAttend(newPage);
    }
  };

  const handlePageChangeAttended = (newPage: number) => {
    const maxPage = Math.ceil(
      appointments.filter((appointment) => appointment.status === "completed")
        .length / itemsPerPage
    );
    if (newPage > 0 && newPage <= maxPage) {
      setCurrentPageAttended(newPage);
    }
  };

  const indexOfLastItemToAttend = currentPageToAttend * itemsPerPage;
  const indexOfFirstItemToAttend = indexOfLastItemToAttend - itemsPerPage;
  const currentClientsToAttend = appointments
    .filter((appointment) => appointment.status === "pending")
    .slice(indexOfFirstItemToAttend, indexOfLastItemToAttend);

  const indexOfLastItemAttended = currentPageAttended * itemsPerPage;
  const indexOfFirstItemAttended = indexOfLastItemAttended - itemsPerPage;
  const currentClientsAttended = appointments
    .filter((appointment) => appointment.status === "completed")
    .slice(indexOfFirstItemAttended, indexOfLastItemAttended);

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const Logout = () => {
    localStorage.removeItem("usuario");
    navigate("/");
    toast.success("Sesión cerrada");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="flex h-screen">
      <motion.div
        className={`bg-gray-800 text-white p-5 fixed h-full ${
          isSidebarOpen ? "w-64" : "w-16"
        }`}
        initial={{ width: 0 }}
        animate={{ width: isSidebarOpen ? "16rem" : "4rem" }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <button
          onClick={toggleSidebar}
          className="mb-4 text-white focus:outline-none"
        >
          {isSidebarOpen ? <FaArrowLeft size={20} /> : <FaBars size={20} />}
        </button>
        {isSidebarOpen && (
          <>
            <h2 className="mb-4 text-2xl font-bold">Sentirse Bien</h2>
            <hr className="my-4 border-t-2 border-gray-300" />

            <h3 className="mb-2 text-xl font-semibold">Pagina Web:</h3>
            <ul>
              {navigationItems.map((item, index) => (
                <li
                  key={index}
                  className="p-2 mb-2 rounded cursor-pointer hover:bg-gray-700 hover:text-white"
                  onClick={() => navigate(item.path)}
                >
                  {item.name}
                </li>
              ))}
            </ul>
            <hr className="my-4 border-t-2 border-gray-300" />
            <button
              onClick={Logout}
              className="w-full px-4 py-2 mt-4 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none"
            >
              Cerrar Sesión
            </button>
          </>
        )}
      </motion.div>

      <motion.div
        className={`flex-1 p-10 ${isSidebarOpen ? "ml-64" : "ml-16"}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-gray-800">
            Bienvenido, {usuario.firstName + " " + usuario.lastName}
          </h1>
          <p className="text-xl text-gray-600">
            Rol: <span className="font-semibold">{renderRole()}</span>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div>
            <h3 className="mb-2 text-2xl font-semibold">
              {headerText} con pago pendiente
            </h3>
            <motion.table
              className="min-w-full bg-white rounded-lg shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <thead>
                <tr>
                  <th className="px-4 py-2 text-sm font-semibold text-left text-gray-600 bg-gray-100 border-b-2 border-gray-200">
                    Cliente
                  </th>
                  <th className="px-4 py-2 text-sm font-semibold text-left text-gray-600 bg-gray-100 border-b-2 border-gray-200">
                    Servicio
                  </th>
                  <th className="px-4 py-2 text-sm font-semibold text-left text-gray-600 bg-gray-100 border-b-2 border-gray-200">
                    Fecha
                  </th>
                  <th className="px-4 py-2 text-sm font-semibold text-left text-gray-600 bg-gray-100 border-b-2 border-gray-200">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentClientsToAttend.length > 0 ? (
                  currentClientsToAttend.map((appointment, index) => (
                    <motion.tr
                      key={index}
                      className="hover:bg-gray-100"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <td className="px-4 py-2 text-sm border-b border-gray-200">
                        {appointment.firstName + " " + appointment.lastName}
                      </td>
                      <td className="px-4 py-2 text-sm border-b border-gray-200">
                        {appointment.service_name}
                      </td>
                      <td className="px-4 py-2 text-sm border-b border-gray-200">
                        {formatDateTime(appointment.appointment_date)}
                      </td>
                      <td className="px-4 py-2 text-sm border-b border-gray-200">
                        {appointment.status === "pending"
                          ? "Pendiente"
                          : "Pagado"}
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-2 text-sm text-center text-gray-600"
                    >
                      No hay información disponible
                    </td>
                  </tr>
                )}
              </tbody>
            </motion.table>
            <div className="flex items-center justify-between mt-4">
              {currentPageToAttend > 1 && (
                <button
                  onClick={() =>
                    handlePageChangeToAttend(currentPageToAttend - 1)
                  }
                  className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none"
                >
                  <FaChevronLeft />
                </button>
              )}
              <span className="text-sm text-gray-600">
                Página {currentPageToAttend}
              </span>
              {indexOfLastItemToAttend <
                appointments.filter(
                  (appointment) => appointment.status === "pending"
                ).length && (
                <button
                  onClick={() =>
                    handlePageChangeToAttend(currentPageToAttend + 1)
                  }
                  className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none"
                >
                  <FaChevronRight />
                </button>
              )}
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-2xl font-semibold">
              {headerText} con pago realizado:
            </h3>
            <motion.table
              className="min-w-full bg-white rounded-lg shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <thead>
                <tr>
                  <th className="px-4 py-2 text-sm font-semibold text-left text-gray-600 bg-gray-100 border-b-2 border-gray-200">
                    Cliente
                  </th>
                  <th className="px-4 py-2 text-sm font-semibold text-left text-gray-600 bg-gray-100 border-b-2 border-gray-200">
                    Servicio
                  </th>
                  <th className="px-4 py-2 text-sm font-semibold text-left text-gray-600 bg-gray-100 border-b-2 border-gray-200">
                    Fecha
                  </th>
                  <th className="px-4 py-2 text-sm font-semibold text-left text-gray-600 bg-gray-100 border-b-2 border-gray-200">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentClientsAttended.length > 0 ? (
                  currentClientsAttended.map((appointment, index) => (
                    <motion.tr
                      key={index}
                      className="hover:bg-gray-100"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <td className="px-4 py-2 text-sm border-b border-gray-200">
                        {appointment.firstName + " " + appointment.lastName}
                      </td>
                      <td className="px-4 py-2 text-sm border-b border-gray-200">
                        {appointment.service_name}
                      </td>
                      <td className="px-4 py-2 text-sm border-b border-gray-200">
                        {formatDateTime(appointment.appointment_date)}
                      </td>
                      <td className="px-4 py-2 text-sm border-b border-gray-200">
                        {appointment.status === "pending"
                          ? "Pendiente"
                          : "Pagado"}
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-2 text-sm text-center text-gray-600"
                    >
                      No hay información disponible
                    </td>
                  </tr>
                )}
              </tbody>
            </motion.table>
            <div className="flex items-center justify-between mt-4">
              {currentPageAttended > 1 && (
                <button
                  onClick={() =>
                    handlePageChangeAttended(currentPageAttended - 1)
                  }
                  className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none"
                >
                  <FaChevronLeft />
                </button>
              )}
              <span className="text-sm text-gray-600">
                Página {currentPageAttended}
              </span>
              {indexOfLastItemAttended <
                appointments.filter(
                  (appointment) => appointment.status === "completed"
                ).length && (
                <button
                  onClick={() =>
                    handlePageChangeAttended(currentPageAttended + 1)
                  }
                  className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none"
                >
                  <FaChevronRight />
                </button>
              )}
            </div>
          </div>
        </div>

        <hr className="my-8 border-t-2 border-gray-300" />

        {(usuario.type === "masseuse" || usuario.type === "beautician") && (
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h3 className="mb-4 text-2xl font-semibold">
              Opciones de{" "}
              {usuario.type === "masseuse" ? "Masajista" : "Esteticista"}
            </h3>
            <div className="mt-4">
              <label
                htmlFor="serviceSelect"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Seleccionar servicio para generar listado:
              </label>
              <select
                id="serviceSelect"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="block w-1/2 px-2 py-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                {usuario.type === "masseuse" && (
                  <option value="masajes">Tratamientos Corporales</option>
                )}
                {usuario.type === "beautician" && (
                  <option value="faciales">Tratamientos Faciales</option>
                )}
              </select>
            </div>
          </div>
        )}

        {usuario.type === "admin" && (
          <>
            <div className="p-6 mt-8 bg-gray-100 rounded-lg shadow-md">
              <h3 className="mb-4 text-2xl font-semibold">
                Opciones de administrador
              </h3>
              <div className="mt-4">
                <label
                  htmlFor="serviceSelect"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Seleccionar servicio para generar listado:
                </label>
                <select
                  id="serviceSelect"
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="block w-1/2 px-2 py-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="masajes">Tratamientos Corporales</option>
                  <option value="faciales">Tratamientos Faciales</option>
                </select>
              </div>
            </div>
            <div className="flex mt-4 space-x-4">
              <button
                onClick={() => handleButtonClick("Reporte Semanal")}
                className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none"
              >
                Descargar Reporte Semanal
              </button>
              <button
                onClick={() => handleButtonClick("Reporte Mensual")}
                className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none"
              >
                Descargar Reporte Mensual
              </button>
              <button
                onClick={() => handleButtonClick("Reporte Anual")}
                className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none"
              >
                Descargar Reporte Anual
              </button>
            </div>
            <div className="h-[20vh]">
              <div className="p-6 mt-8 mb-16 bg-gray-100 rounded-lg shadow-md">
                <h3 className="mb-4 text-2xl font-semibold">
                  Obtener informe de ganancias
                </h3>
                <div className="flex space-x-4 ">
                  <label className="text-sm text-gray-600">
                    Fecha de inicio:
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="px-2 py-1 border border-gray-300 rounded-md"
                  />
                  <label className="text-sm text-gray-600">Fecha de fin:</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="px-2 py-1 border border-gray-300 rounded-md"
                  />
                  <button
                    onClick={fetchIncomeReport}
                    className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none"
                  >
                    Descargar Informe
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Home;
