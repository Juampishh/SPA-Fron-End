import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const variants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

interface CarouselProps {
  images: string[]; // Define que 'images' es un array de strings
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full overflow-hidden h-[75vh] bg-black">
      <div className="relative w-full h-full">
        <AnimatePresence>
          <motion.div
            key={currentIndex}
            className="absolute inset-0"
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <img
              src={images[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              className="block object-cover w-full h-full"
            />
          </motion.div>
        </AnimatePresence>
        {currentIndex === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
            <h2 className="inline-block px-4 py-2 mb-2 text-3xl text-white bg-black bg-opacity-50 rounded-lg">
              Descubre la Tranquilidad y el Renacer
            </h2>
            <p className="mb-4 text-gray-700">
              Descubre más sobre nuestros servicios y productos.
            </p>
            <button className="px-6 py-2 text-white bg-[#8BC34A] rounded-full hover:bg-[#7CB342]">
              Ver más
            </button>
          </div>
        )}
      </div>
      <div className="absolute flex space-x-4 transform -translate-x-1/2 bottom-4 left-1/2">
        <button
          className="px-4 py-2 text-white bg-gray-800 rounded-full hover:bg-gray-600"
          onClick={handlePrevious}
        >
          &lt;
        </button>
        <button
          className="px-4 py-2 text-white bg-gray-800 rounded-full hover:bg-gray-600"
          onClick={handleNext}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
