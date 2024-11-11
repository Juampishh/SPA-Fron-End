import { useState, useEffect } from "react";
import { NavbarComponent } from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Carousel from "./components/Layout/Carousel";
import { useServices } from "./Hooks/Services";
import { CardComponent } from "./components/Layout/Card";
import CategoryFilter from "./components/Layout/Filter";
import { Service } from "./Types/Services";
import Loader from "./components/Loaders/Loader";
import { useUsuario } from "./Context/usuarioContex";
import { useNavigate } from "react-router-dom";
import { FaMobileAlt, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";

function Container() {
  const images = ["Carousel/sp2.jpg", "Carousel/sp3.jpg", "Carousel/sp1.jpg"];
  const { services, loading } = useServices();
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const { usuario } = useUsuario();
  const navigate = useNavigate();

  // Estado para controlar la visibilidad del modal
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (services) {
      const uniqueCategories = Array.from(
        new Set(services.map((service) => service.category))
      );
      setCategories(uniqueCategories);
      setFilteredServices(
        selectedCategory
          ? services.filter((service) => service.category === selectedCategory)
          : services
      );
    }
  }, [services, selectedCategory]);

  // Función para abrir el modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Función para cerrar el modal y redirigir
  const handleCloseModal = () => {
    setIsModalOpen(false);
    window.location.href =
      "https://www.mediafire.com/file/86gx9gtg8qsw4fi/app-spa.apk/file"; // Redirige a la URL
  };

  return (
    <div className="w-full h-screen bg-AntiFlashWhite">
      <NavbarComponent />
      <div className="flex flex-col">
        <Carousel images={images} />
        <div id="services" className="pt-3">
          <CategoryFilter
            categories={categories}
            onFilterChange={setSelectedCategory}
          />
          <div className="flex flex-wrap justify-center gap-4 bg-AntiFlashWhite">
            <div className="flex justify-center w-full">
              {loading && <Loader size={90} loading={true} />}
            </div>

            {filteredServices.map((service) => (
              <CardComponent
                key={service.id}
                id={service.id}
                url={service.image_url}
                title={service.service_name}
                description={service.description}
                cost={service.cost}
                duration={service.duration}
                rating={service.rating}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />

      {/* Botón flotante */}
      <button
        className="fixed p-3 text-white bg-blue-500 rounded-full shadow-lg left-4 bottom-4"
        onClick={handleOpenModal}
      >
        <FaMobileAlt size={24} />
      </button>

      {/* Modal */}
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative flex flex-col p-5 text-center rounded-lg shadow-lg bg-AntiFlashWhite"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <button
              className="absolute text-black top-2 right-2"
              onClick={handleCloseModal}
            >
              <FaTimes size={20} />
            </button>
            <div className="mb-4">
              {/* SVG de un smartphone */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-16 h-16 mx-auto text-blue-500" // Estilo del SVG
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="1" width="18" height="22" rx="2" ry="2" />
                <line x1="12" y1="18" x2="12" y2="18" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-black">
              10% de descuento en reservas desde la app
            </h2>
            <button
              className="p-2 mt-4 text-white rounded bg-Rosa hover:bg-pink-600"
              onClick={handleCloseModal}
            >
              Descargar ya!
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default Container;
