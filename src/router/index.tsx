import {
  createBrowserHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import LoginScreen from "../pages/LoginScreen";
import { requireAuth } from "./guard";
import Dashboard from "../pages/Dashboard/Dashboard";
import DashboardLayout from "../layout/DashboardLayout";

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

/**
 * Route Tree
 */
const routeTree = rootRoute.addChildren([
  loginRoute,
  appLayoutRoute.addChildren([dashboardRoute]),
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
