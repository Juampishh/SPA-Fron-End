import { Service } from "./Services";
export interface Appointment {
  id: number;
  user_id: number;
  service_id: number;
  appointment_date: string;
  appointment_status: string;
  created_at: string;
  Service: Service;
}
export interface CreateAppointmentType {
  user_id: number;
  service_id: number;
  appointment_date: string;
}
