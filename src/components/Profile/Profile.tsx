import { useForm } from "react-hook-form";
import { useUsuario } from "../../Context/usuarioContex";
import { NavbarComponent } from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { UpdateUser } from "../../API/Profile";

const EditProfile = () => {
  const { usuario } = useUsuario();

  const { firstName, lastName, email, password, id } = usuario;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: `${firstName} ${lastName}`,
      email,
      password,
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    const validData = {
      ...data,
      firstName: data.name.split(" ")[0],
      lastName: data.name.split(" ")[1],
    };
    delete validData.name;
    console.log(validData);
    await UpdateUser(id, validData);
  };

  return (
    <>
      <NavbarComponent />
      <div className="max-w-3xl p-8 mx-auto bg-AntiFlashWhite rounded-lg shadow-lg my-12 min-h-[400px]">
        <h2 className="mb-6 text-3xl font-semibold text-gray-800">
          Editar Perfil
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="mb-1 text-lg font-medium text-gray-700"
            >
              Nombre
            </label>
            <input
              id="name"
              {...register("name", { required: "El nombre es obligatorio" })}
              className="w-full p-3 transition duration-300 ease-in-out border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-Verde"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="mb-1 text-lg font-medium text-gray-700"
            >
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "El correo electrónico es obligatorio",
              })}
              className="w-full p-3 transition duration-300 ease-in-out border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-Verde"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="mb-1 text-lg font-medium text-gray-700"
            >
              Contraseña
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "La contraseña es obligatoria",
                })}
                className="w-full p-3 transition duration-300 ease-in-out border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-Verde"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 font-semibold text-white transition duration-300 ease-in-out rounded-lg shadow-md bg-Verde hover:bg-VerdeDark focus:outline-none focus:ring-2 focus:ring-Verde"
          >
            Guardar Cambios
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default EditProfile;
