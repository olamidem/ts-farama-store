import type { ReactNode } from "react";
import { usePermissions } from "../hooks/usePermissions";
import { AlertTriangle } from "lucide-react";

interface PermissionGuardProps {
  permission: string;
  fallback?: ReactNode;
  children: ReactNode;
}

export const PermissionGuard = ({
  permission,
  fallback,
  children,
}: PermissionGuardProps) => {
  const { can } = usePermissions();

  if (!can(permission)) {
    if (fallback !== undefined) {
      return <>{fallback}</>;
    }

    return (
      <div className="flex flex-col items-center justify-center p-8 rounded-2xl border border-slate-100 bg-white shadow-xs max-w-md mx-auto text-center space-y-4 my-6">
        <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl border border-rose-100 shadow-sm">
          <AlertTriangle size={32} />
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
            Access Restricted
          </h3>
          <p className="text-xs font-semibold text-slate-400">
            Your current security profile does not grant authorization for the
            <code className="mx-1 font-mono text-[10px] text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100">
              {permission}
            </code>
            capability.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default PermissionGuard;
