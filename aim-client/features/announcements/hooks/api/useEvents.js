//features/announcements/hooks/api/useEvents.js
import api from '@/lib/axios';
import {useQuery} from "@tanstack/react-query";

const fetchEvents = async (page) => {
    const { data } = await api.get("/api/events", {
        params: { page }
    });
    return data;
};

export function useEvents(page =1 ) {
    return useQuery({
        queryKey: ["events", page],
        queryFn: () => fetchEvents(page),
        staleTime: 10 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
    });
}