import { FetchApi } from "./Common";
import { UpdateUserType } from "../Types/User";
import toast from "react-hot-toast";
export const UpdateUser = async (id: number, data: UpdateUserType) => {
  const response = await FetchApi({
    path: `users/${id}`,
    method: "PUT",
    payload: {
      ...data,
    },
  });
  if (response.code === 200) {
    toast.success("Perfil actualizado correctamente");
  } else {
    toast.error("Error al actualizar el perfil");
  }
  return response;
};
