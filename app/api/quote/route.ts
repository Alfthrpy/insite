import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(){
    try {
        const response = await prisma.quote.findMany()
        return NextResponse.json(response,{status: 200})
    } catch (error) {
        return NextResponse.json(error,{status:500});
    }
}

export async function POST(req: Request){
    try {
        const {...data} = await req.json()

        const response = await prisma.quote.create({
            data : {
                ...data
            }
        })

        return NextResponse.json(response,{status:201})

    } catch (error) {
        return NextResponse.json(error,{status:500});
    }
}