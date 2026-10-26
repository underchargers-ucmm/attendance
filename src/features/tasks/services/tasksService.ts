import { supabase } from "@/services/supabase";
import type { Task, TaskPriority, TaskStatus } from "@/types/database";
import type {
  NewTaskInput,
  TaskWithAssignee,
  TaskWithAssigner,
} from "../types";
export async function getMyTasks(
  employeeId: string,
): Promise<TaskWithAssigner[]> {
  const { data, error } = await supabase
    .from("tasks")
    .select("*, assigner:employees!tasks_assigned_by_fkey(id, name)")
    .eq("assigned_to", employeeId)
    .order("deadline", { ascending: true });
  if (error) throw error;
  return (data ?? []) as unknown as TaskWithAssigner[];
}
export async function getAllTasks(): Promise<TaskWithAssignee[]> {
  const { data, error } = await supabase
    .from("tasks")
    .select("*, assignee:employees!tasks_assigned_to_fkey(id, name)")
    .order("deadline", { ascending: true });
  if (error) throw error;
  return (data ?? []) as unknown as TaskWithAssignee[];
}
export async function createTask(
  input: NewTaskInput,
  assignedBy: string,
): Promise<Task> {
  const { data, error } = await supabase
    .from("tasks")
    .insert({
      title: input.title,
      description: input.description || null,
      assigned_to: input.assignedTo,
      assigned_by: assignedBy,
      deadline: input.deadline.toISOString(),
      priority: input.priority,
    })
    .select("*")
    .single();
  if (error) throw error;
  return data as Task;
}
export async function updateTaskStatus(
  taskId: string,
  status: TaskStatus,
): Promise<Task> {
  const { data, error } = await supabase
    .from("tasks")
    .update({
      status,
      completed_at: status === "done" ? new Date().toISOString() : null,
    })
    .eq("id", taskId)
    .select("*")
    .single();
  if (error) throw error;
  return data as Task;
}
export type TaskEditInput = {
  title: string;
  description: string;
  deadline: Date;
  priority: TaskPriority;
};
export async function updateTask(
  taskId: string,
  input: TaskEditInput,
): Promise<Task> {
  const { data, error } = await supabase
    .from("tasks")
    .update({
      title: input.title,
      description: input.description || null,
      deadline: input.deadline.toISOString(),
      priority: input.priority,
    })
    .eq("id", taskId)
    .select("*")
    .single();
  if (error) throw error;
  return data as Task;
}
export async function deleteTask(taskId: string): Promise<void> {
  const { error } = await supabase.from("tasks").delete().eq("id", taskId);
  if (error) throw error;
}
export async function reassignTask(
  taskId: string,
  newAssignedTo: string,
): Promise<Task> {
  const { data, error } = await supabase
    .from("tasks")
    .update({ assigned_to: newAssignedTo })
    .eq("id", taskId)
    .select("*")
    .single();
  if (error) throw error;
  return data as Task;
}
