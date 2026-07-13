import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

const Pagination = ({
  page,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  const startRecord = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;

  const endRecord = Math.min(page * pageSize, totalItems);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);

      if (start > 2) {
        pages.push("...");
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) {
        pages.push("...");
      }

      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
      {/* Left */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="flex items-center gap-2">
          <label
            htmlFor="page-size"
            className="text-xs font-medium text-slate-500"
          >
            Rows per page
          </label>

          <select
            id="page-size"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium outline-none transition focus:border-blue-500"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        <p className="text-sm text-slate-500">
          Showing{" "}
          <span className="font-semibold text-slate-800">{startRecord}</span> –
          <span className="font-semibold text-slate-800">{endRecord}</span> of{" "}
          <span className="font-semibold text-slate-800">{totalItems}</span>{" "}
          products
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="rounded-lg border border-slate-200 bg-white p-2 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={16} />
        </button>

        {getPageNumbers().map((pageNumber, index) => {
          if (pageNumber === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="flex h-9 w-9 items-center justify-center text-sm font-medium text-slate-400"
              >
                ...
              </span>
            );
          }

          const num = pageNumber as number;
          return (
            <button
              key={num}
              type="button"
              onClick={() => onPageChange(num)}
              className={`h-9 min-w-9 rounded-lg text-sm font-semibold transition ${
                page === num
                  ? "bg-slate-900 text-white"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              {num}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages || totalPages === 0}
          className="rounded-lg border border-slate-200 bg-white p-2 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
