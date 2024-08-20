import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="py-6 text-gray-200 bg-AntiFlashWhite">
      <div className="container flex flex-col items-center px-6 mx-auto md:px-12 md:flex-row md:justify-between">
        <div className="flex gap-3 mb-6 text-center md:mb-0 md:text-left">
          <img className="h-14 w-15" src="/Logo-removebg-preview.png" alt="" />
          <div>
            <h2 className="text-2xl font-bold text-[#E91E63] mb-2">
              Sentirse Bien
            </h2>
            <p className="text-sm text-gray-400">
              © 2024 Todos los derechos reservados.
            </p>
          </div>
        </div>

        <div className="flex flex-col w-full md:w-1/2 md:items-end">
          <iframe
            title="Ubicación"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093743!2d144.9537353153168!3d-37.8162792797517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5774e6f5a3b9d1d!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1603086219011!5m2!1sen!2sau"
            width="100%"
            height="200"
            frameBorder="0"
            style={{ border: 0, borderRadius: "8px" }}
            allowFullScreen={false}
            aria-hidden="false"
            tabIndex={0}
          ></iframe>
        </div>

        <div className="flex flex-col items-center mt-6 md:mt-0 md:items-start">
          <h3 className="text-lg font-semibold text-[#E91E63] mb-4">
            Redes sociales
          </h3>
          <ul className="flex space-x-6">
            <li>
              <a
                href="#"
                className="text-green-400 hover:text-[#E91E63] transition duration-300"
              >
                <FaFacebook size={28} />
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-green-400 hover:text-[#E91E63] transition duration-300"
              >
                <FaTwitter size={28} />
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-green-400 hover:text-[#E91E63] transition duration-300"
              >
                <FaInstagram size={28} />
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-green-400 hover:text-[#E91E63] transition duration-300"
              >
                <FaLinkedin size={28} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
