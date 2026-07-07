import { useAuthStore } from "../../../store/authStore";

const Header = () => {
  const user = useAuthStore((state) => state.user);

  const initials =
    user?.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase() || "?";

  return (
    <header className="flex h-22.5 items-center justify-between border-b border-slate-100 bg-white px-8">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500">Welcome back 👋</p>
      </div>

      {/* Current User */}
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
          {initials}
        </div>

        <div className="text-right">
          <p className="font-semibold text-slate-900">{user?.name}</p>
          <p className="text-sm text-slate-500 capitalize">{user?.role}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
