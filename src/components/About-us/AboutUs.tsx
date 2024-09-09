import { NavbarComponent } from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const AboutUs = () => {
  return (
    <div>
      <NavbarComponent />
      <div className="flex flex-col h-screen md:flex-row">
        <div className="flex items-center justify-center flex-1 p-8 bg-gray-100">
          <div>
            <h1 className="mb-4 text-4xl font-bold">Sobre Nosotros</h1>
            <p className="text-lg">
              Bienvenidos a nuestro centro de spa, un lugar de relajación y
              renovación. Nos dedicamos a ofrecer experiencias personalizadas
              para el bienestar de nuestros clientes. Nuestro spa abrió sus
              puertas en 2022 con la misión de ofrecer un oasis de tranquilidad
              y bienestar a nuestros clientes. Desde el principio, hemos
              trabajado para crear un espacio donde el cuerpo, la mente y el
              espíritu puedan encontrar un equilibrio perfecto.
            </p>
            <br />
            <p className="text-lg">
              Buscamos ser reconocidos como el spa líder en Resistencia,
              innovando continuamente en el bienestar y cuidado personal para
              proporcionar experiencias excepcionales a nuestros clientes.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center flex-1 bg-white">
          <img
            src="/public/Logo.jpeg"
            alt="Imagen del spa"
            className="w-3/4 h-auto md:w-2/3"
          />
        </div>
      </div>
      <div className="pt-8 text-gray-800 bg-gray-100">
        <div className="container px-4 mx-auto">
          <h2 className="mb-8 text-3xl font-bold text-center">
            Conoce a Nuestro Equipo
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <img
                src="/public/miembros/miembro-mujer.jpg"
                alt="foto-miembro"
                className="object-cover w-full h-40 rounded-t-lg"
              />
              <h3 className="mt-4 text-xl font-semibold">Nombre Apellido</h3>
              <p className="text-gray-600">Especialidad</p>
              <p className="mt-2">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque
                animi pariatur incidunt accusantium quis dolore, exercitationem
                recusandae enim eveniet reiciendis facilis odio officiis
                perspiciatis ad id delectus? Illo, voluptatum placeat!
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <img
                src="/public/miembros/miembro-mujer.jpg"
                alt="foto-miembro"
                className="object-cover w-full h-40 rounded-t-lg"
              />
              <h3 className="mt-4 text-xl font-semibold">Nombre Apellido</h3>
              <p className="text-gray-600">Especialidad</p>
              <p className="mt-2">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Accusantium quibusdam nam autem veritatis dolorem reiciendis
                ipsum, facilis sit id rerum animi error molestiae at atque
                blanditiis cupiditate assumenda officia mollitia?
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <img
                src="/public/miembros/miembro-mujer.jpg"
                alt="foto-miembro"
                className="object-cover w-full h-40 rounded-t-lg"
              />
              <h3 className="mt-4 text-xl font-semibold">Nombre Apellido</h3>
              <p className="text-gray-600">Especialidad</p>
              <p className="mt-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
                rerum quos, molestiae odio aliquid, ratione aut molestias
                blanditiis in maiores deleniti harum, dolores non id sint
                officiis eum laudantium necessitatibus.
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
