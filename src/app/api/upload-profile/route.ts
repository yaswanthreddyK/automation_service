import db from "@/lib/dbConnect";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function POST(request: Request){
    const {userId} = auth()
    if(!userId){
        return new NextResponse('Unauthorized', {status: 401})
    }
    const {profileImage, clerkId} = await request.json()
    try {
      await db.user.update({
            where: {
              clerkId: clerkId
            },
            data: {
              profileImage,
            }
          })
        return new NextResponse('Profile Image Updated', {status: 200})
    } catch (error) {
        console.log(error)
        return new NextResponse('Upload failed', {status: 500})
    }
   
}