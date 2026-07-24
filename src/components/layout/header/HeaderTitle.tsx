import { useMatches } from "@tanstack/react-router";

export default function DashboardLayout() {
  const matches = useMatches();
  
  // Find the current match that has staticData
  const currentMatch = matches[matches.length - 1];
  const staticData = currentMatch?.staticData as { headerTitle?: string; title?: string; subtitle?: string } | undefined;

  const headerTitle = staticData?.headerTitle || staticData?.title || "App";
  const subtitle = staticData?.subtitle;

  return (
    <div>
      <header>
        <h1>{headerTitle}</h1>
        {subtitle && <p>{subtitle}</p>}
      </header>
      {/* Outlet for nested routes */}
    </div>
  );
}