import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"


export async function POST(req : Request){
    try {
        const  {...data} = await req.json()
        const response = await prisma.paymentTransaction.create({
            data : {...data}
        })

        return NextResponse.json(response,{status:201})
    } catch (error) {
        console.log(error)
        return NextResponse.json({error : "Internal Server Error"},{status:500})
    }
}

export async function GET(){
    try {
        const response = await prisma.paymentTransaction.findMany()
        return NextResponse.json(response,{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({error : "Internal Server Error"},{status:500})
    }
}