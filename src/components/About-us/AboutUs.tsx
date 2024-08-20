import { NavbarComponent } from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const AboutUs = () => {
  return (
    <div>
        <NavbarComponent />
        <div class="flex flex-col md:flex-row h-screen">
            <div class="flex-1 flex items-center justify-center p-8 bg-gray-100">
                <div>
                    <h1 class="text-4xl font-bold mb-4">Sobre Nosotros</h1>
                    <p class="text-lg">
                        Bienvenidos a nuestro centro de spa, un lugar de relajación y renovación. Nos dedicamos a ofrecer experiencias personalizadas para el bienestar de nuestros clientes. Nuestro spa abrió sus puertas en 2022 con la misión de ofrecer un oasis de tranquilidad y bienestar a nuestros clientes. Desde el principio, hemos trabajado para crear un espacio donde el cuerpo, la mente y el espíritu puedan encontrar un equilibrio perfecto.
                    </p>
                    <br />
                    <p class="text-lg">
                    Buscamos ser reconocidos como el spa líder en Resistencia, innovando continuamente en el bienestar y cuidado personal para proporcionar experiencias excepcionales a nuestros clientes.
                    </p>
                </div>
            </div>
            <div class="flex-1 flex items-center justify-center bg-white">
                <img src="/public/Logo.jpeg" alt="Imagen del spa" class="w-3/4 h-auto md:w-2/3"/>
            </div>
        </div>
        <div class="text-gray-800 bg-gray-100 pt-8">
            <div class="container mx-auto px-4">
                <h2 class="text-3xl font-bold mb-8 text-center">Conoce a Nuestro Equipo</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="bg-white p-6 rounded-lg shadow-lg">
                        <img src="/public/miembros/miembro-mujer.jpg" alt="foto-miembro" class="w-full h-40 object-cover rounded-t-lg"/>
                        <h3 class="text-xl font-semibold mt-4">Nombre Apellido</h3>
                        <p class="text-gray-600">Especialidad</p>
                        <p class="mt-2">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque animi pariatur incidunt accusantium quis dolore, exercitationem recusandae enim eveniet reiciendis facilis odio officiis perspiciatis ad id delectus? Illo, voluptatum placeat!
                        </p>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow-lg">
                        <img src="/public/miembros/miembro-mujer.jpg" alt="foto-miembro" class="w-full h-40 object-cover rounded-t-lg"/>
                        <h3 class="text-xl font-semibold mt-4">Nombre Apellido</h3>
                        <p class="text-gray-600">Especialidad</p>
                        <p class="mt-2">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium quibusdam nam autem veritatis dolorem reiciendis ipsum, facilis sit id rerum animi error molestiae at atque blanditiis cupiditate assumenda officia mollitia?
                        </p>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow-lg">
                        <img src="/public/miembros/miembro-mujer.jpg" alt="foto-miembro" class="w-full h-40 object-cover rounded-t-lg"/>
                        <h3 class="text-xl font-semibold mt-4">Nombre Apellido</h3>
                        <p class="text-gray-600">Especialidad</p>
                        <p class="mt-2">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam rerum quos, molestiae odio aliquid, ratione aut molestias blanditiis in maiores deleniti harum, dolores non id sint officiis eum laudantium necessitatibus.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
  );
}   

export default AboutUs;