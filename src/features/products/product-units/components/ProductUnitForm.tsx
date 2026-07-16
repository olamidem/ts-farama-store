import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { ProductWithRelations } from "../../products/types/product";

import {
  createProductUnitSchema,
  ProductUnitFormData,
} from "../validation/productUnit.schema";

interface ProductUnitFormProps {
  product: ProductWithRelations;
}

const ProductUnitForm = ({ product }: ProductUnitFormProps) => {
  const form = useForm<ProductUnitFormData>({
    mode: "onChange",
    resolver: zodResolver(createProductUnitSchema),
    defaultValues: {
      unit_id: "",
      conversion_factor: 1,
      selling_price: 0,
      cost_price: 0,
      sku: "",
      barcode: "",
    },
  });

  return <div>Product Unit Form</div>;
};

export default ProductUnitForm;
