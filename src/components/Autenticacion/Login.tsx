import React, { useEffect, useState } from "react";
import { useLogin } from "../../Hooks/Login";
import { useNavigate } from "react-router-dom";
import { useUsuario } from "../../Context/usuarioContex";
import { Usuario } from "../../Context/usuarioContex";
const Login = () => {
  const navigate = useNavigate();
  const { setUsuario } = useUsuario();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { fetchLogin } = useLogin();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetchLogin(username, password, setUsuario);
  };

  const refreshLogin = (
    setUsuario: React.Dispatch<React.SetStateAction<Usuario>>
  ) => {
    const ls = localStorage.getItem("usuario");
    if (ls) {
      setUsuario(JSON.parse(ls));
      navigate("/");
    }
  };

  useEffect(() => {
    refreshLogin(setUsuario);
  }, []);

  return (
    <div className="relative min-h-screen">
      <img
        src="/fondo-login.jpg"
        alt="Fondo Login"
        className="absolute inset-0 object-cover w-full h-full -z-10"
      />
      <img
        src="/Logo-removebg-preview.png"
        alt="Logo"
        className="absolute w-40 transform -translate-x-1/2 top-14 left-1/2"
      />
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <h1 className="p-2 mb-6 text-3xl text-center text-gray-900 bg-white bg-opacity-50 rounded-lg">
          Bienvenido al SPA Sentirse Bien
        </h1>
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md bg-opacity-90">
          <h2 className="mb-6 text-2xl font-bold text-center text-gray-900">
            Iniciar Sesión
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre de usuario
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Iniciar Sesión
            </button>
          </form>

          <button
            onClick={() => {
              navigate("/register");
            }}
            className="w-full mt-4 text-sm text-center text-blue-500"
          >
            ¿No tienes cuenta? Regístrate
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
