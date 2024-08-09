import { NavbarComponent } from "./components/Navbar/Navbar";
import { CardComponent } from "./components/Layout/Card";
import Footer from "./components/Footer/Footer";
import Carousel from "./components/Layout/Carousel";

function Container() {
  const images = [
    "./public/Carousel/sp2.jpg",
    "./public/Carousel/sp3.jpg",
    "./public/Carousel/sp1.jpg",
  ];
  return (
    <div className="w-full h-screen ">
      <NavbarComponent />
      <div className="flex flex-col">
        <Carousel images={images} />
      </div>
      <Footer />
    </div>
  );
}
export default Container;
