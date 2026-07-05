import {  QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import AppInitializer from "./app/AppInitializer";
import { router } from "./router";
import { queryClient } from "./lib/queryClient";


export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppInitializer>
        <RouterProvider router={router} />
      </AppInitializer>
    </QueryClientProvider>
  );
}
