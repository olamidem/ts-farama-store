import { supabase } from "../../../api/supabase";
import type { Employee, ActivityLog, RoleData } from "../types/staff";
import { USER_STATUS } from "../../auth/types/enums";
import {
  ROLE_SELECT,
  EMPLOYEE_SELECT,
  AUDIT_LOG_SELECT,
} from "../constants/staffQueries";
import type {
  EmployeeQueryResult,
  RoleQueryResult,
  AuditLogQueryResult,
  CreateActivityLogDto,
} from "../types/staff-query.types";

const getRoles = async (): Promise<RoleData[]> => {
  const { data, error } = await supabase.from("roles").select(ROLE_SELECT)

  if (error) {
    throw new Error(error.message);
  }

  const roles = (data ?? []) as unknown as RoleQueryResult[];

  return roles.map((role) => ({
    id: role.id,
    name: role.name,
    description: role.description,
    member_count: 0,
    permissions:
      role.role_permissions
        ?.map((rp) => rp.permission?.code)
        .filter(Boolean) as string[],
  }));
};

const getEmployees = async (): Promise<Employee[]> => {
  const { data, error } = await supabase
    .from("profiles")
    .select(EMPLOYEE_SELECT)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  const employees = (data ?? []) as unknown as EmployeeQueryResult[];
  return employees.map((employee) => {
    const roleData = Array.isArray(employee.role)
      ? employee.role[0]
      : employee.role;

    return {
      id: employee.id,
      full_name: employee.full_name ?? "",
      email: employee.email ?? "",
      phone: employee.phone ?? "",
      role: roleData ? roleData.name : "Unassigned",
      status: (employee.status as Employee["status"]) ?? USER_STATUS.ACTIVE,
      avatar_color: employee.avatar_color ?? "#3b82f6",
      avatar_url: employee.avatar_url ?? "",
      last_login: employee.last_login ?? "",
      created_at: employee.created_at ?? "",
      updated_at: employee.updated_at ?? "",
      pin_hash: employee.pin_hash ?? "",
    };
  });
};

interface CreateEmployeeDto {
  full_name: string;
  email: string;
  phone: string;
  role_id: string;
  status: Employee["status"];
  avatar_color: string | null;
  avatar_url: string | null;
  pin_hash: string;
}

const createEmployee = async (
  payload: CreateEmployeeDto,
): Promise<Employee> => {
  const { data, error } = await supabase
    .from("profiles")
    .insert(payload)
    .select(EMPLOYEE_SELECT)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  const employee = data as unknown as EmployeeQueryResult;
  const roleData = Array.isArray(employee.role)
    ? employee.role[0]
    : employee.role;

  return {
    id: employee.id,
    full_name: employee.full_name ?? "",
    email: employee.email ?? "",
    phone: employee.phone ?? "",
    role: roleData ? roleData.name : "Unassigned",
    status: (employee.status as Employee["status"]) ?? USER_STATUS.ACTIVE,
    avatar_color: employee.avatar_color ?? "#3b82f6",
    avatar_url: employee.avatar_url ?? "",
    last_login: employee.last_login ?? "",
    created_at: employee.created_at ?? "",
    updated_at: employee.updated_at ?? "",
    pin_hash: employee.pin_hash ?? "",
  };
};

interface UpdateEmployeeDto {
  full_name?: string;
  email?: string;
  phone?: string;
  role_id?: string;
  status?: Employee["status"];
  avatar_color?: string | null;
  avatar_url?: string | null;
  pin_hash?: string | null;
}

const updateEmployee = async (
  id: string,
  updates: UpdateEmployeeDto,
): Promise<Employee> => {
  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", id)
    .select(EMPLOYEE_SELECT)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  const employee = data as unknown as EmployeeQueryResult;
  const roleData = Array.isArray(employee.role)
    ? employee.role[0]
    : employee.role;

  return {
    id: employee.id,
    full_name: employee.full_name ?? "",
    email: employee.email ?? "",
    phone: employee.phone ?? "",
    role: roleData ? roleData.name : "Unassigned",
    status: (employee.status as Employee["status"]) ?? USER_STATUS.ACTIVE,
    avatar_color: employee.avatar_color ?? "#3b82f6",
    avatar_url: employee.avatar_url ?? "",
    last_login: employee.last_login ?? "",
    created_at: employee.created_at ?? "",
    updated_at: employee.updated_at ?? "",
    pin_hash: employee.pin_hash ?? "",
  };
};

const deleteEmployee = async (id: string): Promise<void> => {
  const { error } = await supabase.from("profiles").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
};

const getLogs = async (): Promise<ActivityLog[]> => {
  const { data, error } = await supabase
    .from("audit_logs")
    .select(AUDIT_LOG_SELECT)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  const logs = (data ?? []) as unknown as AuditLogQueryResult[];

  return logs.map((log) => ({
    id: log.id,
    operator_id: log.operator_id ?? "",
    operator_name: log.operator_name ?? "System",
    operator: log.operator_name ?? "System", // Kept for UI compatibility if needed
    role: log.role ?? "Unknown",
    action: log.action ?? "",
    details: log.details ?? "",
    ip_address: log.ip_address,
    ipAddress: log.ip_address ?? "", // Kept for UI compatibility if needed
    created_at: log.created_at ?? "",
    timestamp: log.created_at ?? "", // Kept for UI compatibility if needed
  }));
};

const logActivity = async (payload: CreateActivityLogDto): Promise<void> => {
  const { error } = await supabase.from("audit_logs").insert({
    operator_id: payload.operator_id,
    operator_name: payload.operator_name,
    role: payload.role,
    action: payload.action,
    details: payload.details,
    ip_address: payload.ip_address,
  });

  if (error) {
    throw new Error(error.message);
  }
};

export const staffService = {
  getRoles,
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getLogs,
  logActivity,
};

export default staffService;