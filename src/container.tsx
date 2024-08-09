
import { NavbarComponent } from "./components/Navbar";
import { CardComponent } from "./components/Carousel";

function Container() {
  return (
    <div className="w-full h-screen ">
      <NavbarComponent />
      <div className="flex gap-2 p-2">
        <CardComponent />
        <CardComponent />
        <CardComponent />
      </div>
    </div>
  );
}
export default Container;
