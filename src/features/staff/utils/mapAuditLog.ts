import type { AuditLogQueryResult } from "../types/staff-query.types";
import type { ActivityLog } from "../types/staff";

export const mapAuditLog = (log: AuditLogQueryResult): ActivityLog => ({
  id: log.id,
  operator_id: log.operator_id ?? "",
  operator_name: log.operator_name ?? "System",
  operator: log.operator_name ?? "System",
  role: log.role ?? "Unknown",
  action: log.action ?? "",
  details: log.details ?? "",
  ip_address: log.ip_address ?? "",
  ipAddress: log.ip_address ?? "",
  created_at: log.created_at ?? "",
  timestamp: log.created_at ?? "",
});
