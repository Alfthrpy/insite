import { EventSchema } from "@/lib/definitions";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const {...data} = await req.json();

        // Validasi data menggunakan zod
        const parsedData = EventSchema.safeParse(data);

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
        
        const response = await prisma.event.create({
            data: parsedData.data
        });

        return NextResponse.json(response, { status: 201 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const invitationId = url.searchParams.get("invitationId");

    if (!invitationId) {
      return NextResponse.json({ error: "invitationId is required" }, { status: 400 });
    }

    const response = await prisma.event.findFirst({
      where: { invitationId: invitationId },
    });

    if (!response) {
      return NextResponse.json({ error: "event not found" }, { status: 404 });
    }

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

