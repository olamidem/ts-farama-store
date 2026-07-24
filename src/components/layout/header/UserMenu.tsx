import { Link } from "@tanstack/react-router";
import { User, Key, Sliders, Lock, LogOut } from "lucide-react";

interface UserMenuProps {
  profileName?: string;
  userEmail?: string;
  onClose: () => void;
  onLockScreen: () => void;
  onLogout: () => void;
}

export const UserMenu = ({
  profileName,
  userEmail,
  onClose,
  onLockScreen,
  onLogout,
}: UserMenuProps) => {
  return (
    <div className="absolute right-0 mt-2.5 w-60 rounded-2xl border border-slate-100 bg-white p-2 shadow-xl z-50 animate-in fade-in slide-in-from-top-3 duration-200">
      {/* Dropdown Header */}
      <div className="px-3.5 py-3 border-b border-slate-50 mb-1">
        <p className="text-xs font-black text-slate-800 leading-none">
          {profileName}
        </p>
        <p className="text-[10px] font-bold text-slate-400 mt-1 leading-none">
          {userEmail}
        </p>
      </div>

      {/* Menu Links */}
      <div className="space-y-0.5">
        <Link
          to="/profile"
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition"
        >
          <User size={14} className="text-slate-400" />
          <span>My Profile</span>
        </Link>

        <Link
          to="/profile"
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition"
        >
          <Key size={14} className="text-slate-400" />
          <span>Change PIN</span>
        </Link>

        <Link
          to="/profile"
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition"
        >
          <Sliders size={14} className="text-slate-400" />
          <span>Preferences</span>
        </Link>

        <button
          onClick={onLockScreen}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-amber-600 hover:text-amber-800 hover:bg-amber-50 transition cursor-pointer text-left focus:outline-none"
        >
          <Lock size={14} className="text-amber-500" />
          <span>Lock Screen</span>
        </button>

        <div className="border-t border-slate-50 my-1 pt-1" />

        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-rose-600 hover:text-rose-800 hover:bg-rose-50 transition cursor-pointer text-left focus:outline-none"
        >
          <LogOut size={14} className="text-rose-500" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};
