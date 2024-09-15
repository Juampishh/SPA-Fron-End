import { NavbarComponent } from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

export const Contact = () => {
  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Enviar datos del formulario
  const onSubmit = (data) => {
    console.log(data);
    toast.success(
      "¡Gracias por contactarnos en SPA SENTIRSE BIEN! Nos pondremos en contacto contigo pronto."
    );
    reset(); // Limpiar el formulario después de enviar

    // Redirigir a WhatsApp
    const phoneNumber = "+543777382757";
    const message = encodeURIComponent(
      `*🌿 SPA SENTIRSE BIEN 🌿*\n\n¡Gracias por contactarnos!\n\n👤 *Nombre*: ${
        data.name
      }\n✉️ *Correo Electrónico*: ${data.email}\n📞 *Teléfono*: ${
        data.phone || "No proporcionado"
      }\n\n💬 *Mensaje*:\n${
        data.message
      }\n\nNos pondremos en contacto contigo lo antes posible. ¡Que tengas un excelente día!`
    );
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    // Crear un enlace y simular un clic para abrir en una nueva pestaña
    const link = document.createElement("a");
    link.href = whatsappUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer"; // Seguridad adicional
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col min-h-screen bg-AntiFlashWhite">
      {/* Navbar */}
      <NavbarComponent />

      {/* Main content */}
      <main className="flex-grow">
        <section className="py-12 bg-gray-100">
          <div className="container mx-auto">
            <h1 className="mb-8 text-5xl font-extrabold text-center text-gray-800">
              Contacta con SPA SENTIRSE BIEN
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="max-w-lg p-8 mx-auto bg-white rounded-lg shadow-lg"
            >
              {/* Nombre */}
              <div className="mb-4">
                <label className="block text-gray-700">Nombre</label>
                <input
                  type="text"
                  {...register("name", { required: "El nombre es requerido" })}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Ingresa tu nombre"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Correo electrónico */}
              <div className="mb-4">
                <label className="block text-gray-700">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "El correo electrónico es requerido",
                  })}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Ingresa tu correo electrónico"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Teléfono */}
              <div className="mb-4">
                <label className="block text-gray-700">Teléfono</label>
                <input
                  type="tel"
                  {...register("phone")}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Ingresa tu teléfono (opcional)"
                />
              </div>

              {/* Mensaje */}
              <div className="mb-4">
                <label className="block text-gray-700">Mensaje</label>
                <textarea
                  {...register("message", {
                    required: "El mensaje es requerido",
                  })}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Escribe tu mensaje aquí"
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Botón de enviar */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 text-white rounded-lg bg-Verde hover:bg-green-700"
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Toast Container */}
      <Toaster />
    </div>
  );
};
