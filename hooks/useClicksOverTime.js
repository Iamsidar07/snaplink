"use client"
import { useQuery } from "@tanstack/react-query";
import { getClicksOverTime } from "@/app/actions";

const useClicksOverTime = () => {
    const result = useQuery({
        queryKey: ["clicksOverTime"],
        queryFn: getClicksOverTime
    })
    return result
}

export default useClicksOverTime