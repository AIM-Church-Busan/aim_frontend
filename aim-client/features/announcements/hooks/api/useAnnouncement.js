//features/announcements/hooks/api/useAnnouncements.js
import api from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

const fetchAnnouncements = async (page) => {
    const { data } = await api.get("/api/announcements", {
        params: { page },
    });
    return data;
};

export function useAnnouncements(page = 1) {
    return useQuery ({
        queryKey: ["announcements", page],
        queryFn: () => fetchAnnouncements(page),
        staleTime: 10 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
    });
}