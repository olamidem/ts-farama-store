import {
  BarChart3,
  Boxes,
  ClipboardList,
  LayoutDashboard,
  Package,
  Receipt,
  Settings,
  ShoppingCart,
  Tags,
  Scale,
  Users,
  UserCog,
  Truck,
} from "lucide-react";

export const navigation = [
  {
    title: "Main",
    items: [
      {
        label: "Dashboard",
        to: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        label: "Sales",
        to: "/sales",
        icon: ShoppingCart,
      },
      {
        label: "Invoices",
        to: "/invoices",
        icon: Receipt,
      },
      {
        label: "Reports",
        to: "/reports",
        icon: BarChart3,
      },
    ],
  },

  {
    title: "Management",
    items: [
      {
        label: "Products",
        to: "/products",
        icon: Package,
      },
      {
        label: "Categories",
        to: "/categories",
        icon: Tags,
      },
      {
        label: "Suppliers",
        to: "/suppliers",
        icon: Truck,
      },
      {
        label: "Customers",
        to: "/customers",
        icon: Users,
      },
      {
        label: "Units",
        to: "/units",
        icon: Scale,
      },
    ],
  },

  {
    title: "Inventory",
    items: [
      {
        label: "Purchases",
        to: "/purchases",
        icon: ClipboardList,
      },
      {
        label: "Inventory",
        to: "/inventory",
        icon: Boxes,
      },
    ],
  },

  {
    title: "Staff (Administration)",
    items: [
      {
        label: "Staff Portal",
        to: "/staff",
        icon: UserCog,
      },
    ],
  },

  {
    title: "System",
    items: [
      {
        label: "Settings",
        to: "/settings",
        icon: Settings,
      },
    ],
  },
];
