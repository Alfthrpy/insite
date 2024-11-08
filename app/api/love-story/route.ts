import { LoveStorySchema } from "@/lib/definitions";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Parse request body
    const { ...data } = await req.json();

    // Validasi data menggunakan zod
    const parsedData = LoveStorySchema.safeParse(data);
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

    // Jika validasi berhasil, lanjutkan dengan penyimpanan ke database
    const response = await prisma.loveStory.create({
      data: parsedData.data,
    });

    // Kembalikan response berhasil
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(){
    try {
        const response = await prisma.loveStory.findMany()
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status:500})
    }
}
