//features/announcements/hooks/api/useLogout.js
import api from '@/lib/axios';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation"; // 또는 next/router (버전에 맞게)

const logoutRequest = async () => {
    const { data } = await api.post("/api/auth/logout");
    return data;
};

export function useLogout() {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: logoutRequest,
        onSuccess: () => {
            // 1. currentUser 캐시 제거
            queryClient.removeQueries({ queryKey: ["currentUser"] });

            // 2. 다른 유저별 캐시도 있다면 전체 초기화 고려
            // queryClient.clear();

            router.push("/"); // 로그아웃 후 리다이렉트
        },
        onError: (error) => {
            console.error("로그아웃 실패:", error);
        },
    });
}