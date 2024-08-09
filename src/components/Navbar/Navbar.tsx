import {
  Navbar,
  NavbarBrand,
  NavbarContainer,
  NavbarItem,
  NavbarList,
} from "keep-react";
import { useUsuario } from "../../Context/usuarioContex";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { CiUser } from "react-icons/ci";
export const NavbarComponent = () => {
  const { usuario } = useUsuario();
  const navigate = useNavigate();
  const Logout = () => {
    localStorage.removeItem("usuario");
    navigate("/");
    toast.success("Sesion cerrada");
  };
  return (
    <Navbar className="w-full ">
      <NavbarContainer className="flex justify-between">
        <NavbarBrand className="text-Verde">
          <img className="w-24 p-2 " src="./public/Logo.jpeg" alt="" />
          <span className="ml-4 text-xs ">Sentirse Bien</span>
        </NavbarBrand>
        <NavbarList className="flex items-center justify-center">
          <NavbarItem className="hover:text-Verde">Servicios</NavbarItem>
          <NavbarItem className="hover:text-Verde">Sobre nosotros</NavbarItem>
          <NavbarItem className="hover:text-Verde">Contacto</NavbarItem>
        </NavbarList>
        <NavbarList className="">
          {usuario && (
            <NavbarItem
              className="flex gap-1 cursor-pointer hover:text-Verde"
              onClick={Logout}
            >
              Cerrar sesion
            </NavbarItem>
          )}
          {!usuario && (
            <NavbarItem>
              <CiUser className="w-6 h-6 mt-1 text-black" />
            </NavbarItem>
          )}
        </NavbarList>
      </NavbarContainer>
    </Navbar>
  );
};
