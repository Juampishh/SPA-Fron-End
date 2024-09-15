import { useState, useCallback } from "react";
import { GetOpinions } from "../API/Opinions";
import { toast } from "react-hot-toast";
import { Opinion } from "../Types/Opinion";

export const useOpinions = () => {
  const [opinions, setOpinions] = useState<Opinion[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchOpinionsData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await GetOpinions();
      if (response.code === 200) {
        setOpinions(response.data as Opinion[]);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Error fetching opinions");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    opinions,
    fetchOpinionsData,
  };
};
