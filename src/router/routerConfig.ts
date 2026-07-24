export interface RouteMeta {
  title: string;
  subtitle: string;
}

export const routeConfig: Record<string, RouteMeta> = {
  "/dashboard": {
    title: "Dashboard",
    subtitle: "Overview of today's business",
  },

  "/products": {
    title: "Products",
    subtitle: "Manage your products",
  },

  "/products/$productId": {
    title: "Product Details",
    subtitle: "View and edit product information",
  },

  "/categories": {
    title: "Categories",
    subtitle: "Organize your products",
  },

  "/units": {
    title: "Units",
    subtitle: "Manage measurement units",
  },

  "/inventory": {
    title: "Inventory",
    subtitle: "Monitor stock levels",
  },

  "/purchases": {
    title: "Purchases",
    subtitle: "Manage supplier purchases",
  },

  "/suppliers": {
    title: "Suppliers",
    subtitle: "Manage supplier records",
  },

  "/customers": {
    title: "Customers",
    subtitle: "Manage customer information",
  },

  "/staff": {
    title: "Staff",
    subtitle: "Manage employees and permissions",
  },

  "/profile": {
    title: "My Profile",
    subtitle: "Manage your account",
  },

  "/reports": {
    title: "Reports",
    subtitle: "Business analytics",
  },

  "/sales": {
    title: "Sales",
    subtitle: "Daily sales activities",
  },

  "/settings": {
    title: "Settings",
    subtitle: "Application configuration",
  },
};
