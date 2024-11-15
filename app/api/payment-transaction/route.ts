import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"


export async function POST(req: Request) {
    try {
        const { designId,userId , amount} = await req.json();

        // Tentukan data transaksi berdasarkan jenis transaksi
        const transactionData = {
            designId,
            userId,
            amount
        };

        const response = await prisma.paymentTransaction.create({
            data: transactionData,
        });

        return NextResponse.json(response, { status: 201 });
    } catch (error) {
        console.error("Error creating transaction:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
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