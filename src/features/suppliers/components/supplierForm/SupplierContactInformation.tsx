import type { FieldErrors, UseFormRegister } from "react-hook-form";

import Input from "../../../../../components/ui/Input";
import Label from "../../../../../components/ui/Label";

import type { SupplierFormData } from "../../validations/supplierSchema";

interface SupplierContactInformationProps {
  register: UseFormRegister<SupplierFormData>;
  errors: FieldErrors<SupplierFormData>;
}

const SupplierContactInformation = ({
  register,
  errors,
}: SupplierContactInformationProps) => {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-2xs">
      <h3 className="mb-5 text-xs font-extrabold uppercase tracking-wider text-slate-700">
        Contact Information
      </h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Contact Person */}
        <div>
          <Label htmlFor="contact_person" required={false}>
            Contact Person
          </Label>

          <Input
            id="contact_person"
            placeholder="e.g. Maria Santos"
            {...register("contact_person")}
            error={errors.contact_person?.message}
          />
        </div>

        {/* Phone */}
        <div>
          <Label htmlFor="phone" required={false}>
            Phone Number
          </Label>

          <Input
            id="phone"
            placeholder="e.g. +358 40 123 4567"
            {...register("phone")}
            error={errors.phone?.message}
          />
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email" required={false}>
            Email Address
          </Label>

          <Input
            id="email"
            type="email"
            placeholder="e.g. contact@supplier.com"
            {...register("email")}
            error={errors.email?.message}
          />
        </div>
      </div>
    </div>
  );
};

export default SupplierContactInformation;