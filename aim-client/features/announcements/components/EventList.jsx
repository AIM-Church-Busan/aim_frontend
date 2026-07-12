"use client";
import { useEvents } from "@/features/announcements/hooks/api/useEvents";

export default function EventList() {
    const { data, isLoading, isError } = useEvents(1);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading events</div>;

    return (
        <div>
            {data.data.map((event) => (
                <div key={event.id}>
                    <h2>{event.title}</h2>
                </div>
            ))}
        </div>
    );
}