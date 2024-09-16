import { useState } from "react";
import Modal from "react-modal";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "keep-react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { CardComponentProps } from "../../Types/CardComponentsProps";
import { motion } from "framer-motion";
import { FieldValues, useForm } from "react-hook-form";
import { useUsuario } from "../../Context/usuarioContex";
import { useAppointments } from "../../Hooks/Appointments";
import toast from "react-hot-toast";

const modalVariants = {
  hidden: {
    opacity: 0,
    y: "-10%",
  },
  visible: {
    opacity: 1,
    y: "0%",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    backdropFilter: "blur(10px)",
  },
  content: {
    maxWidth: "900px",
    maxHeight: "70vh",
    margin: "auto",
    padding: "0",
    overflow: "hidden",
    borderRadius: "8px",
  },
};

const RatingStars = ({ rating }: { rating: number }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} className="text-2xl text-yellow-500" />);
    } else if (rating >= i - 0.5) {
      stars.push(
        <FaStarHalfAlt key={i} className="text-2xl text-yellow-500" />
      );
    } else {
      stars.push(<FaRegStar key={i} className="text-2xl text-yellow-500" />);
    }
  }
  return <div className="flex">{stars}</div>;
};

export const CardComponent = ({
  url,
  id,
  title,
  description,
  cost,
  duration,
  rating,
}: CardComponentProps) => {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const validUrl = `servicios/${url}`;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { usuario } = useUsuario();
  const openInfoModal = () => setIsInfoModalOpen(true);
  const closeInfoModal = () => setIsInfoModalOpen(false);
  const openReserveModal = () => setIsReserveModalOpen(true);
  const closeReserveModal = () => setIsReserveModalOpen(false);
  const { fetchCreateAppointment } = useAppointments();

  const onSubmit = async (data: FieldValues) => {
    const { reservationDate } = data;

    // Definir el horario laboral
    const workStart = new Date();
    workStart.setHours(9, 0, 0, 0); // 9 AM
    const workEnd = new Date();
    workEnd.setHours(23, 0, 0, 0); // 8 PM

    const appointmentDate = new Date(reservationDate);

    // Validar que la fecha y hora estén dentro del horario laboral
    if (
      appointmentDate.getHours() < workStart.getHours() ||
      appointmentDate.getHours() > workEnd.getHours()
    ) {
      toast.error("El horario de atención es de 9 AM a 11 PM");
      return;
    }

    const formatedData = {
      service_id: id,
      user_id: usuario.id,
      appointment_date: reservationDate,
    };
    if (!usuario.id) return toast.error("Debes iniciar sesión para reservar");
    await fetchCreateAppointment(formatedData);
    closeReserveModal();
  };

  return (
    <>
      <Card className="flex flex-col transition-shadow duration-300 border border-gray-200 rounded-lg shadow-md hover:shadow-lg w-80">
        <CardHeader className="overflow-hidden rounded-t-lg">
          <img
            src={validUrl}
            alt={title}
            className="object-cover w-full h-48 transition-transform transform rounded-t-lg cursor-pointer md:h-56 lg:h-64 hover:scale-105"
            onClick={openInfoModal}
          />
        </CardHeader>
        <CardContent className="flex flex-col flex-grow p-4 space-y-4 bg-white rounded-b-lg">
          <div className="flex-1">
            <CardTitle className="text-2xl font-semibold text-center text-gray-800">
              {title}
            </CardTitle>
            <CardDescription className="w-full py-2 text-xs text-center text-gray-600">
              {description}
            </CardDescription>
          </div>
          <div className="mt-auto">
            <Button
              size="sm"
              color="primary"
              className="w-full px-4 py-2 mt-2 text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              onClick={openReserveModal}
            >
              Reservar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Modal de Información */}
      <Modal
        isOpen={isInfoModalOpen}
        onRequestClose={closeInfoModal}
        style={modalStyles}
        contentLabel="Detalles del Servicio"
      >
        <button
          onClick={closeInfoModal}
          className="absolute text-2xl text-gray-700 top-4 right-4 hover:text-gray-900"
        >
          &times;
        </button>
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={modalVariants}
          className="flex h-full"
        >
          <img
            src={validUrl}
            alt={title}
            className="object-cover w-1/2 h-full rounded-l-lg"
          />
          <div className="flex flex-col w-1/2 p-6 overflow-y-auto rounded-r-lg bg-gray-50">
            <h2 className="mb-4 text-3xl font-semibold text-gray-800">
              {title}
            </h2>
            <p className="mb-4 text-lg text-gray-600">{description}</p>
            <div className="mt-4">
              <p className="text-xl font-medium text-gray-800">
                Costo:{" "}
                <span className="font-semibold text-green-600">
                  {"$" + cost}
                </span>
              </p>
              <p className="text-xl font-medium text-gray-800">
                Duración: <span className="font-semibold">{duration}</span>
              </p>
              <div className="mt-4">
                <p className="text-xl font-medium text-gray-800">Puntuación:</p>
                <RatingStars rating={rating} />
              </div>
            </div>
          </div>
        </motion.div>
      </Modal>

      <Modal
        isOpen={isReserveModalOpen}
        onRequestClose={closeReserveModal}
        style={modalStyles}
        contentLabel="Formulario de Reserva"
      >
        <button
          onClick={closeReserveModal}
          className="absolute text-4xl text-gray-500 transition duration-200 ease-in-out right-1 hover:text-gray-800"
        >
          &times;
        </button>
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={modalVariants}
          className="flex flex-col h-full lg:flex-row"
        >
          <img
            src={validUrl}
            alt={title}
            className="object-cover w-full h-40 rounded-l-lg lg:w-1/2 lg:h-full"
          />
          <div className="flex flex-col w-full p-6 overflow-y-auto bg-white rounded-r-lg lg:w-1/2">
            <h2 className="mb-6 text-4xl font-bold text-gray-900">
              Reserva para {title}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-base font-medium text-gray-700">
                    Nombre
                  </label>
                  <input
                    {...register("name", { required: true })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-500"
                  />
                  {errors.name && (
                    <span className="text-sm text-red-500">
                      Este campo es obligatorio
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-700">
                    Número de teléfono
                  </label>
                  <input
                    {...register("phone", { required: true })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-500"
                  />
                  {errors.phone && (
                    <span className="text-sm text-red-500">
                      Este campo es obligatorio
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-700">
                    Correo electrónico
                  </label>
                  <input
                    {...register("email", { required: true })}
                    type="email"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-500"
                  />
                  {errors.email && (
                    <span className="text-sm text-red-500">
                      Este campo es obligatorio
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-700">
                    Fecha y hora de reserva
                  </label>
                  <input
                    type="datetime-local"
                    {...register("reservationDate", { required: true })}
                    min={new Date().toISOString().slice(0, 16)} // Restricción de fechas anteriores a hoy
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-500"
                  />
                  {errors.reservationDate && (
                    <span className="text-sm text-red-500">
                      Este campo es obligatorio
                    </span>
                  )}
                </div>
              </div>
              <Button
                type="submit"
                size="lg"
                color="primary"
                className="w-full px-4 py-2 mt-4 text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              >
                Confirmar Reserva
              </Button>
            </form>
          </div>
        </motion.div>
      </Modal>
    </>
  );
};
