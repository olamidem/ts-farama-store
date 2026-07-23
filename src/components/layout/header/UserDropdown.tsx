import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import UserAvatar from "./UserAvatar";
import UserMenu from "./UserMenu";
import useAuthStore from "../../../store/authStore";
import useLogout from "../../../features/auth/hooks/useLogout";


const UserDropdown = () => {
  const navigate = useNavigate();
  const profile = useAuthStore((state) => state.profile);
  const setLocked = useAuthStore((state) => state.setLocked);

  const logoutMutation = useLogout();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleProfile = () => {
    setOpen(false);
    navigate({
      to: "/profile",
    });
  };

  const handleLock = () => {
    setLocked(true);
    setOpen(false);
    navigate({
      to: "/lock-screen",
    });
  };

  const handleLogout = () => {
    setOpen(false);
    logoutMutation.mutate();
  };

  return (
    <div
      ref={dropdownRef}
      className="relative"
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-slate-100 transition cursor-pointer"
      >
        <UserAvatar
          profile={profile}
          size="sm"
        />

        <div className="hidden md:flex flex-col items-start">
          <span className="text-sm font-semibold text-slate-700">
            {profile?.full_name}
          </span>
          <span className="text-xs text-slate-500">
            {profile?.role?.name}
          </span>
        </div>

        <ChevronDown
          size={16}
          className={`transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-3 z-50">
          <UserMenu
            onProfile={handleProfile}
            onLock={handleLock}
            onLogout={handleLogout}
          />
        </div>
      )}
    </div>
  );
};

export default UserDropdown;