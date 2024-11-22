import { GallerySchema } from "@/lib/definitions";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const { ...data } = await req.json();

    const parsedData = GallerySchema.safeParse(data);

    if (!parsedData.success) {
      const errorMessages = parsedData.error.errors.map((err) => err.message);

      return NextResponse.json(
        {
          error: "Validation failed",
          messages: errorMessages,
        },
        { status: 400 }
      );
    }

    const response = await prisma.gallery.update({
        where: { id},
        data : parsedData.data
    })

    return NextResponse.json(response,{status:200})

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req : Request,{ params }: { params: { id: string } }) {
    try {
        const id = params.id
        const response = await prisma.gallery.findUnique({
            where:{id}
        })

        return NextResponse.json(response,{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({error : "Internal Server Error"},{status:500})
    }
}

export async function DELETE(req : Request,{ params }: { params: { id: string } }) {
    try {
        const id = params.id
        const response = await prisma.gallery.delete({
            where:{id}
        })
        return NextResponse.json(response,{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({error : "Internal Server Error"},{status:500})
    }
}
