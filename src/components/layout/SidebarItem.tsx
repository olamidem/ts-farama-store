import { Link } from "@tanstack/react-router";
import type { NavigationItem } from "./navigation.types";

const SidebarItem = ({ label, to, icon: Icon }: NavigationItem) => {
  return (
    <Link
      to={to}
      activeProps={{
        className: "bg-blue-50 text-blue-600 font-semibold",
      }}
      inactiveProps={{
        className: "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
      }}
      className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors"
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </Link>
  );
};

export default SidebarItem;
