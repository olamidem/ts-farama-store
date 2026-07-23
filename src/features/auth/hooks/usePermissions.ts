import { useAuthStore } from "../store/authStore";

export const usePermissions = () => {
  const permissions = useAuthStore((state) => state.permissions);
  const profile = useAuthStore((state) => state.profile);

  const can = (code: string): boolean => {
    if (!profile) return false;
    const roleName = profile.role?.name?.toLowerCase() || "";
    // Super admins always bypass permission checks
    if (roleName === "super admin" || roleName === "super_admin") {
      return true;
    }
    return permissions.includes(code);
  };

  const hasRole = (role: string): boolean => {
    if (!profile || !profile.role) return false;
    const roleName = profile.role.name || "";
    return roleName.toLowerCase() === role.toLowerCase();
  };

  return {
    permissions,
    can,
    hasRole,
    role: profile?.role,
    profile,
  };
};
export default usePermissions;
