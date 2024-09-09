import React, { useState } from "react";
import Footer from "../Footer/Footer";
import { NavbarComponent } from "../Navbar/Navbar";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useUsuario } from "../../Context/usuarioContex";

Modal.setAppElement("#root"); // Para la accesibilidad

export const Opinions = () => {
  const [opinions, setOpinions] = useState([
    {
      name: "Carlos Mendoza",
      opinion:
        "El spa es increíble, las instalaciones son muy relajantes y el masaje que recibí fue de primera clase. Volveré sin duda.",
      rating: 5,
    },
    {
      name: "Ana Gómez",
      opinion:
        "El ambiente es muy agradable y tranquilo, pero el servicio de recepción podría ser más eficiente.",
      rating: 4,
    },
    {
      name: "Luis Fernández",
      opinion:
        "Las instalaciones del spa están bien, pero el masaje no cumplió con mis expectativas. Fue demasiado breve para el precio que pagué.",
      rating: 3,
    },
    {
      name: "María López",
      opinion:
        "La experiencia en el spa fue relajante, aunque el área de saunas estaba un poco sucia. Aun así, disfruté mucho del tratamiento facial.",
      rating: 4,
    },
    {
      name: "Pedro Ruiz",
      opinion:
        "El spa tiene un buen ambiente, pero la calidad del masaje no justificó el costo. No creo que vuelva.",
      rating: 2,
    },
    {
      name: "Laura Martínez",
      opinion:
        "El spa es muy bonito y el personal es amable, pero el servicio fue más lento de lo esperado.",
      rating: 3,
    },
    {
      name: "Jorge Ortega",
      opinion:
        "Excelente lugar para relajarse. Las instalaciones están bien mantenidas y el masaje fue realmente efectivo.",
      rating: 5,
    },
    {
      name: "Isabel Ramírez",
      opinion:
        "Me gustó el ambiente del spa, pero el servicio de masajes no fue tan personalizado como esperaba.",
      rating: 3,
    },
    {
      name: "Fernando Silva",
      opinion:
        "El spa tiene un ambiente muy relajante y las instalaciones son modernas, pero el costo es un poco elevado para lo que ofrecen.",
      rating: 4,
    },
    {
      name: "Carmen Vázquez",
      opinion:
        "La experiencia en el spa fue bastante buena, aunque el tiempo de espera para el tratamiento fue un poco largo.",
      rating: 4,
    },
  ]);

  const [visibleCount, setVisibleCount] = useState(6);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { usuario } = useUsuario();
  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Agregar nueva opinión
  const onSubmit = (data) => {
    const newOpinion = {
      name: data.name || "Anonimo",
      opinion: data.opinion,
      rating: parseInt(data.rating),
    };
    setOpinions([...opinions, newOpinion]);
    setIsModalOpen(false);
    reset(); // Limpiar formulario
  };

  // Mostrar estrellas según la puntuación
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={i < rating ? "text-yellow-500" : "text-gray-300"}
      >
        ★
      </span>
    ));
  };

  // Función para mostrar más opiniones
  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  return (
    <div className="flex flex-col min-h-screen bg-AntiFlashWhite">
      {/* Navbar */}
      <NavbarComponent />

      {/* Main content */}
      <main className="flex-grow">
        <section className="py-12 bg-gray-100">
          <div className="container mx-auto">
            <h1 className="mb-8 text-5xl font-extrabold text-center text-gray-800">
              Opiniones de nuestros clientes
            </h1>

            {/* Botón para añadir comentario */}
            <div className="flex justify-end mb-8">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-3 text-white transition duration-300 rounded-lg bg-Verde hover:bg-green-700"
              >
                Añadir comentario
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {opinions.slice(0, visibleCount).map((opinion, index) => (
                <article
                  key={index}
                  className="p-6 transition-shadow duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl"
                >
                  <h2 className="mb-2 text-2xl font-semibold text-gray-700">
                    {opinion.name}
                  </h2>
                  <p className="text-gray-600">{opinion.opinion}</p>
                  <div className="flex mt-2">{renderStars(opinion.rating)}</div>
                </article>
              ))}
            </div>

            {/* Botón para ver más opiniones */}
            {visibleCount < opinions.length && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={handleShowMore}
                  className="px-6 py-3 text-white transition duration-300 rounded-lg bg-Verde hover:bg-green-700"
                >
                  Ver más
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)", // Fondo oscuro con opacidad
            backdropFilter: "blur(5px)", // Difuminado
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000, // Superposición
          },
          content: {
            position: "relative",
            maxWidth: "600px",
            width: "100%",
            margin: "auto",
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
            inset: "auto", // Desactiva posiciones predeterminadas de react-modal
          },
        }}
      >
        {/*Framer Motion */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-4 text-2xl font-bold">Añadir nueva opinión</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Nombre (opcional) */}
            <div className="mb-4">
              <label className="block text-gray-700">Nombre (Opcional)</label>
              <input
                type="text"
                {...register("name")}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Ingresa tu nombre"
              />
            </div>

            {/* Opinión */}
            <div className="mb-4">
              <label className="block text-gray-700">Opinión</label>
              <textarea
                {...register("opinion", {
                  required: "La opinión es requerida",
                })}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Escribe tu opinión"
              />
              {errors.opinion && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.opinion.message}
                </p>
              )}
            </div>

            {/* Puntuación */}
            <div className="mb-4">
              <label className="block text-gray-700">Puntuación (0 a 5)</label>
              <input
                type="number"
                {...register("rating", {
                  required: "La puntuación es requerida",
                  min: {
                    value: 0,
                    message: "La puntuación debe ser mayor o igual a 0",
                  },
                  max: {
                    value: 5,
                    message: "La puntuación debe ser menor o igual a 5",
                  },
                })}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Puntuación"
              />
              {errors.rating && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.rating.message}
                </p>
              )}
            </div>

            {/* Botones */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 mr-4 bg-gray-300 rounded-lg"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white rounded-lg bg-Verde hover:bg-green-700"
              >
                Enviar
              </button>
            </div>
          </form>
        </motion.div>
      </Modal>
    </div>
  );
};
