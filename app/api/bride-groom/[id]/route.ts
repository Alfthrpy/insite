import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request,
    { params }: { params: { id: string } }) {
    try {
        const id =  params.id
        const {
            nameGroom,
            imageGroom,
            parentGroom,
            linkInstagramGroom,
            linkFbGroom,
            linkTwitterGroom,
            linkYtbGroom,
            nameBride,
            imageBride,
            parentBride,
            linkInstagramBride,
            linkFbBride,
            linkTwitterBride,
            linkYtbBride,
        } = await req.json();

        const response = await prisma.brideGroom.update({
            where: { id },
            data: {
                nameGroom,
                imageGroom,
                parentGroom,
                linkInstagramGroom,
                linkFbGroom,
                linkTwitterGroom,
                linkYtbGroom,
                nameBride,
                imageBride,
                parentBride,
                linkInstagramBride,
                linkFbBride,
                linkTwitterBride,
                linkYtbBride,
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

        await prisma.brideGroom.delete({
            where: { id },
        });

        return NextResponse.json({ message: "BrideGroom deleted successfully" }, { status: 200 });
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
      const response = await prisma.brideGroom.findUnique({
        where: { id },
      });
  
      return NextResponse.json(response, { status: 200 });
    } catch (error) {
      return NextResponse.json(error, { status: 500 });
    }
  }

