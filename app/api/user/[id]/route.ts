import { UpdateUserSchema} from "@/app/lib/definitions";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { NextResponse } from "next/server";
import { z } from "zod";



export async function PATCH( req: Request,
  { params }: { params: { id: string } }) {
  const body = await req.json();

  // Validasi input menggunakan Zod
  try {
    const { username, email } = UpdateUserSchema.parse(body);

    // Misalkan id pengguna diterima dari query parameter atau session
    const userId = params.id; 

    // Cek apakah user ada di database
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const existingUserEmail = await prisma.user.findUnique({
      where: { email: email },
    });
    if (existingUserEmail) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 400 }
      );
    }

    // Update user di database
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        username: username || existingUser.username, // Update jika ada
        email: email || existingUser.email, // Update jika ada
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Format dan kirim Zod error sebagai respons
      const formattedErrors = error.errors.map((err) => ({
        field: err.path[0],
        message: err.message,
      }));
      return NextResponse.json({ errors: formattedErrors }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Internal server error", ror : error },
      { status: 500}
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  try {
    const response = await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json(response, { status: 200 });
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

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    return NextResponse.json(user, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
