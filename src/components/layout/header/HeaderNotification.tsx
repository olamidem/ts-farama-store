import { Bell } from "lucide-react";

export const HeaderNotification = () => {
  return (
    <div className="relative p-2 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-100 cursor-pointer transition">
      <Bell size={16} className="text-slate-600" />
      <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-rose-500 text-[9px] font-extrabold text-white ring-2 ring-white animate-pulse">
        3
      </span>
    </div>
  );
};
