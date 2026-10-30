"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { PrimeReactProvider } from "primereact/api";
import { ExperienceProvider } from "@/context/ExperienceContext";

import "primereact/resources/themes/lara-light-teal/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export function AppProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60_000,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <PrimeReactProvider value={{ ripple: true }}>
        <ExperienceProvider>{children}</ExperienceProvider>
      </PrimeReactProvider>
    </QueryClientProvider>
  );
}