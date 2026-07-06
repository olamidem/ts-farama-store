import { useAuthStore } from "../../store/authStore";

const Dashboard = () => {
  const user = useAuthStore((state) => state.user);
  return (
    <section className="space-y-3">
      <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
      <p className="text-slate-600">
        Welcome back,
        <span className="font-semibold text-slate-900">
          {user?.name ?? "User"}
        </span>
        👋
      </p>
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">
          Farama Inventory Management System
        </h2>
        <p className="mt-2 text-slate-500">
          Your dashboard is ready. Business insights, reports, inventory
          statistics, and recent activity will appear here as we build the
          application.
        </p>
      </div>
    </section>
  );
};
export default Dashboard;
