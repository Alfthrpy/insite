import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";



export async function GET() {
  try {
    const allUser = await prisma.user.findMany();

    return NextResponse.json(allUser, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      { message: "internal server error", error: error },
      { status: 500 }
    );
  }
}
