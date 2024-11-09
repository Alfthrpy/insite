import { LoveStorySchema } from "@/lib/definitions";
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

    const response = await prisma.loveStory.update({
        where: { id},
        data : parsedData.data
    })

    return NextResponse.json(response,{status:200});

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE({ params }: { params: { id: string } }){
    try {
        const id = params.id
        const response = await prisma.loveStory.delete({
            where: { id },
        })
        return NextResponse.json(response,{status:500})
    } catch (error) {
        console.log(error)
        return NextResponse.json({error : "Internal Server Error"},{status:500})
    }
}

export async function GET(req:Request,{ params }: { params: { id: string } }) {
    try {
        const id = params.id
        const response = await prisma.loveStory.findUnique({
            where : {id}
        })

        return NextResponse.json(response,{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({error : "Internal Server Error"},{status:500})
    }
}
