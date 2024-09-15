import { Usuario } from "../Context/usuarioContex";

export interface RegisterType {
  username: string;
  email: string;

  firstName: string;
  lastName: string;
  type: string | undefined;
  password: string;
}
export interface LoginResponse {
  code: number;
  message: string;
  data: Usuario;
}
export interface RegisterResponse {
  code: number;
  message: string;
  data?: Usuario;
}
