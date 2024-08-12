import db from "@/lib/dbConnect";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(request: Request,{params}: {params: {clerkId: string}}){
    const {userId} = auth()
    if(!userId){
        return new NextResponse('Unauthorized', {status: 401})
    }
    try {
        await db.user.update({
            where: {
              clerkId: params.clerkId
            },
            data: {
              profileImage: ''
            }
          })
        return new NextResponse('Profile Image removed', {status: 200})
    } catch (error) {
        console.log(error)
        return new NextResponse('Action not performed', {status: 500})
    }
   
}