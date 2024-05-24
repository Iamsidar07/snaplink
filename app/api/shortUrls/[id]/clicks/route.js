import dbConnect from "@/db";
import ClickLog from "@/models/ClickLog";
dbConnect();
// api/shortUrls/id/clicks
export const GET = async (req) => {
  console.log("Id:", req.params);
  const id = "";
  try {
    const clickLog = await ClickLog.findOne({ urlId: id });
    console.log(`api/shortUrls/id/clicks
`);
    return Response.json(clickLog, { status: 500 });
  } catch (error) {
    console.log(
      `ERROR: api/shortUrls/id/clicks
`,
      error,
    );
    return Response.json(error.message, { status: 500 });
  }
};
