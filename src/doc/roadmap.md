Authentication          ✅
Dashboard               ✅
Products CRUD           ✅
Product Import          ✅
Issue #14 Pagination    ✅
Categories              ✅
Customers               ⏳
Inventory               ⏳
POS                     ⏳
Reports                 ⏳


## Phase 4 — Product Identity

Status: 🚧 Planned

### Issue #017

Product SKU System

✅ Add sku column.
✅ Populate existing products.
✅ Make sku unique.
✅ Create a PostgreSQL trigger to generate SKUs automatically.
✅ Update Supabase types.
✅ Display SKU in the Product Table.
✅ Add SKU to Product Details.
✅ Search by SKU.
✅ Add duplicate product detection.
✅ Update CSV import/export to include SKU.

Issue #18 roadmap

✅ Create getExistingProductsForImport.service.ts
⏳ Update ProductImportModal
⏳ Build duplicate lookup map
⏳ Classify rows (valid / duplicate / invalid)
⏳ Create Import Summary modal
⏳ Import only valid rows
⏳ Show completion report