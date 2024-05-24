"use server";
import { revalidatePath, revalidateTag } from "next/cache";
import config from "@/config";

export default async function revalidate({ tag, path }) {
    if (tag) {
        revalidateTag(tag);
    }
    if (path) {
        revalidatePath(path);
    }
}

export const getTotalClicks = async () => {
    const res = await fetch(config.domain + "/api/clicks/totalClicks");
    const data = await res.json()
    return data
};

export const getClicksOverTime = async () => {
    const res = await fetch(config.domain + "/api/clicks/overTime");
    const data = await res.json()
    return data
};