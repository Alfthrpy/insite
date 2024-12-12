
import { InvitationSchema } from "@/lib/definitions";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
      const id = params.id;
  
      // Ambil hanya ID dari invitation dan ID dari relasi terkait
      const invitation = await prisma.invitation.findUnique({
        where: { id },
        include:{
            Quote : true,
            Music : true,
            Design : true,
        }
      });
  
      // Pastikan data ditemukan
      if (!invitation) {
        return NextResponse.json({ error: "Invitation not found" }, { status: 404 });
      }
  
      return NextResponse.json(invitation, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }
  
  

export async function PATCH(req : Request,{ params }: { params: { id: string } }){
    try {
        const id = params.id
        const {...data} = await req.json()

        console.log(data)

        // Validasi data menggunakan zod
        const parsedData = InvitationSchema.safeParse(data);

        if (!parsedData.success) {
        // Ambil pesan error dari zod dan kirimkan sebagai respons
        const errorMessages = parsedData.error.errors.map((err) => err.message);
        console.error(errorMessages)

        return NextResponse.json(
            {
            error: "Validation failed",
            messages: errorMessages,
            },
            { status: 400 }
        );
        }

        const response = await prisma.invitation.update({
            where : {id},
            data : parsedData.data,
        })
        console.log(response)
        return NextResponse.json(response,{status:200})
    } catch (error) {
        return NextResponse.json(error,{status: 500});
    }
}

export async function DELETE({ params }: { params: { id: string } }){
    try {
        await prisma.invitation.delete({
            where : {
                id : params.id,
            }
        })
        return NextResponse.json({status:200})
    } catch (error) {
        return NextResponse.json(error,{status:500})
    }
}