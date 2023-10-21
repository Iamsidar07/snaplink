import ShortUrl from "@/models/ShortUrl";
import connectToDatabase from "@/utils/connectToDB";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } },
) => {
  const { id } = params;
  try {
    await connectToDatabase();
    const document = await ShortUrl.findByIdAndDelete(id);

    return NextResponse.json(
      {
        result: document,
      },
      { status: 200 },
    );
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

export const GET = async (
  request: NextRequest,
  { params }: { params: { shorturl: string } },
) => {
  const { shorturl } = params;
  try {
    await connectToDatabase();
    const document = await ShortUrl.findOne({
      short_url: `${process.env.NEXT_PUBLIC_BASE_URL}/s/${shorturl}`,
    });
    if (!document)
      return NextResponse.json(
        {
          error: "NOT FOUND",
        },
        { status: 404 },
      );

    console.log("Found document. Clicks before:", document.clicks);
    document.clicks += 1;
    console.log("Clicks after increment:", document.clicks);
    await document.save();

    return NextResponse.json(
      {
        result: document ? document.original_url : null,
      },
      { status: 200 },
    );
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
