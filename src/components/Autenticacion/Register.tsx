import { useNavigate } from "react-router-dom";

export const Register = () => {

    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
            <h1 className="mb-6 text-3xl font-bold text-center text-gray-900">
                Bienvenido al SPA Sentirse Bien
            </h1>
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h2 className="mb-6 text-2xl font-bold text-center text-gray-900">
                    Registrarse
                </h2>
                <form>
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
                            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-bold text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    > Registrarse </button>
                </form>
                <button onClick={() => { 
                    navigate("/");
                }} className="w-full px-4 py-2 mt-4 text-sm text-blue-500 transition duration-200 ease-in-out rounded-md text-blue hover:text-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">¿Ya tienes cuenta? Inicia sesion </button>
            </div>
        </div>
    );
    

}