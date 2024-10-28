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

function Container() {
  const images = ["Carousel/sp2.jpg", "Carousel/sp3.jpg", "Carousel/sp1.jpg"];
  const { services, loading } = useServices();
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const { usuario } = useUsuario();
  const navigate = useNavigate();
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
    </div>
  );
}

export default Container;
