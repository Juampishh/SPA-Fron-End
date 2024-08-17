import { FetchApi } from "./Common";
export const GetAppointments = async (id: number) => {
  const response = await FetchApi({
    path: `appointments/${id}`,
    method: "GET",
  });
  return response;
};
