import React from "react";
import { NavbarComponent } from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { motion } from "framer-motion";
interface Promotion {
  id: number;
  title: string;
  description: string;
  date: string;
  link?: string;
}

const promotions: Promotion[] = [
  {
    id: 1,
    title: "¡Gran Oferta en Masajes!",
    description:
      "Aprovecha un 20% de descuento en todos nuestros masajes durante este mes.",
    date: "2024-08-20",
    link: "#",
  },
  {
    id: 2,
    title: "Nuevo Tratamiento Facial",
    description:
      "Prueba nuestro nuevo tratamiento facial rejuvenecedor con un 15% de descuento.",
    date: "2024-08-15",
    link: "#",
  },
  {
    id: 3,
    title: "Promoción de Verano",
    description:
      "Compra un paquete de 3 sesiones de spa y recibe la cuarta sesión gratis.",
    date: "2024-08-10",
    link: "#",
  },
  {
    id: 4,
    title: "Descuento en Productos",
    description:
      "Descuento del 10% en todos los productos de cuidado personal comprados en nuestra tienda.",
    date: "2024-08-05",
    link: "#",
  },
];

const NewsAndPromotions: React.FC = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <NavbarComponent />
        <section className="py-8 border-b-2 bg-AntiFlashWhite">
          <div className="container px-6 mx-auto">
            <h2 className="mb-6 text-3xl font-bold text-gray-800">
              Noticias y Promociones
            </h2>
            <div className="space-y-6">
              {promotions.map((promotion) => (
                <div
                  key={promotion.id}
                  className="p-6 transition-shadow duration-300 bg-white rounded-lg shadow-md hover:shadow-lg"
                >
                  <h3 className="text-xl font-semibold text-[#E91E63] mb-2">
                    {promotion.title}
                  </h3>
                  <p className="mb-4 text-gray-700">{promotion.description}</p>
                  <p className="mb-4 text-sm text-gray-500">
                    Fecha: {new Date(promotion.date).toLocaleDateString()}
                  </p>
                  {promotion.link && (
                    <a
                      href={promotion.link}
                      className="text-[#E91E63] hover:underline"
                    >
                      Más información
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
        <Footer />
      </motion.div>
    </>
  );
};

export default NewsAndPromotions;
