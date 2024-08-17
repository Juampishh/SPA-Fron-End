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

// Estilos para el modal
const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  content: {
    maxWidth: "60vw",
    maxHeight: "60vh",
    margin: "auto",
    padding: "0",
    borderRadius: "8px",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    overflow: "hidden",
  },
};

// Función para renderizar estrellas
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
  title,
  description,
  cost,
  duration,
  rating,
}: CardComponentProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const validUrl = `servicios/${url}`;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Card className="flex flex-col transition-shadow duration-300 border border-gray-200 rounded-lg shadow-lg hover:shadow-xl w-80">
        <CardHeader className="overflow-hidden rounded-t-lg">
          <img
            src={validUrl}
            alt={title}
            className="object-cover w-full h-48 transition-transform transform cursor-pointer md:h-56 lg:h-64 hover:scale-105"
            onClick={openModal}
          />
        </CardHeader>
        <CardContent className="flex flex-col flex-grow p-4 space-y-4">
          <div className="flex-1">
            <CardTitle className="text-2xl font-bold text-center text-gray-800">
              {title}
            </CardTitle>
            <CardDescription className="w-full py-2 text-lg text-center text-gray-600">
              {description}
            </CardDescription>
          </div>
          <div className="mt-auto">
            <Button
              size="sm"
              color="primary"
              className="w-full px-4 py-2 mt-2 text-white rounded bg-Verde hover:bg-Rosa focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Reservar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Detalles del Servicio"
      >
        <button
          onClick={closeModal}
          className="absolute text-2xl text-gray-600 top-4 right-4"
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
            className="object-cover w-1/2 h-full"
          />
          <div className="flex flex-col w-1/2 p-6 overflow-y-auto bg-gray-50">
            <div>
              <h2 className="mb-4 text-3xl font-bold text-gray-800">{title}</h2>
              <p className="mb-4 text-lg text-gray-600">{description}</p>
              <div className="mt-4">
                <p className="text-xl font-medium text-gray-800">
                  Costo: <span className="font-semibold">{"$" + cost}</span>
                </p>
                <p className="text-xl font-medium text-gray-800">
                  Duración: <span className="font-semibold">{duration}</span>
                </p>
                <div className="mt-4">
                  <p className="text-xl font-medium text-gray-800">
                    Puntuación:
                  </p>
                  <RatingStars rating={rating} />
                </div>
              </div>
            </div>
            <div className="mt-auto">
              <Button
                size="md"
                color="primary"
                className="w-full px-6 py-3 text-white rounded bg-Verde hover:bg-Rosa focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Reservar
              </Button>
            </div>
          </div>
        </motion.div>
      </Modal>
    </>
  );
};
