import type { Permission } from "../types/permission";
import type {  Profile } from "../types/profile";

export function extractPermissions(profile: Profile): Permission[] {
  return (
    profile.role?.role_permissions?.flatMap((rp) =>
      rp.permission ? [rp.permission] : [],
    ) ?? []
  );
}

export function hasPermission(
  permissions: Permission[],
  code: string,
): boolean {
  return permissions.some((permission) => permission.code === code);
}
