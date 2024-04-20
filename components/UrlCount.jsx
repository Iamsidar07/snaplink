"use client"
import {useQuery} from "@tanstack/react-query";
import axios from "axios";

const UrlCount = ()=>{
    const {data: totalUrlCreated} = useQuery({
        queryKey: ["urlCount"],
        queryFn: async()=>{
            const res = await axios.get("/api/urlCount")
            return res.data
        },
        retry: true,
        retryDelay: 100
    })
    return (<div className={"py-12 sm:py-32"}>
        <h4 className={"headline text-center text-xl md:text-6xl"}>{totalUrlCreated ?? 0}</h4>
    </div>)
}
export default UrlCount