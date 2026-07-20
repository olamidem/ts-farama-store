import type { UseFormRegister } from "react-hook-form";
import type { SupplierFormData } from "../../validations/supplierSchema";
import { DEFAULT_PAYMENT_TERMS } from "../../constants/supplier.constants";

interface SupplierAddressInformationProps {
  register: UseFormRegister<SupplierFormData>;
}

export default function SupplierAddressInformation({
  register,
}: SupplierAddressInformationProps) {
  return (
    <div className="space-y-4 text-left">
      <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3 border-b border-slate-50 pb-1.5">
        Address & Business Terms
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Physical Address */}
        <div className="md:col-span-2 space-y-1.5">
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Physical Address
          </label>
          <input
            type="text"
            placeholder="e.g. 123 Trade St, Manila, Philippines"
            {...register("address")}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-700 focus:outline-hidden focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
        </div>

        {/* Payment Terms */}
        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Payment Terms
          </label>
          <select
            {...register("payment_terms")}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-700 focus:outline-hidden focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition"
          >
            {DEFAULT_PAYMENT_TERMS.map((terms) => (
              <option key={terms} value={terms}>
                {terms}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
