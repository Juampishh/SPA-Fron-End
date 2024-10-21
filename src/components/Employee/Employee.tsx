// src/components/Employee/EmployeeForm.tsx
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { NavbarComponent } from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { CreateEmployee } from "../../API/Employees";
import toast from "react-hot-toast";

interface EmployeeFormInputs {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  type: string;
}

const EmployeeForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeFormInputs>();

  const onSubmit: SubmitHandler<EmployeeFormInputs> = async (data) => {
    const response = await CreateEmployee(data);
    if (response.code === 201) {
      toast.success("Empleado creado correctamente");
    } else {
      toast.error("Error al crear el empleado");
    }
  };

  return (
    <>
      <NavbarComponent />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-lg p-8 bg-white rounded shadow-md"
        >
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">
              Usuario
            </label>
            <input
              id="username"
              {...register("username", { required: true })}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.username && (
              <span className="text-sm text-red-500">
                Este campo es requerido
              </span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              {...register("password", { required: true })}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.password && (
              <span className="text-sm text-red-500">
                Este campo es requerido
              </span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              {...register("email", { required: true })}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.email && (
              <span className="text-sm text-red-500">
                Este campo es requerido
              </span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-700">
              Nombre
            </label>
            <input
              id="firstName"
              {...register("firstName", { required: true })}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.firstName && (
              <span className="text-sm text-red-500">
                Este campo es requerido
              </span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="lastName" className="block text-gray-700">
              Apellido
            </label>
            <input
              id="lastName"
              {...register("lastName", { required: true })}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.lastName && (
              <span className="text-sm text-red-500">
                Este campo es requerido
              </span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="employeeType" className="block text-gray-700">
              Tipo de Empleado
            </label>
            <select
              id="employeeType"
              {...register("type", { required: true })}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Seleccione un tipo</option>
              <option value="masseuse">Masajista</option>
              <option value="beautician">Estetisista</option>
              <option value="secretariat">Secretaria</option>
            </select>
            {errors.type && (
              <span className="text-sm text-red-500">
                Este campo es requerido
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white rounded-md shadow bg-Verde hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Crear Empleado
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default EmployeeForm;
