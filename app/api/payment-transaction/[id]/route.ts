import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function PATCH(req : Request,{ params }: { params: { id: string } }){
    try {
        const id = params.id
        const {...data} = await req.json()

        const response = await prisma.paymentTransaction.update({
            where:{id},
            data : {...data}
        })
        return NextResponse.json(response,{status: 200})
    } catch (error) {
        console.error(error);
        return NextResponse.json({error:"Internal Server Error"},{status:500})
    }
}

export async function GET({ params }: { params: { id: string } }){
    try {
        const id = params.id
        const response = await prisma.paymentTransaction.findUnique({
            where:{id},
        })

        return NextResponse.json(response,{status: 200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({error:"Internal Server Error"},{status:500})
    }
}