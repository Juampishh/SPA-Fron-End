import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLogin } from "../../Hooks/Login";
import { RegisterType } from "../../Types/Register";
import toast from "react-hot-toast";

export const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterType>({
    type: "",
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const { fetchRegister } = useLogin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      type: undefined,
    };
    try {
      await fetchRegister(data);

      navigate("/");
    } catch (error) {
      toast.error("Error al registrarse");
      console.log(error);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <img
        src="/fondo-login.jpg"
        alt="Fondo Login"
        className="absolute inset-0 z-0 object-cover w-full h-full"
      />
      <img
        src="/Logo-removebg-preview.png"
        alt="Logo"
        className="absolute z-10 w-40 transform -translate-x-1/2 top-9 left-1/2"
      />
      <h1 className="z-10 mb-6 text-3xl font-bold text-center text-gray-900">
        SPA Sentirse Bien
      </h1>
      <div className="relative z-10 w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-900">
          Registrarse
        </h2>
        <form onSubmit={onSubmit}>
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
              value={formData.username}
              onChange={handleChange}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre
            </label>
            <input
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Apellido
            </label>
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
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
              value={formData.password}
              onChange={handleChange}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Registrarse
          </button>
        </form>
        <button
          onClick={() => {
            navigate("/");
          }}
          className="w-full px-4 py-2 mt-4 text-sm text-blue-500 transition duration-200 ease-in-out rounded-md text-blue hover:text-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Ya tienes cuenta? Inicia sesión
        </button>
      </div>
    </div>
  );
};
