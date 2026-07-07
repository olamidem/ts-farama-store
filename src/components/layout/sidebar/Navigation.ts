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
  Users,
  UserCog,
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
        label: "Customers",
        to: "/customers",
        icon: Users,
      },
      {
        label: "Staff",
        to: "/staff",
        icon: UserCog,
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
