import { useState } from "react";
import { GetAppointments, GetAllAppointments } from "../API/Appointments";
import { Appointment } from "../Types/Appointments";
import { toast } from "react-hot-toast";
import { useUsuario } from "../Context/usuarioContex";
import { useEffect } from "react";
export const useAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { usuario } = useUsuario();
  const id = usuario.id;
  const fetchAppointments = async (id: number) => {
    if (!usuario) {
      return;
    }
    setLoading(true);
    const response = await GetAppointments(id);
    setLoading(false);
    if (response.code === 200) {
      setAppointments(response.data);
    } else {
      toast.error(response.message);
    }
  };
  const fetchAllAppointments = async () => {
    setLoading(true);
    const response = await GetAllAppointments(id);
    setLoading(false);
    console.log(response);

    if (response.code === 200) {
      setAppointments(response.data);
    } else {
      toast.error(response.message);
    }
  };

  useEffect(() => {
    if (usuario.type === "admin") {
      fetchAllAppointments();
    } else {
      fetchAppointments(id);
    }
  }, []);
  return { appointments, fetchAppointments, loading, fetchAllAppointments };
};
