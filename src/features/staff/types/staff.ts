export interface Employee {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  role: string;
  status: "active" | "suspended";
  avatar_color: string;
  last_login: string;
  joined_at: string;
  pin: string;
}

export interface ActivityLog {
  id: string;
  operator: string;
  role: string;
  action: string;
  details: string;
  timestamp: string;
  ipAddress: string;
}

export interface RoleData {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  permissions: string[];
}
