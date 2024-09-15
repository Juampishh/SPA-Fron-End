import { useEffect, useState } from "react";
import { useAppointments } from "../../Hooks/Appointments";
import Footer from "../Footer/Footer";
import { NavbarComponent } from "../Navbar/Navbar";
import {
  FiCalendar,
  FiClock,
  FiDollarSign,
  FiStar,
  FiInfo,
} from "react-icons/fi";
import { motion } from "framer-motion";
import Loader from "../Loaders/Loader";

// Función para traducir y convertir el estado a mayúsculas
const translateStatus = (status) => {
  const statuses = {
    pending: "PENDIENTE",
    completed: "COMPLETADO",
    expired: "EXPIRADO",
  };
  return statuses[status] || status.toUpperCase();
};

function handleState(status) {
  switch (status) {
    case "completed":
      return "bg-green-300 text-white";
    case "expired":
      return "bg-red-400 text-white";
    default:
      return "bg-orange-300 text-white";
  }
}

const ReservationCard = ({ reservation, onMoreInfo }) => (
  <div className="p-6 mb-6 transition-shadow duration-300 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl">
    <img
      src={`servicios/${reservation.service.image_url}`}
      alt={reservation.service.service_name}
      className="object-cover w-full h-40 rounded-t-lg"
    />
    <div className="p-4">
      <h3 className="text-2xl font-semibold text-rose-700">
        {reservation.service.service_name}
      </h3>
      <div className="flex items-center mt-2 text-gray-700">
        <FiCalendar className="mr-2 text-rose-500" />
        <span>
          {new Date(reservation.appointment_date).toLocaleDateString()}
        </span>
      </div>
      <div className="flex items-center mt-2 text-gray-700">
        <FiClock className="mr-2 text-rose-500" />
        <span>
          {new Date(reservation.appointment_date).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
      <div className="flex items-center mt-2 text-gray-700">
        <FiClock className="mr-2 text-rose-500" />
        <span>{reservation.service.duration}</span>
      </div>
      <div className="flex items-center mt-2 text-gray-700">
        <FiDollarSign className="mr-2 text-rose-500" />
        <span>{reservation.service.cost}</span>
      </div>
      <div className="flex items-center mt-2 text-gray-700">
        <FiStar className="mr-2 text-rose-500" />
        <span>{reservation.service.rating}</span>
      </div>
      <p className="mt-4 text-gray-600">{reservation.service.description}</p>
      <div className="flex items-center justify-between mt-4">
        <span
          className={`px-2 py-1 text-sm font-semibold rounded ${handleState(
            reservation.status
          )}`}
        >
          {translateStatus(reservation.status)}
        </span>
        <button
          onClick={() => onMoreInfo(reservation)}
          className="flex items-center px-4 py-2 text-sm font-medium text-white transition duration-300 rounded-lg bg-rose-500 hover:bg-rose-700"
        >
          <FiInfo className="mr-2" /> Más información
        </button>
      </div>
    </div>
  </div>
);

const ReservationModal = ({ reservation, onClose }) => (
  <motion.div
    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="mb-4 text-2xl font-bold text-center text-rose-700">
        Información de la Reserva
      </h2>
      <p>
        <strong>Servicio:</strong> {reservation.service.service_name}
      </p>
      <p>
        <strong>Fecha de la cita:</strong>{" "}
        {new Date(reservation.appointment_date).toLocaleDateString()}
      </p>
      <p>
        <strong>Hora de la cita:</strong>{" "}
        {new Date(reservation.appointment_date).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
      <p>
        <strong>Duración:</strong> {reservation.service.duration}
      </p>
      <p>
        <strong>Costo:</strong> {"$" + reservation.service.cost}
      </p>
      <p>
        <strong>Vigencia de la reserva:</strong>{" "}
        {reservation.appointment_date.split("T")[0]}
      </p>
      <button
        onClick={onClose}
        className="px-4 py-2 mt-4 text-white rounded-lg bg-rose-500 hover:bg-rose-700"
      >
        Cerrar
      </button>
    </div>
  </motion.div>
);

const Reservations = () => {
  const { appointments, fetchAppointmentsData, loading } = useAppointments();

  // Ejecutar la función de fetch cuando el componente se monta
  useEffect(() => {
    fetchAppointmentsData();
  }, [fetchAppointmentsData]);

  const [selectedReservation, setSelectedReservation] = useState(null);

  const handleMoreInfo = (reservation) => {
    setSelectedReservation(reservation);
  };

  const handleCloseModal = () => {
    setSelectedReservation(null);
  };

  return (
    <>
      <NavbarComponent />
      <div className="min-h-screen p-6 bg-gray-50">
        <h1 className="mb-8 text-3xl font-bold text-center text-rose-700">
          TUS RESERVAS
        </h1>
        {loading && <Loader size={90} loading={loading} />}
        {appointments.length === 0 ? (
          <div className="flex items-center justify-center min-h-screen text-2xl text-gray-700">
            No hay reservas realizadas
          </div>
        ) : (
          <div className="grid max-w-4xl gap-6 mx-auto lg:grid-cols-2">
            {appointments.map((reservation) => (
              <ReservationCard
                key={reservation.id}
                reservation={reservation}
                onMoreInfo={handleMoreInfo}
              />
            ))}
          </div>
        )}
      </div>
      {selectedReservation && (
        <ReservationModal
          reservation={selectedReservation}
          onClose={handleCloseModal}
        />
      )}
      <Footer />
    </>
  );
};

export default Reservations;
