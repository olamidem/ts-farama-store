import type { router } from ".";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }

  interface StaticDataRouteOption {
    title?: string;
    subtitle?: string;
    headerTitle?: string;
  }
}