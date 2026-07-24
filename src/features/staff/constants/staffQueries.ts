export const ROLE_SELECT = `
  id,
  name,
  description,
  role_permissions (
    permission:permissions (
      code
    )
  )
`;

export const EMPLOYEE_SELECT = `
  id,
  full_name,
  email,
  phone,
  role_id,
  avatar_url,
  avatar_color,
  status,
  pin_hash,
  last_login,
  created_at,
  updated_at,
  role:roles (
    id,
    name,
    description
  )
`;

export const AUDIT_LOG_SELECT = `
  id,
  operator_id,
  operator_name,
  role,
  action,
  details,
  ip_address,
  created_at
`;