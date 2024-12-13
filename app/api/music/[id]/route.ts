import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"


export async function GET(req:Request,{ params }: { params: { id: string } }){
    try {
        const id = params.id
        const response = await prisma.music.findUnique(
            {
                where: { id},
            }
        )

        return NextResponse.json(response,{status:200})
    } catch (error) {
        return NextResponse.json(error,{status:500})
    }
}

export async function DELETE(req:Request,{ params }: { params: { id: string } }){
    try {
        const id = params.id
        await prisma.music.delete({
            where : {id}
        })

        return NextResponse.json({status:200})
    } catch (error) {
        return NextResponse.json(error,{status:500})
    }
}