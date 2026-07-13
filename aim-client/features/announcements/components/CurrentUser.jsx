"use client";
import { useCurrentUser } from "@/features/announcements/hooks/api/useCurrentUser";

export default function EventList() {
    const { data, isLoading, isError } = useCurrentUser();

    if (isLoading) return <div>Loading current user...</div>;
    if (isError) return <div>Error loading user</div>;

    return (
        <div>
            {data.data.map((user) => (
                <div key={user.id}>
                    <h2>{user.title}</h2>
                </div>
            ))}
        </div>
    );
}