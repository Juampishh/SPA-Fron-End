import toast from "react-hot-toast";
import { GetServices } from "../API/Services";
import { useEffect, useState } from "react";
import { Service } from "../Types/Services";
export const useServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const fetchServices = async () => {
    const response = await GetServices();
    if (response.code === 200) {
      setServices(response.data);
    } else {
      toast.error(response.message);
    }
  };
  useEffect(() => {
    fetchServices();
  }, []);
  return { services };
};
