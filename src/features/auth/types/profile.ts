/**
 * Permission record from the permissions table
 */
export interface Permission {
  id: string;
  module: string;
  action: string;
  code: string;
}

/**
 * Join record linking a role to a permission
 */
export interface RolePermission {
  permission: Permission | null;
}

/**
 * Role record from the roles table
 */
export interface Role {
  id: string;
  name: string;
  description: string | null;
  role_permissions: RolePermission[];
}

/**
 * User profile from the profiles table, with nested role & permissions
 */
export interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  avatar_url: string | null;
  avatar_color: string | null;
  status: string | null;
  role_id: string | null;
  pin_hash: string | null;
  created_at: string;
  updated_at: string;
  role: Role | null;
}
