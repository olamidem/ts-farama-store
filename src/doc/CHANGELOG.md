# Changelog

All notable changes to this project will be documented here.

---

## Unreleased

### Added

- Product Bulk Price Update
- Product Editing

### In Progress

- Product Deletion

## [0.4.0] - Product Status Management

### Added
- Soft product deactivation
- Product restoration
- Product status badges
- Status filtering
- Confirmation dialog
- Restore workflow

### Changed
- Product actions now depend on status.
- Added reusable confirmation dialog.

### Fixed
- Prevented accidental permanent deletion.

## [Unreleased]

### Planned

### Issue #14 — Product Table Pagination, Search & Sorting

#### Added

- Server-side pagination
- Product search by name and barcode
- Column sorting
- Reusable Pagination component
- Loading skeleton
- Empty state UI

#### Changed

- Product table now fetches paginated data from Supabase.
- Product hook updated to support pagination, search and sorting.

## Added

- Modernized Products pagination UI.
- Record range indicator.
- Persistent page size.
- Automatic page reset when filters change.
- Sorting integration.
- Improved page navigation.


# Changelog

## [Unreleased]

### Planned

- Introduce SKU system for products.
- Prevent duplicate products.
- Improve product import workflow.
- Add SKU support to exports.
- Prepare inventory architecture for purchasing.

### Planned

- Smart duplicate detection during CSV product import.
- Import validation before database insertion.
- Import summary and duplicate review workflow.