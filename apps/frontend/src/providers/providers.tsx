"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { QUERY_CONFIG } from "@/config";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: QUERY_CONFIG.STALE_TIME,
        refetchOnWindowFocus: QUERY_CONFIG.REFETCH_ON_WINDOW_FOCUS,
      },
    },
  }));
  
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </Provider>
  );
}
