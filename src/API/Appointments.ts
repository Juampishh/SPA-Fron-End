import { FetchApi } from "./Common";
export const GetAppointments = async (id: number) => {
  const response = await FetchApi({
    path: `appointments/${id}`,
    method: "GET",
  });
  return response;
};
export const GetAllAppointments = async (id: number) => {
  const response = await FetchApi({
    path: `appointments/all/${id}`,
    method: "GET",
  });

  return response;
};
