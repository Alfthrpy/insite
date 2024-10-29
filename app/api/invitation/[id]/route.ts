import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET({ params }: { params: { id: string } }){
    try {
        const id = params.id
        const response = await prisma.invitation.findUnique({
            where : { id}
        })

        return NextResponse.json(response,{status:200})
    } catch (error) {
        return NextResponse.json(error,{status: 500});
    }
}

export async function PATCH(req : Request,{ params }: { params: { id: string } }){
    try {
        const id = params.id
        const {...data} = await req.json()
        const response = await prisma.invitation.update({
            where : {id},
            data : {
                ...data,
            }
        })

        return NextResponse.json(response,{status:200})
    } catch (error) {
        return NextResponse.json(error,{status: 500});
    }
}

export async function DELETE({ params }: { params: { id: string } }){
    try {
        await prisma.invitation.delete({
            where : {
                id : params.id,
            }
        })
        return NextResponse.json({status:200})
    } catch (error) {
        return NextResponse.json(error,{status:500})
    }
}