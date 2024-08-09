import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="py-4 text-gray-800 bg-gray-100">
      <div className="container flex flex-col items-center justify-between mx-auto md:flex-row">
        <div className="mb-4 md:mb-0">
          <h2 className="text-lg font-bold text-[#E91E63]">Sentirse Bien</h2>
          <p className="text-sm">© 2024 Todos los derechos reservados.</p>
        </div>
      </div>
      <div className="flex flex-col w-full mt-4 md:flex-row">
        <div className="w-full ml-10 md:w-1/2">
          <iframe
            title="Ubicación"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093743!2d144.9537353153168!3d-37.8162792797517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5774e6f5a3b9d1d!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1603086219011!5m2!1sen!2sau"
            width="100%"
            height="200"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen={false}
            aria-hidden="false"
            tabIndex={0}
          ></iframe>
        </div>
        <div className="flex flex-col items-center justify-center w-full md:w-1/2">
          <h3 className="text-lg font-bold mb-2 text-[#E91E63]">Síguenos en</h3>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="text-[#8BC34A] hover:text-[#E91E63]">
                <FaFacebook size={24} />
              </a>
            </li>
            <li>
              <a href="#" className="text-[#8BC34A] hover:text-[#E91E63]">
                <FaTwitter size={24} />
              </a>
            </li>
            <li>
              <a href="#" className="text-[#8BC34A] hover:text-[#E91E63]">
                <FaInstagram size={24} />
              </a>
            </li>
            <li>
              <a href="#" className="text-[#8BC34A] hover:text-[#E91E63]">
                <FaLinkedin size={24} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
