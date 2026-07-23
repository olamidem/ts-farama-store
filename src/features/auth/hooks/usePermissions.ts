import { useAuthStore } from "../store/authStore";

export const usePermissions = () => {
  const permissions = useAuthStore((state) => state.permissions);
  const profile = useAuthStore((state) => state.profile);

  const can = (code: string): boolean => {
    if (!profile) return false;

    // Super Admin / Administrator bypass
    if ((profile.role?.level ?? 0) >= 90) {
      return true;
    }

    return permissions.some((permission) => permission.code === code);
  };

  const hasRole = (role: string): boolean => {
    if (!profile?.role) return false;

    return profile.role.name.toLowerCase() === role.toLowerCase();
  };

  const hasLevel = (level: number): boolean => {
    return (profile?.role?.level ?? 0) >= level;
  };

  return {
    profile,
    role: profile?.role,
    permissions,

    can,
    hasRole,
    hasLevel,
  };
};

export default usePermissions;
