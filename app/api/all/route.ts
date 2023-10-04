import ShortUrl from "@/models/ShortUrl";
import connectToDB from "@/utils/connectToDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const searchParamas = request.nextUrl.searchParams;
  const userId = searchParamas.get("userId");
  const sortBy = searchParamas.get("sortBy");
  let query: any = {};
  switch (sortBy) {
    case "clicks":
      query["clicks"] = -1;
      break;
    case "date":
      query["createdAt"] = -1;
      break;
    default:
      break;
  }
  if (!userId) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      { status: 400 },
    );
  }
  try {
    await connectToDB();
    const urls = await ShortUrl.find({ userId }).sort(query);
    if (urls) {
      return NextResponse.json(
        {
          result: urls,
        },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        {
          error: "invalid userid",
        },
        { status: 400 },
      );
    }
  } catch (error: any) {
    console.log("Somthing went wrong!", error.message);
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 },
    );
  }
};

export const DELETE = async (request: NextRequest) => {
  const searchParamas = request.nextUrl.searchParams;
  const userId = searchParamas.get("userId");
  if (!userId) {
    return NextResponse.json({
      error: "Unauthorized",
    }, { status: 401 })
  }
  try {
    await connectToDB();
    await ShortUrl.deleteMany({ userId });
    return NextResponse.json({
      result: "success",
    }, { status: 200 })
  } catch (error: any) {
    console.log("Something went wrong!", error.message);
    return NextResponse.json({
      error: error.message
    }, { status: 500 })
  }
}