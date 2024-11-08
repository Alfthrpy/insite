import { ReviewSchema } from "@/lib/definitions";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await prisma.review.findMany();
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { ...data } = await req.json();
    const parsedData = ReviewSchema.safeParse(data);
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

    const response = await prisma.review.create({
        data: parsedData.data
    })

    return NextResponse.json(response,{ status: 201})

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
