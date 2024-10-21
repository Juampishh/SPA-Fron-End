import { FetchApi } from "./Common";

interface EmployeeType {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  type: string;
}
export const CreateEmployee = async (data: EmployeeType) => {
  const response = await FetchApi({
    path: "users",
    method: "POST",
    payload: data,
  });
  return response;
};
