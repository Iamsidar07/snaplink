import ShortUrl from "@/models/ShortUrl";
import { connectToDatabase } from "@/utils/connectToDB";
import { NextRequest, NextResponse } from "next/server";
import * as dns from "node:dns";
import { getAuth } from "@clerk/nextjs/server";
import { nanoid } from "nanoid";
import QRCode from "qrcode";
export const POST = async (request: NextRequest) => {
  const requestBody = await request.json();
  const { url } = requestBody;
  const original_url = url;
  const { hostname } = new URL(url);
  const { userId } = getAuth(request);
  try {
    await connectToDatabase();
    dns.lookup(hostname, async (err) => {
      if (err) {
        console.error("Url validation has been failed.");
        return NextResponse.json(
          {
            error: "invalid url",
          },
          { status: 400 },
        );
      }
    });
    const shortId = nanoid(8);
    const makeShortUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/s/${shortId}`;
    const qrcode = await QRCode.toDataURL(makeShortUrl);
    const document = await ShortUrl.create({
      original_url,
      userId: userId || "",
      short_url: makeShortUrl,
      qrcode,
    });
    const short_url = document?.short_url;
    return NextResponse.json(
      {
        original_url,
        short_url,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 },
    );
  }
};
