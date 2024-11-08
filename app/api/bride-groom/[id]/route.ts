import { BrideGroomSchema } from "@/lib/definitions";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const { ...data } = await req.json();

    const parsedData = BrideGroomSchema.safeParse(data);
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

    const response = await prisma.brideGroom.update({
      where: { id },
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

    await prisma.brideGroom.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "BrideGroom deleted successfully" },
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
    const response = await prisma.brideGroom.findUnique({
      where: { id },
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
