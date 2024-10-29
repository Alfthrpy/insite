import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const { ...data } = await req.json();

    const response = await prisma.rsvp.update({
      where: { id },
      data: {
        ...data,
        numberOfPeople: data.numberOfPeople
          ? BigInt(data.numberOfPeople)
          : undefined,
      },
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
      where: { id },
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
      where: { id },
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
