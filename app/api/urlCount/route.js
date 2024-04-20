import dbConnect from "@/db";
import UrlModel from "@/db/models/Url";

export const GET = async()=>{
    try{
        await dbConnect()
        const urlCount = await UrlModel.countDocuments({})
        return Response.json(urlCount, {status:  200})
    }catch (e) {
        return Response.json(e.message, {status: 500})
    }
}