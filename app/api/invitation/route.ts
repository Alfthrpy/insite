import { InvitationSchema } from "@/lib/definitions";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function POST(req: Request){
    try {
        const {...data} = await req.json()

        // Validasi data menggunakan zod
        const parsedData = InvitationSchema.safeParse(data);

        if (!parsedData.success) {
        // Ambil pesan error dari zod dan kirimkan sebagai respons
        const errorMessages = parsedData.error.errors.map((err) => err.message);

        return NextResponse.json(
            {
            error: "Validation failed",
            messages: errorMessages,
            },
            { status: 400 }
        );
        }

        const response = await prisma.invitation.create({
            data: parsedData.data
        })

        return NextResponse.json(response,{status: 201})

    } catch (error) {
        return NextResponse.json(error,{status:500});
    }
}

export async function GET(req:Request){

    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    try {

        if(userId){
            const response = await prisma.invitation.findFirst({
                where: {
                    userId: userId
                },
            })
            return NextResponse.json(response,{status:200})
        } else {
            const response = await prisma.invitation.findMany()
            return NextResponse.json(response,{status:200})
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json(error,{status:500})
    }
}