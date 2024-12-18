import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./components/Autenticacion/Login";
import "./index.css";
import Container from "./container";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import { UsuarioProvider, useUsuario } from "./Context/usuarioContex";
import { Toaster } from "react-hot-toast";
import { Register } from "./components/Autenticacion/Register";
import EditProfile from "./components/Profile/Profile";
import Reservations from "./components/Reservations/Reservetaions";
import NewsAndPromotions from "./components/Notices/Notices";
import ReservationsAdmin from "./components/Reservations/Admin-reservations";
import AboutUs from "./components/About-us/AboutUs";
import { Opinions } from "./components/Opinions/Opinions";
import { Contact } from "./components/Contact/Contact";
import EmployeeForm from "./components/Employee/Employee";
import Payments from "./components/Payments/Payments";
import Information from "./components/Information/Information";
import Home from "./components/Home/Home";
export default () => (
  <UsuarioProvider>
    <App></App>
  </UsuarioProvider>
);

function App() {
  const { usuario } = useUsuario();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoutes
                canAccess={!!usuario && Object.keys(usuario).length > 0}
                redirectPath="/"
              />
            }
          >
            {usuario.type !== "client" && (
              <Route
                path="/admin-reservations"
                element={<ReservationsAdmin />}
              />
            )}
            {usuario.type !== "client" && (
              <Route path="/home" element={<Home />} />
            )}
            {usuario.type === "admin" && (
              <Route path="/create-employee" element={<EmployeeForm />} />
            )}
            {usuario.type === "admin" && (
              <Route path="/information" element={<Information />} />
            )}
            {(usuario.type === "secretariat" || usuario.type === "admin") && (
              <Route path="/payments" element={<Payments />} />
            )}
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/reservations" element={<Reservations />} />
          </Route>
          <Route path="/" element={<Container />} />
          <Route path="/login" element={<Login />} />
          <Route path="/notices" element={<NewsAndPromotions />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/opinions" element={<Opinions />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerStyle={{}}
        containerClassName=""
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
    </>
  );
}
