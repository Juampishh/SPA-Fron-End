import { useNavigate } from "react-router-dom";
import { Login, Register } from "../API/Login";
import { toast } from "react-hot-toast";
import { useUsuario, Usuario } from "../Context/usuarioContex";
import { RegisterType } from "../Types/Register";

export function useLogin() {
  const { setUsuario } = useUsuario();
  const navigate = useNavigate();
  const fetchLogin = async (
    username: string,
    password: string,
    setUser: (user: Usuario) => void
  ) => {
    const response = await Login(username, password);
    if (response.code === 200) {
      setUser(response.data as Usuario);
      const user = response.data as Usuario;
      if (!user) return;
      if (user.type !== "client") {
        navigate("/home");
      } else {
        navigate("/");
      }
      toast.success("Bienvenido a Sentirse Bien");
      localStorage.setItem("usuario", JSON.stringify(response.data));
      return response;
    } else {
      toast.error(response.message);
    }
  };

  const fetchRegister = async (data: RegisterType) => {
    const response = await Register(data);
    if (response.code === 201) {
      await fetchLogin(data.username, data.password, setUsuario);
    } else {
      toast.error(response.message);
    }
  };

  return { fetchLogin, fetchRegister };
}
