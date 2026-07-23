import {
  createBrowserHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { requireAuth } from "./guard";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import LoginScreen from "../pages/Login/LoginScreen";
import ProductsPage from "../pages/ProductsPage";
import CategoryPage from "../pages/CategoryPage";
import UnitsPage from "../pages/UnitsPage";
import ProductDetailsPage from "../features/products/details/ProductDetailsPage";
import InventoryPage from "../pages/InventoryPage";
import PurchasesPage from "../features/purchases/pages/PurchasesPage";
import SuppliersPage from "../features/suppliers/pages/SuppliersPage";
import StaffPage from "../pages/Staff/StaffPage";
import ProfilePage from "../pages/Profile/ProfilePage";



const rootRoute = createRootRoute();
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LoginScreen,
});

/**
 * Protected Application Layout
 */
const appLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "app",
  beforeLoad: requireAuth,
  component: DashboardLayout,
});

const dashboardRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/dashboard",
  component: Dashboard,
});

const productsRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/products",
  component: ProductsPage,
});
const CategoryRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/categories",
  component: CategoryPage,
});
const unitsRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/units",
  component: UnitsPage,
});
const productDetailsRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/products/$productId",
  component: ProductDetailsPage,
});

const inventoryRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/inventory",
  component: InventoryPage,
});

const purchasesRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/purchases",
  component: PurchasesPage,
});

const suppliersRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/suppliers",
  component: SuppliersPage,
});

const staffRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/staff",
  component: StaffPage,
});

// const settingsRoute = createRoute({
//   getParentRoute: () => appLayoutRoute,
//   path: "/settings",
//   component: SettingsPage,
// });

const profileRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/profile",
  component: ProfilePage,
});

// const salesRoute = createRoute({
//   getParentRoute: () => appLayoutRoute,
//   path: "/sales",
//   component: SalesPage,
// });

// const customersRoute = createRoute({
//   getParentRoute: () => appLayoutRoute,
//   path: "/customers",
//   component: CustomersPage,
// });

/**
 * Route Tree
 */
const routeTree = rootRoute.addChildren([
  loginRoute,
  appLayoutRoute.addChildren([
    dashboardRoute,
    productsRoute,
    CategoryRoute,
    unitsRoute,
    inventoryRoute,
    productDetailsRoute,
    purchasesRoute,
    suppliersRoute,
    staffRoute,
    // settingsRoute,
    profileRoute,
    // salesRoute,
    // customersRoute,
  ]),
]);

/**
 * Router
 */
export const router = createRouter({
  routeTree,
  history: createBrowserHistory(),
});

/**
 * Router Types
 */
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
