import type { Role } from "../../auth/types/permission";
import type { UserStatus } from "../../auth/types/enums";

export interface Employee {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  role: Role | null;
  status: UserStatus;
  avatar_color: string | null;
  avatar_url: string | null;
  last_login: string | null;
  created_at: string;
  updated_at: string;
  pin_hash: string | null;
}

export interface ActivityLog {
  id: string;
  operator_id: string;
  operator_name: string;
  role: string;
  action: string;
  details: string;
  ip_address: string | null;
  created_at: string;
}

export interface RoleData {
  id: string;
  name: string;
  description: string | null;
  member_count: number;
  permissions: string[];
}
