//lib/queryClient.js/

import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1분 동안은 fresh로 간주 - 불필요한 fetch 방지
      retry: 1, // 실패 시 1번만 재시도
      refetchOnWindowFocus: false,
    },
        mutations: {
            retry: 0,
        },
    },
});