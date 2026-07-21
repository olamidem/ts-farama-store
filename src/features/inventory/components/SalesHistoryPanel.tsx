import { useState, useMemo } from "react";
import {
  Search,
  Download,
  CheckCircle,
  Clock,
  XCircle,
  TrendingUp,
  CreditCard,
  Truck,
  DollarSign,
} from "lucide-react";
import { cn } from "../../../utils/cn";
import { toast } from "sonner";

interface SaleItem {
  id: string;
  invoiceNo: string;
  customerName: string;
  customerEmail: string;
  date: string;
  items: {
    productName: string;
    sku: string;
    qty: number;
    price: number;
  }[];
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: "Paid" | "Pending" | "Failed";
  fulfillmentStatus: "Delivered" | "Processing" | "Shipped" | "Cancelled";
}

const MOCK_SALES_DATA: SaleItem[] = [
  {
    id: "sale-1",
    invoiceNo: "INV-2026-0819",
    customerName: "Kunle Adebayo",
    customerEmail: "kunle@example.com",
    date: "2026-07-21T09:30:00Z",
    items: [
      {
        productName: "Golden Penny Semovita 10kg",
        sku: "GP-SEM-10",
        qty: 5,
        price: 12500,
      },
      {
        productName: "Dangote Refined Sugar 50kg",
        sku: "DG-SUG-50",
        qty: 2,
        price: 48000,
      },
    ],
    totalAmount: 158500,
    paymentMethod: "Bank Transfer",
    paymentStatus: "Paid",
    fulfillmentStatus: "Delivered",
  },
  {
    id: "sale-2",
    invoiceNo: "INV-2026-0820",
    customerName: "Chioma Chukwuma",
    customerEmail: "chioma.c@example.com",
    date: "2026-07-21T08:15:00Z",
    items: [
      {
        productName: "Honeywell Flour 1kg",
        sku: "HW-FLR-01",
        qty: 20,
        price: 1800,
      },
    ],
    totalAmount: 36000,
    paymentMethod: "POS",
    paymentStatus: "Paid",
    fulfillmentStatus: "Processing",
  },
  {
    id: "sale-3",
    invoiceNo: "INV-2026-0821",
    customerName: "Femi Otedola",
    customerEmail: "femi.otedola@example.com",
    date: "2026-07-20T16:45:00Z",
    items: [
      {
        productName: "Mama Gold Rice 50kg",
        sku: "MG-RCE-50",
        qty: 10,
        price: 72000,
      },
      {
        productName: "Gino Tomatoes Paste Box",
        sku: "GN-TOM-BX",
        qty: 1,
        price: 18500,
      },
    ],
    totalAmount: 738500,
    paymentMethod: "Bank Transfer",
    paymentStatus: "Paid",
    fulfillmentStatus: "Shipped",
  },
  {
    id: "sale-4",
    invoiceNo: "INV-2026-0822",
    customerName: "Amara Nwosu",
    customerEmail: "amara@example.com",
    date: "2026-07-20T11:20:00Z",
    items: [
      { productName: "Power Oil 3L", sku: "PW-OIL-03", qty: 8, price: 9500 },
    ],
    totalAmount: 76000,
    paymentMethod: "Cash",
    paymentStatus: "Pending",
    fulfillmentStatus: "Processing",
  },
  {
    id: "sale-5",
    invoiceNo: "INV-2026-0823",
    customerName: "Ibrahim Yusuf",
    customerEmail: "ibrahim@example.com",
    date: "2026-07-19T14:10:00Z",
    items: [
      {
        productName: "Indomie Chicken 40pcs Box",
        sku: "IN-CHK-BX",
        qty: 15,
        price: 8200,
      },
    ],
    totalAmount: 123000,
    paymentMethod: "Bank Transfer",
    paymentStatus: "Paid",
    fulfillmentStatus: "Delivered",
  },
  {
    id: "sale-6",
    invoiceNo: "INV-2026-0824",
    customerName: "Blessing Okoye",
    customerEmail: "blessing.o@example.com",
    date: "2026-07-18T10:05:00Z",
    items: [
      {
        productName: "Dangote Refined Sugar 50kg",
        sku: "DG-SUG-50",
        qty: 1,
        price: 48000,
      },
      {
        productName: "Golden Penny Semovita 10kg",
        sku: "GP-SEM-10",
        qty: 3,
        price: 12500,
      },
    ],
    totalAmount: 85500,
    paymentMethod: "POS",
    paymentStatus: "Failed",
    fulfillmentStatus: "Cancelled",
  },
];

export const SalesHistoryPanel = () => {
  const [search, setSearch] = useState("");
  const [paymentFilter, setPaymentFilter] = useState<string>("All");
  const [fulfillmentFilter, setFulfillmentFilter] = useState<string>("All");

  const formatCurrency = (val: number) => {
    return (
      "₦" +
      new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(val)
    );
  };

  // Filtered sales
  const filteredSales = useMemo(() => {
    return MOCK_SALES_DATA.filter((sale) => {
      const searchLower = search.toLowerCase();
      const matchesSearch =
        !search.trim() ||
        sale.invoiceNo.toLowerCase().includes(searchLower) ||
        sale.customerName.toLowerCase().includes(searchLower) ||
        sale.customerEmail.toLowerCase().includes(searchLower) ||
        sale.items.some((item) =>
          item.productName.toLowerCase().includes(searchLower),
        );

      const matchesPayment =
        paymentFilter === "All" || sale.paymentStatus === paymentFilter;
      const matchesFulfillment =
        fulfillmentFilter === "All" ||
        sale.fulfillmentStatus === fulfillmentFilter;

      return matchesSearch && matchesPayment && matchesFulfillment;
    });
  }, [search, paymentFilter, fulfillmentFilter]);

  // Statistics
  const stats = useMemo(() => {
    const totalRevenue = MOCK_SALES_DATA.filter(
      (s) => s.paymentStatus === "Paid",
    ).reduce((sum, s) => sum + s.totalAmount, 0);

    const pendingAmount = MOCK_SALES_DATA.filter(
      (s) => s.paymentStatus === "Pending",
    ).reduce((sum, s) => sum + s.totalAmount, 0);

    const processingCount = MOCK_SALES_DATA.filter(
      (s) => s.fulfillmentStatus === "Processing",
    ).length;

    const completedInvoices = MOCK_SALES_DATA.filter(
      (s) => s.paymentStatus === "Paid",
    ).length;

    return {
      totalRevenue,
      pendingAmount,
      processingCount,
      completedInvoices,
    };
  }, []);

  const handleExport = () => {
    toast.success(
      "Sales history export initiated. This is a preview placeholder.",
    );
  };

  return (
    <div className="space-y-6">
      {/* Mini top stats banner for sales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
              Total Confirmed Sales
            </span>
            <p className="text-xl font-bold text-slate-900">
              {formatCurrency(stats.totalRevenue)}
            </p>
          </div>
          <div className="rounded-xl p-2 bg-emerald-50 text-emerald-600 border border-emerald-100">
            <DollarSign size={18} />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
              Pending Payments
            </span>
            <p className="text-xl font-bold text-slate-900">
              {formatCurrency(stats.pendingAmount)}
            </p>
          </div>
          <div className="rounded-xl p-2 bg-amber-50 text-amber-600 border border-amber-100">
            <CreditCard size={18} />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
              Processing Orders
            </span>
            <p className="text-xl font-bold text-slate-900">
              {stats.processingCount} Orders
            </p>
          </div>
          <div className="rounded-xl p-2 bg-blue-50 text-blue-600 border border-blue-100">
            <Truck size={18} />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
              Paid Invoices
            </span>
            <p className="text-xl font-bold text-slate-900">
              {stats.completedInvoices} paid
            </p>
          </div>
          <div className="rounded-xl p-2 bg-indigo-50 text-indigo-600 border border-indigo-100">
            <TrendingUp size={18} />
          </div>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
        {/* Table Filters header */}
        <div className="p-5 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by invoice, customer, or product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs font-medium rounded-xl border border-slate-200 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-700 transition"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase">
                Payment:
              </span>
              <select
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
                className="text-xs font-bold text-slate-600 rounded-xl border border-slate-200 bg-white py-1.5 px-3 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="All">All</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase">
                Fulfillment:
              </span>
              <select
                value={fulfillmentFilter}
                onChange={(e) => setFulfillmentFilter(e.target.value)}
                className="text-xs font-bold text-slate-600 rounded-xl border border-slate-200 bg-white py-1.5 px-3 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="All">All</option>
                <option value="Delivered">Delivered</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <button
              onClick={handleExport}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 transition cursor-pointer"
            >
              <Download size={13} />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* The Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="py-3.5 px-5 text-left text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                  Invoice
                </th>
                <th className="py-3.5 px-5 text-left text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                  Customer
                </th>
                <th className="py-3.5 px-5 text-left text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                  Date
                </th>
                <th className="py-3.5 px-5 text-left text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                  Items Sold
                </th>
                <th className="py-3.5 px-5 text-left text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                  Payment Status
                </th>
                <th className="py-3.5 px-5 text-left text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                  Fulfillment
                </th>
                <th className="py-3.5 px-5 text-right text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSales.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center">
                    <p className="text-xs font-bold text-slate-400">
                      No sales transactions matched your query.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredSales.map((sale) => (
                  <tr key={sale.id} className="hover:bg-slate-50/40 transition">
                    <td className="py-4 px-5">
                      <span className="font-mono text-xs font-bold text-indigo-600">
                        {sale.invoiceNo}
                      </span>
                    </td>
                    <td className="py-4 px-5">
                      <div className="space-y-0.5">
                        <p className="text-xs font-bold text-slate-900">
                          {sale.customerName}
                        </p>
                        <p className="text-[10px] font-semibold text-slate-400">
                          {sale.customerEmail}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <span className="text-xs font-semibold text-slate-500">
                        {new Date(sale.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </td>
                    <td className="py-4 px-5">
                      <div className="space-y-1">
                        {sale.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-1.5 text-xs text-slate-600"
                          >
                            <span className="font-semibold">
                              {item.productName}
                            </span>
                            <span className="font-mono text-[10px] bg-slate-100 text-slate-600 px-1 py-0.2 rounded-sm">
                              x{item.qty}
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border",
                          sale.paymentStatus === "Paid" &&
                            "bg-emerald-50 text-emerald-700 border-emerald-200",
                          sale.paymentStatus === "Pending" &&
                            "bg-amber-50 text-amber-700 border-amber-200",
                          sale.paymentStatus === "Failed" &&
                            "bg-rose-50 text-rose-700 border-rose-200",
                        )}
                      >
                        {sale.paymentStatus === "Paid" && (
                          <CheckCircle size={10} />
                        )}
                        {sale.paymentStatus === "Pending" && (
                          <Clock size={10} />
                        )}
                        {sale.paymentStatus === "Failed" && (
                          <XCircle size={10} />
                        )}
                        <span>{sale.paymentStatus}</span>
                      </span>
                    </td>
                    <td className="py-4 px-5">
                      <span
                        className={cn(
                          "inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-extrabold border uppercase",
                          sale.fulfillmentStatus === "Delivered" &&
                            "bg-emerald-50 text-emerald-700 border-emerald-100",
                          sale.fulfillmentStatus === "Processing" &&
                            "bg-blue-50 text-blue-700 border-blue-100",
                          sale.fulfillmentStatus === "Shipped" &&
                            "bg-purple-50 text-purple-700 border-purple-100",
                          sale.fulfillmentStatus === "Cancelled" &&
                            "bg-slate-50 text-slate-600 border-slate-100",
                        )}
                      >
                        {sale.fulfillmentStatus}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-right">
                      <span className="font-mono text-xs font-bold text-slate-900">
                        {formatCurrency(sale.totalAmount)}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
