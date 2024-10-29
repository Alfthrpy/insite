import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request,
    { params }: { params: { id: string } }) {
    try {
        const id = params.id
        const {...data } = await req.json();

        const response = await prisma.event.update({
            where: { id },
            data: {
                ...data,
                dateEvent: data.dateEvent ? new Date(data.dateEvent) : undefined,
                startTime: data.startTime ? new Date(data.startTime) : undefined,
                endTime: data.endTime ? new Date(data.endTime) : undefined,
            },
        });

        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}

export async function DELETE(req: Request,
    { params }: { params: { id: string } }) {
    try {
        const id = params.id

        await prisma.event.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Event deleted successfully" }, { status: 200 });
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
      const response = await prisma.event.findUnique({
        where: { id },
      });
  
      return NextResponse.json(response, { status: 200 });
    } catch (error) {
      return NextResponse.json(error, { status: 500 });
    }
  }

