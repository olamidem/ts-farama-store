import { useLocation } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useAuthStore } from "../../../store/authStore";

interface HeaderProps {
  onMenuToggle?: () => void;
}

const Header = ({ onMenuToggle }: HeaderProps) => {
  const user = useAuthStore((state) => state.user);
  const profile = useAuthStore((state) => state.profile);
  const location = useLocation();

  const userName =
    profile?.full_name ||
    (user?.user_metadata as Record<string, string>)?.full_name ||
    user?.email ||
    "User";

  const userRole = profile?.role?.name || "Staff";

  const initials =
    userName
      ?.split(" ")
      .map((word: string) => word[0])
      .join("")
      .toUpperCase() || "?";

  // Dynamic Title based on Pathname
  let title = "Dashboard";
  let subtitle = "Welcome back 👋";

  const path = location.pathname;
  if (path.startsWith("/products")) {
    title = "Products & Catalog";
    subtitle = "Manage your products, variant units, and pricing";
  } else if (path.startsWith("/categories")) {
    title = "Categories";
    subtitle = "Organize your inventory with high-fidelity classifications";
  } else if (path.startsWith("/units")) {
    title = "Units of Measure";
    subtitle = "Define conversions, base weights, and measurements";
  }

  return (
    <header className="flex h-22.5 items-center justify-between border-b border-slate-100 bg-white px-4 md:px-8 shrink-0">
      {/* Page Title & Hamburger */}
      <div className="flex items-center gap-3">
        {onMenuToggle && (
          <button
            id="mobile-menu-toggle"
            type="button"
            onClick={onMenuToggle}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 lg:hidden cursor-pointer shrink-0"
            aria-label="Toggle Sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}
        <div>
          <h1 className="text-base md:text-2xl font-bold text-slate-900 leading-tight">
            {title}
          </h1>
          <p className="hidden md:block text-xs text-slate-500 mt-0.5">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Current User */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
          {initials}
        </div>

        <div className="text-right hidden sm:block">
          <p className="font-semibold text-slate-900 text-sm leading-tight">
            {userName}
          </p>
          <p className="text-xs text-slate-500 capitalize mt-0.5">{userRole}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
