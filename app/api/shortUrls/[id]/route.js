import dbConnect from "@/db";
import ShortUrl from "@/models/ShortUrl";
dbConnect();
// api/shortUrls/id
export const GET = async (req) => {
  console.log("Id:", req.params);
  const id = "";
  try {
    const results = await ShortUrl.findById(id);
    console.log(`api/shortUrls/`);
    return Response.json(results, { status: 500 });
  } catch (error) {
    console.log(`ERROR: api/shortUrls/`, error);
    return Response.json(error.message, { status: 500 });
  }
};
