import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET({ params }: { params: { id: string } }){
    try {
        const id = params.id
        const response = await prisma.comment.findUnique({
            where: { id}
        })
        return NextResponse.json(response,{status: 200})
    } catch (error) {
        return NextResponse.json(error,{status:500})
    }
}

