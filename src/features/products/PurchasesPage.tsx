import { useState } from "react";
import PurchaseStats from "../components/PurchaseStats";
import PurchaseFilters from "../components/PurchaseFilters";
import PurchaseTable from "../components/PurchaseTable";
import PurchaseOverview from "../components/PurchaseDetails/PurchaseOverview";
import PurchaseForm from "../components/PurchaseForm/PurchaseForm";
import type { Purchase } from "../types/purchase";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import { Plus, X } from "lucide-react";
import { usePurchases } from "../hook/usePurchases";
import { useDeletePurchase } from "../hook/usePurchasesMutations";

export const PurchasesPage = () => {
  const deleteMutation = useDeletePurchase();

  // Filters State
  const [search, setSearch] = useState("");
  const [supplierId, setSupplierId] = useState("all");
  const [status, setStatus] = useState("all");

  // Selection State
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(
    null,
  );
  const [isClosedManually, setIsClosedManually] = useState(false);

  // Modal State for New Purchase Order
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Load purchase orders list
  const { data: allPurchases = [], isLoading, refetch } = usePurchases();

  // Client-side filtering
  const purchases = allPurchases.filter((purchase) => {
    const matchesSearch =
      search === "" ||
      purchase.purchase_number.toLowerCase().includes(search.toLowerCase()) ||
      (purchase.supplier?.name || "")
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesSupplier =
      supplierId === "all" || purchase.supplier_id === supplierId;

    const matchesStatus = status === "all" || purchase.status === status;

    return matchesSearch && matchesSupplier && matchesStatus;
  });

  const handleDelete = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id);
      if (selectedPurchase?.id === id) {
        setSelectedPurchase(null);
      }
    } catch (err) {
      const error = err as Error;
      toast.error(error.message || "Failed to delete purchase order.");
    }
  };

  const handleEdit = (purchase: Purchase) => {
    toast.info(
      `Editing purchase order ${purchase.purchase_number} is not supported in this version.`,
    );
  };

  const handleExport = () => {
    toast.success("Exporting purchase orders report (CSV)...");
  };

  // Find fresh data for selected purchase (to reflect receives, status changes instantly)
  // Auto-preselect first item to replicate split-screen default view unless closed manually
  const activeSelected = isClosedManually
    ? null
    : selectedPurchase
      ? purchases.find((p) => p.id === selectedPurchase.id) || selectedPurchase
      : purchases.length > 0
        ? purchases[0]
        : null;

  return (
    <div className="w-full h-full space-y-6">
      {/* Top action row containing "+ New Purchase Order" button right aligned */}
      <div className="flex justify-between items-center shrink-0">
        <div></div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          type="button"
          className="flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 text-xs font-bold transition shadow-sm cursor-pointer border-0 shrink-0"
        >
          <Plus size={15} />
          <span>New Purchase Order</span>
        </button>
      </div>

      {/* Main split-view or full-width grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: KPI cards, Filters, Table */}
        <div
          className={`${activeSelected ? "lg:col-span-8" : "lg:col-span-12"} space-y-6 transition-all duration-300`}
        >
          <PurchaseStats />

          <PurchaseFilters
            search={search}
            setSearch={setSearch}
            supplierId={supplierId}
            setSupplierId={setSupplierId}
            status={status}
            setStatus={setStatus}
            onExport={handleExport}
          />

          <div className="bg-white rounded-2xl border border-slate-100 p-4.5 shadow-3xs">
            <PurchaseTable
              purchases={purchases}
              isLoading={isLoading}
              onView={(p) => {
                setSelectedPurchase(p);
                setIsClosedManually(false);
              }}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isCompact={false}
            />
          </div>
        </div>

        {/* Right Column: Selected Purchase Order Detail view */}
        {activeSelected && (
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-md h-[calc(100vh-140px)] sticky top-4 z-20 flex flex-col">
            <PurchaseOverview
              key={activeSelected.id}
              purchase={activeSelected}
              onClose={() => {
                setSelectedPurchase(null);
                setIsClosedManually(true);
              }}
              onEdit={handleEdit}
            />
          </div>
        )}
      </div>

      {/* New Purchase Order Modal */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-xs p-4 sm:p-6 md:p-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative bg-slate-50 w-full max-w-6xl rounded-2xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Sticky Header */}
              <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-white z-10 shrink-0">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
                  <div>
                    <h2 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">
                      New Purchase Order
                    </h2>
                    <p className="text-[10px] font-semibold text-slate-400 mt-0.5">
                      Create and register a new purchase requisition with
                      suppliers
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  type="button"
                  className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 cursor-pointer transition border-0"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Scrollable Modal Content */}
              <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
                <PurchaseForm
                  isModal={true}
                  onSuccess={() => {
                    setIsCreateModalOpen(false);
                    refetch();
                  }}
                  onCancel={() => setIsCreateModalOpen(false)}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PurchasesPage;
