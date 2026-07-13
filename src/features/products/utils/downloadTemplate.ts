import * as XLSX from "xlsx";

export const downloadImportTemplate = (format: "csv" | "xlsx") => {
  const template = [
    {
      "Product Name": "Organic Milk 1L",
      Barcode: "880123456789",
      Category: "Beverages",
      "Selling Price": 4.5,
      "Cost Price": 2.1,
      Stock: 100,
      "Min Stock Alert": 10,
    },
    {
      "Product Name": "Wholewheat Bread",
      Barcode: "880123456790",
      Category: "Bakery",
      "Selling Price": 2.99,
      "Cost Price": 1.2,
      Stock: 50,
      "Min Stock Alert": 5,
    },
  ];

  const worksheet = XLSX.utils.json_to_sheet(template);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Template");

  if (format === "xlsx") {
    XLSX.writeFile(workbook, "product_import_template.xlsx");
    return;
  }

  const csv = XLSX.utils.sheet_to_csv(worksheet);
  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "product_import_template.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
