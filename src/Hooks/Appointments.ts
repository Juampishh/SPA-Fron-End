import { useState } from "react";
import { GetAppointments } from "../API/Appointments";
import { Appointment } from "../Types/Appointments";
import { toast } from "react-hot-toast";
import { useUsuario } from "../Context/usuarioContex";
import { useEffect } from "react";
export const useAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const { usuario } = useUsuario();
  const id = usuario.id;
  const fetchAppointments = async (id: number) => {
    if (!usuario) {
      return;
    }
    const response = await GetAppointments(id);
    if (response.code === 200) {
      setAppointments(response.data);
    } else {
      toast.error(response.message);
    }
  };
  useEffect(() => {
    fetchAppointments(id);
  }, []);
  return { appointments, fetchAppointments };
};
