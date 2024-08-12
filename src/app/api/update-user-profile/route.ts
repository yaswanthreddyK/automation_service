import db from "@/lib/dbConnect";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function POST(request: Request){
    const {userId} = auth()
    if(!userId){
        return new NextResponse('Unauthorized', {status: 401})
    }
    const {username, email} = await request.json()
    try {
      await db.user.update({
            where: {
              email,
            },
            data: {
              name: username
            }
          })
        return new NextResponse('User data Saved', {status: 200})
    } catch (error) {
        console.log(error)
        return new NextResponse('Details not saved', {status: 500})
    }
}