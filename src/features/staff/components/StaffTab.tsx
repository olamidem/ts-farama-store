import { StaffFilters } from "./StaffFilters";
import { StaffTable } from "./StaffTable";
import { RolesOverviewCard } from "./RolesOverviewCard";
import { RecentActivityCard } from "./RecentActivityCard";
import { useStaffFilters } from "../hooks/useStaffFilters";
import type { Employee, RoleData, ActivityLog } from "../types/staff";

interface StaffTabProps {
  employees: Employee[];
  roles: RoleData[];
  logs: ActivityLog[];
  currentUserEmail?: string;

  onAddClick: () => void;
  onViewClick: (emp: Employee) => void;
  onEditClick: (emp: Employee) => void;
  onResetPinClick: (emp: Employee) => void;
  onToggleStatus: (id: string) => void;
  onDeleteClick: (emp: Employee) => void;
  onRoleChange: (id: string, role: string) => void;
  onTabChange: (tab: "employees" | "roles" | "permissions" | "logs") => void;
}

export const StaffTab = ({
  employees,
  roles,
  logs,
  currentUserEmail,
  onAddClick,
  onViewClick,
  onEditClick,
  onResetPinClick,
  onToggleStatus,
  onDeleteClick,
  onRoleChange,
  onTabChange,
}: StaffTabProps) => {
  const {
    searchQuery,
    statusFilter,
    currentPage,
    totalPages,
    paginatedEmployees,
    setSearchQuery,
    setStatusFilter,
    setCurrentPage,
  } = useStaffFilters(employees);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start text-left">
      {/* Left Side */}
      <div className="lg:col-span-2 space-y-6">
        <StaffFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          onAddClick={onAddClick}
        />

        <StaffTable
          employees={paginatedEmployees}
          roles={roles}
          currentUserEmail={currentUserEmail}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          onView={onViewClick}
          onEdit={onEditClick}
          onResetPin={onResetPinClick}
          onToggleStatus={onToggleStatus}
          onDelete={onDeleteClick}
          onRoleChange={onRoleChange}
        />
      </div>

      {/* Right Side */}
      <div className="space-y-6">
        <RolesOverviewCard
          employees={employees}
          onViewRoles={() => onTabChange("roles")}
        />

        <RecentActivityCard
          logs={logs}
          onViewLogs={() => onTabChange("logs")}
        />
      </div>
    </div>
  );
};

export default StaffTab;
