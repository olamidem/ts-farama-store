import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

interface SortableHeaderProps<T extends string> {
  label: string;
  column: T;
  currentSort: T;
  ascending: boolean;
  onSort: (column: T) => void;
}

const SortableHeader = <T extends string>({
  label,
  column,
  currentSort,
  ascending,
  onSort,
}: SortableHeaderProps<T>) => {
  const active = currentSort === column;

  return (
    <button
      type="button"
      onClick={() => onSort(column)}
      className="group flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider transition-colors hover:text-slate-800"
    >
      <span>{label}</span>

      {active ? (
        ascending ? (
          <ArrowUp size={14} className="text-blue-600 transition-transform" />
        ) : (
          <ArrowDown size={14} className="text-blue-600 transition-transform" />
        )
      ) : (
        <ArrowUpDown
          size={14}
          className="text-slate-400 transition-opacity opacity-70 group-hover:opacity-100"
        />
      )}
    </button>
  );
};

export default SortableHeader;
