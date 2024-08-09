import { RegisterType } from "../Types/Register";
import { FetchApi } from "./Common";

export const Login = async (username: string, password: string) => {
  const response = await FetchApi({
    path: "auth/login",
    method: "POST",
    payload: {
      username: username,
      password: password,
    },
  });
  return response;
};

export const Register = async (data: RegisterType) => {
  const response = await FetchApi({
    path: "auth/register",
    method: "POST",
    payload: {
      ...data,
    },
  });
  return response;
};
