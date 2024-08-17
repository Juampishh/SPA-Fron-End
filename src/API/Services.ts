import { FetchApi } from "./Common";

export const GetServices = async (category?: string) => {
  if (!category) {
    category = "all";
  }
  const response = await FetchApi({
    path: "services",
    method: "GET",
    payload: {
      category: category,
    },
  });
  return response;
};
