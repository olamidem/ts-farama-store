import type { RoleName } from "./enums";

export interface Permission {
  id: string;
  module: string;
  action: string;
  code: string;
}

export interface RolePermission {
  role_id: string;
  permission_id: string;
  permission?: Permission;
}

export interface Role {
  id: string;
  name: RoleName;
  description: string | null;
  level: number;
  created_at?: string;
  role_permissions?: RolePermission[];
}