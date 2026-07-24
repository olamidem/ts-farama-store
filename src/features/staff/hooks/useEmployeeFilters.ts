import { useMemo, useState } from "react";
import type { Employee } from "../types/staff";

export type EmployeeSort =
  | "name"
  | "joined"
  | "last-login";

export const useEmployeeFilters = (employees: Employee[]) => {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");
  const [status, setStatus] = useState("all");
  const [sortBy, setSortBy] = useState<EmployeeSort>("name");

  const filteredEmployees = useMemo(() => {
    let data = [...employees];

    if (search.trim()) {
      const value = search.toLowerCase();

      data = data.filter(
        (employee) =>
          employee.full_name.toLowerCase().includes(value) ||
          employee.email.toLowerCase().includes(value) ||
          employee.phone.toLowerCase().includes(value)
      );
    }

    if (role !== "all") {
      data = data.filter((employee) => employee.role?.name === role);
    }

    if (status !== "all") {
      data = data.filter((employee) => employee.status === status);
    }

    switch (sortBy) {
      case "joined":
        data.sort((a, b) =>
          b.created_at.localeCompare(a.created_at)
        );
        break;

      case "last-login":
        data.sort((a, b) =>
          b.last_login.localeCompare(a.last_login)
        );
        break;

      default:
        data.sort((a, b) =>
          a.full_name.localeCompare(b.full_name)
        );
    }

    return data;
  }, [employees, search, role, status, sortBy]);

  return {
    filteredEmployees,
    search,
    setSearch,
    role,
    setRole,
    status,
    setStatus,
    sortBy,
    setSortBy,
  };
};