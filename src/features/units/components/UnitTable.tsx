import { useMemo } from "react";
import type { Unit } from "../types/unit";
import DataTable from "../../../components/ui/DataTable/DataTable";
import { motion } from "motion/react";
import { getUnitTableColumns } from "./UnitTableColumns";

interface UnitTableProps {
  units: Unit[];
  isLoading?: boolean;
  onEdit: (unit: Unit) => void;
  onArchive: (unit: Unit) => void;
  onRestore: (unit: Unit) => void;
  sortBy: "name" | "symbol";
  ascending: boolean;
  onSort: (column: "name" | "symbol") => void;
}

export const UnitTable = ({
  units,
  isLoading = false,
  onEdit,
  onArchive,
  onRestore,
  sortBy,
  ascending,
  onSort,
}: UnitTableProps) => {
  const columns = useMemo(() => {
    return getUnitTableColumns({
      sortBy,
      ascending,
      onSort,
      onEdit,
      onArchive,
      onRestore,
    });
  }, [sortBy, ascending, onSort, onEdit, onArchive, onRestore]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
    >
      <DataTable
        data={units}
        columns={columns}
        isLoading={isLoading}
        getRowId={(unit) => String(unit.id)}
      />
    </motion.div>
  );
};

export default UnitTable;
