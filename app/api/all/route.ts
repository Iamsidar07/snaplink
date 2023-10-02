import ShortUrl from "@/models/ShortUrl";
import connectToDB from "@/utils/connectToDB";
import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

export const GET = async (request: NextRequest) => {
    const { userId } = getAuth(request);
    if (!userId) {
        return NextResponse.json({
            error: "Unauthorized"
        }, { status: 400 })
    }
    try {
        await connectToDB();
        const urls = await ShortUrl.find({ userId });
        if (urls) {
            return NextResponse.json({
                result: urls
            }, { status: 200 })
        } else {
            return NextResponse.json({
                error: "invalid userid"
            }, { status: 400 })
        }
    } catch (error: any) {
        console.log('some', error.message)
        return NextResponse.json({
            error: error.message,
        }, { status: 500 })
    }
}