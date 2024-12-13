import { RsvpSchema } from "@/lib/definitions";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    const { ...data } = await req.json();

    // Validasi data menggunakan zod
    const parsedData = RsvpSchema.safeParse(data);

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

    const response = await prisma.rsvp.update({
      where: { id : parseInt(id) },
      data: parsedData.data,
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    await prisma.rsvp.delete({
      where: { id : parseInt(id) },
    });

    return NextResponse.json(
      { message: "RSVP deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const response = await prisma.rsvp.findUnique({
      where: { id :parseInt(id) },
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
