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
  FiEdit,
  FiTrash2,
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

const ReservationCardAdmin = ({
  reservation,
  onMoreInfo,
  onEdit,
  onDelete,
}) => (
  <div className="p-6 mb-6 transition-shadow duration-300 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl">
    <img
      src={`servicios/${reservation.image_url}`}
      alt={reservation.service_name}
      className="object-cover w-full h-40 rounded-t-lg"
    />
    <div className="p-4">
      <h3 className="text-2xl font-semibold text-rose-700">
        {reservation.service_name}
      </h3>
      <div className="flex items-center mt-2 text-gray-700">
        <FiCalendar className="mr-2 text-rose-500" />
        <span>
          {new Date(reservation.appointment_date).toLocaleDateString()}
        </span>
      </div>
      <div className="flex items-center mt-2 text-gray-700">
        <FiClock className="mr-2 text-rose-500" />
        <span>{reservation.duration}</span>
      </div>
      <div className="flex items-center mt-2 text-gray-700">
        <FiDollarSign className="mr-2 text-rose-500" />
        <span>{reservation.cost}</span>
      </div>
      <div className="flex items-center mt-2 text-gray-700">
        <FiStar className="mr-2 text-rose-500" />
        <span>{reservation.rating}</span>
      </div>
      <p className="mt-4 text-gray-600">{reservation.description}</p>
      <div className="flex flex-col gap-2 mt-4">
        <span
          className={`px-2 py-1 text-sm font-semibold rounded w-1/3 text-center ${handleState(
            reservation.status
          )}`}
        >
          {translateStatus(reservation.status)}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(reservation)}
            className="flex items-center px-4 py-1 text-sm font-medium text-left text-white transition duration-300 bg-blue-500 rounded-lg hover:bg-blue-700"
          >
            <FiEdit className="mr-2" /> Editar
          </button>
          <button
            onClick={() => onDelete(reservation.id)}
            className="flex items-center px-4 py-1 text-sm font-medium text-left text-white transition duration-300 bg-red-500 rounded-lg hover:bg-red-700"
          >
            <FiTrash2 className="mr-2" /> Eliminar
          </button>
          <button
            onClick={() => onMoreInfo(reservation)}
            className="flex items-center px-4 py-1 text-sm font-medium text-left text-white transition duration-300 rounded-lg bg-rose-500 hover:bg-rose-700"
          >
            <FiInfo className="mr-2" /> Más información
          </button>
        </div>
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
        <strong>Servicio:</strong> {reservation.service_name}
      </p>
      <p>
        <strong>Fecha de la cita:</strong>{" "}
        {new Date(reservation.appointment_date).toLocaleDateString()}
      </p>
      <p>
        <strong>Duración:</strong> {reservation.duration}
      </p>
      <p>
        <strong>Costo:</strong> {"$" + reservation.cost}
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

const ReservationsAdmin = () => {
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

  const handleEdit = (reservation) => {
    // Aquí iría la lógica para editar la reserva
    alert(`Editando reserva con ID: ${reservation.id}`);
  };

  const handleDelete = (reservationId) => {
    // Aquí iría la lógica para eliminar la reserva
    alert(`Eliminando reserva con ID: ${reservationId}`);
  };

  return (
    <>
      <NavbarComponent />
      <div className="min-h-screen p-6 bg-gray-50">
        <h1 className="mb-8 text-3xl font-bold text-center text-rose-700">
          ADMINISTRAR RESERVAS
        </h1>
        {loading && <Loader size={90} loading={loading} />}
        {appointments.length === 0 ? (
          <div className="flex items-center justify-center min-h-screen text-2xl text-gray-700">
            No hay reservas realizadas
          </div>
        ) : (
          <div className="grid max-w-4xl gap-6 mx-auto lg:grid-cols-2">
            {appointments.map((reservation) => (
              <ReservationCardAdmin
                key={reservation.id}
                reservation={reservation}
                onMoreInfo={handleMoreInfo}
                onEdit={handleEdit}
                onDelete={handleDelete}
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

export default ReservationsAdmin;
