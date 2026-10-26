import type {
  Employee,
  Task,
  TaskPriority,
  TaskStatus,
} from "@/types/database";
export type { Task, TaskPriority, TaskStatus };
export type TaskWithAssignee = Task & {
  assignee: Pick<Employee, "id" | "name">;
};
export type TaskWithAssigner = Task & {
  assigner: Pick<Employee, "id" | "name"> | null;
};
export type NewTaskInput = {
  title: string;
  description: string;
  assignedTo: string;
  deadline: Date;
  priority: TaskPriority;
};
export function isOverdue(task: Pick<Task, "deadline" | "status">): boolean {
  return (
    task.status !== "done" && new Date(task.deadline).getTime() < Date.now()
  );
}
export type TaskFilterValue = "overdue" | "assigned" | "in_progress" | "done";
export const TASK_FILTER_OPTIONS: {
  value: TaskFilterValue;
  label: string;
}[] = [
  { value: "overdue", label: "Overdue" },
  { value: "assigned", label: "Assigned" },
  { value: "in_progress", label: "In progress" },
  { value: "done", label: "Done" },
];
export function matchesAnyTaskFilter(
  task: Pick<Task, "deadline" | "status">,
  filters: TaskFilterValue[],
): boolean {
  if (filters.length === 0) return true;
  return filters.some((f) =>
    f === "overdue" ? isOverdue(task) : task.status === f,
  );
}
export function sortTasks<
  T extends Pick<Task, "status" | "deadline" | "completed_at">,
>(tasks: T[]): T[] {
  const notDone = tasks.filter((t) => t.status !== "done");
  const done = tasks.filter((t) => t.status === "done");
  notDone.sort((a, b) => {
    const overdueDiff = Number(isOverdue(b)) - Number(isOverdue(a));
    if (overdueDiff !== 0) return overdueDiff;
    return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
  });
  done.sort(
    (a, b) =>
      new Date(b.completed_at ?? b.deadline).getTime() -
      new Date(a.completed_at ?? a.deadline).getTime(),
  );
  return [...notDone, ...done];
}
