"use client"
import { getTotalClicks } from "@/actions";
import { useQuery } from "@tanstack/react-query";

const useTotalClicks = () => {
    const result = useQuery({
        queryKey: ["totalClicks"],
        queryFn: getTotalClicks
    })
    return result
}

export default useTotalClicks