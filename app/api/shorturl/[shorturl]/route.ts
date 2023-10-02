import ShortUrl from "@/models/ShortUrl";
import connectToDB from "@/utils/connectToDB";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (requset: NextRequest, { params }: { params: { shorturl: string } }) => {
    console.log(params);
    const { shorturl } = params;
    try {
        await connectToDB();
        const document = await ShortUrl.findOne({
            short_url: `${process.env.NEXT_PUBLIC_BASE_URL}/s/${shorturl}`,
        });

        if (document) {
            console.log("Found document. Clicks before:", document.clicks);
            document.clicks += 1;
            console.log("Clicks after increment:", document.clicks);
            await document.save();
        }
        return NextResponse.json({
            result: document ? document.original_url : null,
        });

    } catch (error: any) {
        console.error("Error:", error.message);
        return NextResponse.json(
            {
                error: error.message,
            },
            { status: 500 },
        );
    }
};
