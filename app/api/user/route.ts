import bcrypt from "bcrypt";
import { UserSchema } from "@/app/lib/definitions";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const { username, email, password } = UserSchema.parse(body);
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 400 }
      );
    }

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      const formattedErrors = error.errors.map((err) => ({
        field: err.path[0],
        message: err.message,
      }));

      return NextResponse.json({ errors: formattedErrors }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Internal server error", ror: error },
      { status: 500 }
    );
  }
}

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
