//features/home/hooks/api/useBulletins.js
import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const fetchBulletins = async (page) => {
    const { data } = await api.get("/api/bulletins", {
        params: { page }
    });
    return data;
};

export function useBulletins(page = 1) {
    return useQuery ({
        queryKey: ["bulletins", page],
        queryFn: () => fetchBulletins(page),
        staleTime: 10 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
    });
}