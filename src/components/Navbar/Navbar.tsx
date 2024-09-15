import { useState, useRef } from "react";
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
import { HiOutlineMenu } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

export const NavbarComponent = () => {
  const { usuario } = useUsuario();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const userButtonRef = useRef<HTMLDivElement>(null);

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
      <NavbarContainer className="relative flex items-center justify-between">
        <NavbarBrand className="flex items-center text-Verde">
          <img
            className="w-24 p-2 rounded-lg cursor-pointer hover:scale-105"
            onClick={() => {
              navigate("/");
            }}
            src="./public/Logo.jpeg"
            alt="Logo"
          />
        </NavbarBrand>

        <NavbarList className="relative flex items-center lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mr-4 text-black"
          >
            <HiOutlineMenu className="w-8 h-8" />
          </button>
          {usuario.firstName || usuario.lastName ? (
            <NavbarItem
              className="flex items-center cursor-pointer hover:text-Verde"
              onClick={() => setMenuOpen(!menuOpen)}
              ref={userButtonRef}
            >
              <CiUser className="w-8 h-8 text-black" />
            </NavbarItem>
          ) : (
            <NavbarItem
              className="flex items-center cursor-pointer hover:text-Verde"
              onClick={() => navigate("/login")}
            >
              <FaSignInAlt className="w-8 h-8 text-black" />
            </NavbarItem>
          )}
        </NavbarList>

        <NavbarList className="items-center justify-center hidden lg:flex lg:w-full lg:justify-center">
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
          <NavbarItem
            className="hover:text-Verde"
            onClick={() => navigate("/about-us")}
          >
            Sobre nosotros
          </NavbarItem>
          <NavbarItem
            onClick={() => {
              navigate("/contact");
            }}
            className="hover:text-Verde"
          >
            Contacto
          </NavbarItem>
          <NavbarItem
            className="hover:text-Verde"
            onClick={() => {
              navigate("/notices");
            }}
          >
            Noticias
          </NavbarItem>
          <NavbarItem
            onClick={() => {
              navigate("/opinions");
            }}
            className="hover:text-Verde"
          >
            Opiniones
          </NavbarItem>
        </NavbarList>

        <NavbarList className="w-56 ml-2 lg:flex lg:items-center lg:ml-auto">
          {usuario.firstName || usuario.lastName ? (
            <NavbarItem
              className="flex items-center cursor-pointer hover:text-Verde"
              onClick={() => setMenuOpen(!menuOpen)}
              ref={userButtonRef}
            >
              <span className="ml-2 text-sm text-black">
                {usuario.firstName} {usuario.lastName}
              </span>
              <CiUser className="w-8 h-8 text-black" />
            </NavbarItem>
          ) : (
            <NavbarItem
              className="flex items-center cursor-pointer hover:text-Verde"
              onClick={() => navigate("/login")}
            >
              <FaSignInAlt className="w-8 h-8 text-black" />
              <span className="ml-2 text-sm text-black">Iniciar sesión</span>
            </NavbarItem>
          )}
        </NavbarList>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="absolute z-50 w-full bg-white shadow-lg lg:hidden"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <button
                className="absolute p-2 text-black top-2 right-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                <IoMdClose className="w-6 h-6" />
              </button>
              <NavbarList className="flex flex-col items-center p-4 space-y-4">
                <NavbarItem
                  className="cursor-pointer hover:text-Verde"
                  onClick={() => {
                    navigate("/");
                    setTimeout(() => {
                      scrollToSection("services");
                      setMobileMenuOpen(false);
                    }, 500);
                  }}
                >
                  Servicios
                </NavbarItem>
                <NavbarItem
                  className="hover:text-Verde"
                  onClick={() => {
                    navigate("/about-us");
                    setMobileMenuOpen(false);
                  }}
                >
                  Sobre nosotros
                </NavbarItem>
                <NavbarItem
                  className="hover:text-Verde"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contacto
                </NavbarItem>
                <NavbarItem
                  className="hover:text-Verde"
                  onClick={() => {
                    navigate("/notices");
                    setMobileMenuOpen(false);
                  }}
                >
                  Noticias
                </NavbarItem>
                <NavbarItem
                  className="hover:text-Verde"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Opiniones
                </NavbarItem>
              </NavbarList>
            </motion.div>
          )}
        </AnimatePresence>
      </NavbarContainer>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="absolute right-0 z-50 w-48 mt-2 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg max-h-64"
            style={{
              top: userButtonRef.current?.getBoundingClientRect().bottom ?? 0,
              left: userButtonRef.current?.getBoundingClientRect().left ?? 0,
            }}
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
              className="absolute p-2 text-black cursor-pointer top-2 right-2"
              onClick={() => setMenuOpen(false)}
            >
              <IoMdClose className="w-6 h-6 text-gray-600 hover:text-gray-800" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Navbar>
  );
};
