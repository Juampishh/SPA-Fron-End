import { useState, useCallback } from "react";
import {
  GetAppointments,
  GetAllAppointments,
  CreateAppointment,
} from "../API/Appointments";
import { Appointment, CreateAppointmentType } from "../Types/Appointments";
import { toast } from "react-hot-toast";
import { useUsuario } from "../Context/usuarioContex";

export const useAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { usuario } = useUsuario();
  const id = usuario?.id;

  const fetchAppointmentsData = useCallback(async () => {
    if (!usuario) {
      return;
    }
    setLoading(true);
    try {
      let response;
      if (usuario.type === "admin") {
        // Fetch all appointments if the user is an admin
        response = await GetAllAppointments(id);
      } else {
        // Fetch appointments for the specific user if not an admin
        response = await GetAppointments(id);
      }

      if (response.code === 200) {
        setAppointments(response.data);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Error fetching appointments");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [usuario, id]);

  const fetchCreateAppointment = async (data: CreateAppointmentType) => {
    setLoading(true);
    try {
      const response = await CreateAppointment(data);
      if (response.code === 201) {
        toast.success("Reserva creada correctamente");
      } else {
        toast.error("No se pudo crear la reserva");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    appointments,
    fetchAppointmentsData,
    loading,
    fetchCreateAppointment,
  };
};
