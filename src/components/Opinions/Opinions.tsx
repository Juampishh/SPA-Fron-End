import { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import { NavbarComponent } from "../Navbar/Navbar";
import Modal from "react-modal";
import { FieldValues, useForm } from "react-hook-form";
import { motion } from "framer-motion";

import { useOpinions } from "../../Hooks/Opinions";
import { CreateOpinion } from "../../API/Opinions";
import toast from "react-hot-toast";

Modal.setAppElement("#root"); // Para la accesibilidad

export const Opinions = () => {
  const { opinions, fetchOpinionsData } = useOpinions();
  const [visibleCount, setVisibleCount] = useState(6);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Agregar nueva opinión
  const onSubmit = async (data: FieldValues) => {
    const newOpinion = {
      name: data.name || "Anonimo",
      opinion: data.opinion,
      rating: parseInt(data.rating),
    };
    const response = await CreateOpinion(newOpinion);
    if (response.code === 201) {
      fetchOpinionsData();
      toast.success("Opinión añadida correctamente");
    }
    setIsModalOpen(false);
    reset(); // Limpiar formulario
  };
  useEffect(() => {
    fetchOpinionsData();
  }, []);
  // Mostrar estrellas según la puntuación
  const renderStars = (rating: number) => {
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
                  {String(errors.opinion.message)}
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
                  {String(errors.rating.message)}
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
