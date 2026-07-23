import { User, Lock, Settings, LogOut } from "lucide-react";

interface UserMenuProps {
  onProfile: () => void;
  onLock: () => void;
  onSettings?: () => void;
  onLogout: () => void;
}

const UserMenu = ({
  onProfile,
  onLock,
  onSettings,
  onLogout,
}: UserMenuProps) => {
  return (
    <div className="w-64 rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden">
      <button
        onClick={onProfile}
        className="flex w-full items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition cursor-pointer"
      >
        <User size={18} />
        <span>My Profile</span>
      </button>

      <button
        onClick={onLock}
        className="flex w-full items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition cursor-pointer"
      >
        <Lock size={18} />
        <span>Lock Screen</span>
      </button>

      <button
        onClick={onSettings}
        disabled
        className="flex w-full items-center gap-3 px-4 py-3 text-sm text-slate-400 cursor-not-allowed"
      >
        <Settings size={18} />
        <span>Settings</span>

        <span className="ml-auto rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase">
          Soon
        </span>
      </button>

      <div className="my-1 border-t border-slate-200" />

      <button
        onClick={onLogout}
        className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition cursor-pointer"
      >
        <LogOut size={18} />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default UserMenu;
