import { create } from "zustand";
import type {
  Employee,
  RoleData,
  ActivityLog,
} from "../types/staff";

interface StaffStore {
  employees: Employee[];
  roles: RoleData[];
  logs: ActivityLog[];
  isLoading: boolean;

  setEmployees: (employees: Employee[]) => void;
  setRoles: (roles: RoleData[]) => void;
  setLogs: (logs: ActivityLog[]) => void;
  setLoading: (loading: boolean) => void;
  reset: () => void;
}

const useStaffStore = create<StaffStore>((set) => ({
  employees: [],
  roles: [],
  logs: [],
  isLoading: false,

  setEmployees: (employees) =>
    set({ employees }),

  setRoles: (roles) =>
    set({ roles }),

  setLogs: (logs) =>
    set({ logs }),

  setLoading: (loading) =>
    set({ isLoading: loading }),

  reset: () =>
    set({
      employees: [],
      roles: [],
      logs: [],
      isLoading: false,
    }),
}));

export default useStaffStore;