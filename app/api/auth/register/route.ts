
import { NextResponse } from "next/server"
import bcrypt from 'bcrypt';
import { prisma } from "@/lib/prisma";


export async function POST(req: Request) {
    try {
      const { email, password, name } = await req.json();
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const response = await prisma.user.create({
        data: { email: email, password: hashedPassword, name: name },
      });
  
      return NextResponse.json(response, { status: 201 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error.message);
  
      if (error.code === "P2002") {
        // Kode error P2002 menandakan bahwa ada pelanggaran unik
        return NextResponse.json(
          { message: "Email sudah terdaftar." },
          { status: 400 }
        );
      }
  
      // Untuk kesalahan lainnya
      return NextResponse.json(
        { message: "Terjadi kesalahan pada server." },
        { status: 500 }
      );
    }
  }