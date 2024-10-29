import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const {
            invitationId,
            nameEvent,
            location,
            address,
            dateEvent,
            startTime,
            endTime,
            linkNavigationMap
        } = await req.json();

        const response = await prisma.event.create({
            data: {
                invitationId,
                nameEvent,
                location,
                address,
                dateEvent: new Date(dateEvent),
                startTime: new Date(startTime),
                endTime: new Date(endTime),
                linkNavigationMap,
            },
        });

        return NextResponse.json(response, { status: 201 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}

export async function GET() {
    try {
        const response = await prisma.event.findMany();
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}

