import type { Employee, LeaveRequest, LeaveType } from "@/types/database";
export type { LeaveRequest, LeaveType };
export const LEAVE_TYPE_LABELS: Record<LeaveType, string> = {
  vacation: "Vacation",
  sick: "Sick leave",
  emergency: "Emergency",
  other: "Other",
};
export type LeaveRequestWithEmployee = LeaveRequest & {
  employees: Pick<Employee, "id" | "name">;
};
export type NewLeaveRequestInput = {
  leaveType: LeaveType;
  startDate: Date;
  endDate: Date;
  reason: string;
  attachmentPath?: string | null;
  locationLat?: number | null;
  locationLng?: number | null;
  locationAddress?: string | null;
};
export type LeaveBalance = {
  allotted: number;
  used: number;
  remaining: number;
};
