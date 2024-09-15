import { NavbarComponent } from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const AboutUs = () => {
  return (
    <div>
      <NavbarComponent />
      <div className="flex flex-col h-auto md:flex-row">
        <div className="flex items-center justify-center flex-1 p-8 bg-AntiFlashWhite">
          <div className="text-center md:text-left">
            <h1 className="mb-4 text-3xl font-bold md:text-4xl">
              Sobre Nosotros
            </h1>

            <p className="mt-4 text-base md:text-lg">
              Bienvenidos a nuestro centro de spa, un lugar de relajación y
              renovación. Nos dedicamos a ofrecer experiencias personalizadas
              para el bienestar de nuestros clientes. Nuestro spa abrió sus
              puertas en 2022 con la misión de ofrecer un oasis de tranquilidad
              y bienestar a nuestros clientes. Desde el principio, hemos
              trabajado para crear un espacio donde el cuerpo, la mente y el
              espíritu puedan encontrar un equilibrio perfecto.
            </p>
            <br />
            <p className="mt-4 text-base md:text-lg">
              Buscamos ser reconocidos como el spa líder en Resistencia,
              innovando continuamente en el bienestar y cuidado personal para
              proporcionar experiencias excepcionales a nuestros clientes.
            </p>
            <br />
            <p className="mt-4 text-base md:text-lg">
              Estamos dedicados a proteger nuestro entorno mediante prácticas
              ecológicas y sostenibles. Utilizamos productos orgánicos y
              biodegradables, y hemos implementado técnicas de ahorro de energía
              y agua en nuestras instalaciones. Creemos que el bienestar debe
              extenderse al planeta, y trabajamos constantemente para reducir
              nuestra huella ecológica mientras brindamos un servicio de alta
              calidad.
            </p>
          </div>
        </div>
        <div className="items-center justify-center flex-1 hidden md:flex bg-AntiFlashWhite">
          <img
            src="/Logo-removebg-preview.png"
            alt="Imagen del spa"
            className="w-3/4 h-auto md:w-2/3"
          />
        </div>
      </div>
      <div className="pt-8 text-gray-800 bg-AntiFlashWhite">
        <div className="container px-4 mx-auto">
          <h2 className="text-2xl font-bold text-center md:text-3xl">
            Conoce a Nuestro Equipo
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <img
                src="/miembros/miembro-mujer.jpg"
                alt="foto-miembro"
                className="object-cover w-full h-40 rounded-t-lg aspect-w-3 aspect-h-2"
              />
              <h3 className="mt-4 text-lg font-semibold md:text-xl">
                Valeria Martínez
              </h3>
              <p className="text-gray-600">
                Especialista en Tratamientos Faciales y Corporales
              </p>
              <p className="mt-2 text-sm md:text-base">
                Valeria ofrece tratamientos faciales y corporales personalizados
                para rejuvenecer y mejorar la textura de la piel. Su experiencia
                incluye peelings químicos y reducción de celulitis.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <img
                src="/miembros/miembro-mujer2.jpg"
                alt="foto-miembro"
                className="object-cover w-full h-40 rounded-t-lg aspect-w-3 aspect-h-2"
              />
              <h3 className="mt-4 text-lg font-semibold md:text-xl">
                Ana García
              </h3>
              <p className="text-gray-600">
                Esteticista y Maquilladora Profesional
              </p>
              <p className="mt-2 text-sm md:text-base">
                Ana se especializa en maquillaje para eventos, tratamientos de
                belleza y cuidado de la piel. Realza la belleza natural con
                servicios como depilación, diseño de cejas y tintura de
                pestañas.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <img
                src="/miembros/miembro-hombre.jpeg"
                alt="foto-miembro"
                className="object-cover w-full h-40 rounded-t-lg aspect-w-3 aspect-h-2"
              />
              <h3 className="mt-4 text-lg font-semibold md:text-xl">
                Carlos Suárez
              </h3>
              <p className="text-gray-600">Masajista Terapéutica</p>
              <p className="mt-2 text-sm md:text-base">
                Carlos ofrece masajes relajantes y terapéuticos para aliviar
                tensiones y mejorar el bienestar general. Su enfoque
                personalizado combina técnicas de masoterapia y aromaterapia.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
