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
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/reservations" element={<Reservations />} />
          </Route>
          <Route path="/" element={<Container />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
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
