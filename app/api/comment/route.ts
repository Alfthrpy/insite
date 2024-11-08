import { CommentSchema } from "@/lib/definitions";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const reponse = await prisma.comment.findMany();
    return NextResponse.json(reponse, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { ...data } = await req.json();

    const parsedData = CommentSchema.safeParse(data);
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
    const response = await prisma.comment.create({
      data: parsedData.data,
    });
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
