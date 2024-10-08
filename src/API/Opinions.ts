import { FetchApi } from "./Common";

export const GetOpinions = async () => {
  const response = await FetchApi({
    path: "opinions",
    method: "GET",
  });
  return response;
};

export const CreateOpinion = async (data: {
  name: string;
  opinion: string;
  rating: number;
}) => {
  const response = await FetchApi({
    path: "opinions",
    method: "POST",
    payload: data,
  });
  return response;
};
