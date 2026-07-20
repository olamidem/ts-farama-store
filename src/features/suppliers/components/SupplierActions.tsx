import { Edit, Trash, MoreHorizontal } from "lucide-react";
import { useState } from "react";

interface SupplierActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export default function SupplierActions({
  onEdit,
  onDelete,
}: SupplierActionsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center gap-2 relative">
      <button
        type="button"
        onClick={onEdit}
        className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-slate-100 bg-white px-4 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition shadow-2xs cursor-pointer"
      >
        <Edit className="h-3.5 w-3.5" />
        Edit
      </button>

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-100 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition shadow-2xs cursor-pointer"
          title="More actions"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute right-0 mt-2 w-36 origin-top-right rounded-xl border border-slate-100 bg-white p-1 shadow-lg z-20">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onDelete();
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-semibold text-rose-600 hover:bg-rose-50 transition cursor-pointer"
              >
                <Trash className="h-3.5 w-3.5" />
                Delete Supplier
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
