import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    console.log(req.body)
    const jsonData = await req.json();
    try {
      const id = params.id;
  
      // Mencoba membaca JSON dari request body

      console.log("Received JSON data:", jsonData);
  
      const { paymentStatus, paymentMethod } = jsonData;
  
      if (!paymentStatus || !paymentMethod) {
        return NextResponse.json({ error: "Missing payment data" }, { status: 400 });
      }
  
      const response = await prisma.paymentTransaction.update({
        where: { id },
        data: {
          paymentStatus,
          paymentMethod,
        },
      });
  
      return NextResponse.json(response, { status: 200 });
    } catch (error) {
      console.error("Error updating payment statuses:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }
  

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        const response = await prisma.paymentTransaction.findUnique({
            where: { id },
        });

        // Pengecekan jika data tidak ditemukan
        if (!response) {
            return NextResponse.json({ error: "Payment transaction not found" }, { status: 404 });
        }

        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("Error retrieving payment transaction:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
