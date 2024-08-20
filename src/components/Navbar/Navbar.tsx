import { useState } from "react";
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
import { FiLogOut } from "react-icons/fi";
import { FaSignInAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

export const NavbarComponent = () => {
  const { usuario } = useUsuario();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const Logout = () => {
    localStorage.removeItem("usuario");
    window.location.reload();
    toast.success("Sesión cerrada");
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <Navbar className="w-full">
      <NavbarContainer className="relative flex justify-between">
        <NavbarBrand className="text-Verde">
          <img
            className="w-24 p-2 rounded-lg cursor-pointer hover:scale-105"
            onClick={() => {
              navigate("/");
            }}
            src="./public/Logo.jpeg"
            alt="Logo"
          />
          <span className="ml-4 text-xs">Sentirse Bien</span>
        </NavbarBrand>
        <NavbarList className="flex items-center justify-center">
          <NavbarItem
            className="cursor-pointer hover:text-Verde"
            onClick={() => {
              navigate("/");
              setTimeout(() => {
                scrollToSection("services");
              }, 500);
            }}
          >
            Servicios
          </NavbarItem>
          <NavbarItem className="hover:text-Verde">Sobre nosotros</NavbarItem>
          <NavbarItem className="hover:text-Verde">Contacto</NavbarItem>
          <NavbarItem
            className="hover:text-Verde"
            onClick={() => {
              navigate("/notices");
            }}
          >
            Noticias
          </NavbarItem>
          <NavbarItem className="hover:text-Verde">Opiniones</NavbarItem>
        </NavbarList>
        <NavbarList className="relative flex items-center">
          {usuario.firstName || usuario.lastName ? (
            <>
              <NavbarItem
                className="flex items-center cursor-pointer hover:text-Verde"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <span className="mr-2">
                  {usuario.firstName} {usuario.lastName}
                </span>
                <CiUser className="w-6 h-6 mt-1 text-black" />
              </NavbarItem>
              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    className="absolute right-0 z-50 w-48 mt-2 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg max-h-64"
                    style={{ top: "100%" }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      className="flex items-center p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        navigate("/edit-profile");
                        setMenuOpen(false);
                      }}
                    >
                      <CiUser className="w-5 h-5 mr-2" />
                      Perfil
                    </div>
                    {usuario.type === "admin" ? (
                      <div
                        className="flex items-center p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                          navigate("/admin-reservations");
                          setMenuOpen(false);
                        }}
                      >
                        <CiUser className="w-5 h-5 mr-2" />
                        Reservas
                      </div>
                    ) : (
                      <div
                        className="flex items-center p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                          navigate("/reservations");
                          setMenuOpen(false);
                        }}
                      >
                        <CiUser className="w-5 h-5 mr-2" />
                        Reservas
                      </div>
                    )}

                    <div
                      className="flex items-center p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-100"
                      onClick={Logout}
                    >
                      <FiLogOut className="w-5 h-5 mr-2" />
                      Cerrar sesión
                    </div>
                    <div
                      className="absolute p-2 cursor-pointer top-2 right-2"
                      onClick={() => setMenuOpen(false)}
                    >
                      <IoMdClose className="w-6 h-6 text-gray-600" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            <>
              <NavbarItem
                className="flex items-center cursor-pointer hover:text-Verde"
                onClick={() => navigate("/login")} // Redirige al usuario a la página de login
              >
                <FaSignInAlt className="w-6 h-6 mt-1 text-black" />
                <span className="ml-2">Iniciar sesión</span>
              </NavbarItem>
            </>
          )}
        </NavbarList>
      </NavbarContainer>
    </Navbar>
  );
};
