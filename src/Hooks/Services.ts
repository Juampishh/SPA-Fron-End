import toast from "react-hot-toast";
import { GetServices } from "../API/Services";
import { useEffect, useState } from "react";
import { Service } from "../Types/Services";
export const useServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const fetchServices = async () => {
    setLoading(true);
    const response = await GetServices();
    setLoading(false);
    if (response.code === 200) {
      setServices(response.data);
    } else {
      toast.error(response.message);
    }
  };
  useEffect(() => {
    fetchServices();
  }, []);
  return { services, loading };
};
