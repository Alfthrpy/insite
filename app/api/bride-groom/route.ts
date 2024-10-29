import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export default async function POST(req : Request){
    try {
        const {
            invitationId,
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
          } = await req.json()


          const response = await prisma.brideGroom.create({
            data: {
                invitationId,
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

          return NextResponse.json(response,{status:201})
    } catch (error) {
        return NextResponse.json(error,{status:500})
    }
}

export async function GET() {
    try {
        const response = await prisma.brideGroom.findMany()
        return NextResponse.json(response,{status:200})
    } catch (error) {
        return NextResponse.json(error,{status:500})
    }
}