import { supabase } from "@/services/supabase";
import type { Employee } from "@/types/database";
export async function getAllEmployees(): Promise<Employee[]> {
  const { data, error } = await supabase
    .from("employees")
    .select("*")
    .order("name", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Employee[];
}
export async function getEmployeeById(id: string): Promise<Employee> {
  const { data, error } = await supabase
    .from("employees")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data as Employee;
}
export async function updateEmployeeLocation(
  employeeId: string,
  locationId: string | null,
): Promise<Employee> {
  const { data, error } = await supabase
    .from("employees")
    .update({ location_id: locationId })
    .eq("id", employeeId)
    .select("*")
    .single();
  if (error) throw error;
  return data as Employee;
}
export async function updateEmployeeRoaming(
  employeeId: string,
  isRoaming: boolean,
): Promise<Employee> {
  const { data, error } = await supabase
    .from("employees")
    .update({ is_roaming: isRoaming })
    .eq("id", employeeId)
    .select("*")
    .single();
  if (error) throw error;
  return data as Employee;
}
export async function updateEmployeeActive(
  employeeId: string,
  active: boolean,
): Promise<Employee> {
  const { data, error } = await supabase
    .from("employees")
    .update({ active })
    .eq("id", employeeId)
    .select("*")
    .single();
  if (error) throw error;
  return data as Employee;
}
export type EmployeeProfileInput = {
  name: string;
  position: string;
  department: string;
  mobile_number: string;
};
export async function updateEmployee(
  employeeId: string,
  input: EmployeeProfileInput,
): Promise<Employee> {
  const { data, error } = await supabase
    .from("employees")
    .update({
      name: input.name.trim(),
      position: input.position.trim() || null,
      department: input.department.trim() || null,
      mobile_number: input.mobile_number.trim() || null,
    })
    .eq("id", employeeId)
    .select("*")
    .single();
  if (error) throw error;
  return data as Employee;
}
