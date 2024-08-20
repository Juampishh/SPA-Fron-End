export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  type: string;
  created_at: string;
  updated_at: string;
};
export type UpdateUserType = {
  name: string;
  email: string;
  password: string;
};
