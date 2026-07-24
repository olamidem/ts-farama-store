import { useMemo, useState } from "react";
import type { Employee } from "../types/staff";

export const useStaffFilter = (employees: Employee[]) => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | "active" | "suspended">("all");

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const matchesSearch =
        employee.full_name.toLowerCase().includes(search.toLowerCase()) ||
        employee.email.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        status === "all" || employee.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [employees, search, status]);

  return {
    search,
    setSearch,
    status,
    setStatus,
    filteredEmployees,
  };
};