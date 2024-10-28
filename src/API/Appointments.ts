import { CreateAppointmentType } from "../Types/Appointments";
import { FetchApi } from "./Common";
export const GetAppointments = async (id: number) => {
  const response = await FetchApi({
    path: `appointments/${id}`,
    method: "GET",
  });
  return response;
};

export const GetAllAppointments = async (id: number, userType: string) => {
  const response = await FetchApi({
    path: `appointments/all/${id}`,
    method: "GET",
    payload: {
      userType: userType,
    },
  });
  return response;
};
export const CreateAppointment = async (data: CreateAppointmentType) => {
  const response = await FetchApi({
    path: "appointments/",
    method: "POST",
    payload: data,
  });
  return response;
};
