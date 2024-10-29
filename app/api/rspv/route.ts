import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const {
            invitationId,
            guestName,
            numberOfPeople,
            confirmationStatus = "pending"
        } = await req.json();

        const response = await prisma.rsvp.create({
            data: {
                invitationId,
                guestName,
                numberOfPeople: BigInt(numberOfPeople),
                confirmationStatus
            },
        });

        return NextResponse.json(response, { status: 201 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}

export async function GET() {
    try {
        const response = await prisma.rsvp.findMany();
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}

