
import { NavbarComponent } from "./components/Navbar/Navbar";
import { CardComponent } from "./components/Layout/Card";
import Footer from "./components/Footer/Footer";


function Container() {
  return (
    <div className="w-full h-screen ">
      <NavbarComponent />
      <div className="flex gap-2 p-2">
        <CardComponent />
        <CardComponent />
        <CardComponent />
      </div>
     <Footer/>
      
    
    </div>
  );
}
export default Container;
