//features/announcements/hooks/api/useCurrentUser.js
import api from '@/lib/axios';
import { useQuery } from "@tanstack/react-query";

const fetchCurrentUser = async () => {
    const { data } = await api.get("/api/auth/me");
    return data;
};

export function useCurrentUser() {
    return useQuery({
        queryKey: ["currentUser"],
        queryFn: fetchCurrentUser,
        retry: false,
        // 401이면 그냥 null/비로그인 상태로 취급
    });
}