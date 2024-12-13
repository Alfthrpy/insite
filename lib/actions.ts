"use server";

import { z } from "zod";
import { BrideGroomSchema, EventSchema } from "./definitions";
import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";
import { RsvpData } from "./interface";

interface CreateTransactionParams {
  designId: string;
  amount: number;
  userId: string;
}
const token = process.env.SECRET_BEARER_TOKEN;
export async function createTransaction({
  designId,
  amount,
  userId,
}: CreateTransactionParams) {
  console.log(userId);
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/payment-transaction`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        designId,
        userId,
        amount,
      }),
    }
  );

  const data = await response.json();
  console.log(data);
  return data;
}

export async function getMidtransToken({
  paymentId,
  name,
  category,
  price,
  username,
  email,
}: {
  paymentId: string;
  name: string;
  category: string;
  price: number;
  username: string;
  email: string;
}) {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/midtrans-tokenizer`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paymentId,
        name,
        category,
        price,
        username,
        email,
      }),
    }
  );

  return response.json();
}

export async function updatePaymentStatus(
  paymentId: string,
  status: string,
  method: string,
  invitationId: string,
  designId: string,
) {
  console.log("Enter updatePaymentStatus");
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/payment-transaction/${paymentId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentStatus: status,
          paymentMethod: method,
        }),
      }
    );
    console.log("PATCH response:", response.status);
    if (!response.ok) {
      throw new Error(`Failed to update payment transaction. Status: ${response.status}`);
    }

    // Hanya panggil jika status bukan 'gagal'
    if (status !== "gagal") {
      console.log("Calling updateInvitationData");
      await updateInvitationData(invitationId, designId);
    }

    console.log("Finished updatePaymentStatus");
  } catch (error) {
    console.error("Error in updatePaymentStatus:", error);
    throw error; // Re-throw error for higher-level handling
  }
}


export async function updateInvitationData(invitationId: string, designId: string) {
  console.log("Enter updateInvitationData");
  try {
    const updatedInvitation = await prisma.invitation.update({
      where: { id: invitationId },
      data: { designId: designId },
    });
    console.log("Updated Invitation:", updatedInvitation);

    console.log("Calling updateLink");
    await updateLink(invitationId, designId);
  } catch (error) {
    console.error("Error in updateInvitationData:", error);
    throw error; // Propagate error to caller
  }
}



export type UpdateBrideGroomFormState = {
  message: string;
  errors?: {
    [K in keyof z.infer<typeof BrideGroomSchema>]?: string[];
  };
};

export async function updateBrideGroom(
  id: string,
  formData: z.infer<typeof BrideGroomSchema>
): Promise<UpdateBrideGroomFormState> {
  try {
    // Validate the input data
    const validatedFields = BrideGroomSchema.safeParse(formData);

    // If validation fails, return the errors
    if (!validatedFields.success) {
      return {
        message: "Invalid fields",
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    // Make the API request
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/bride-groom/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SECRET_BEARER_TOKEN}`,
        },
        body: JSON.stringify(validatedFields.data),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        message: errorData.message || "Failed to update event data",
      };
    }

    // Revalidate the cache for this page
    revalidatePath("/bride-groom");

    return {
      message: "Successfully updated event data",
    };
  } catch (error) {
    console.log(error);
    return {
      message: "An unexpected error occurred",
    };
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateEvent(id: string, formData: any) {
  try {
    const validatedFields = EventSchema.safeParse(formData);

    if (!validatedFields.success) {
      return {
        message: "Invalid fields",
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/event/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SECRET_BEARER_TOKEN}`,
        },
        body: JSON.stringify(validatedFields.data),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        message:
          errorData.message || "Failed to update bride and groom information",
      };
    }

    // Revalidate the cache for this page
    revalidatePath("/bride-groom");

    return {
      message: "Successfully updated event data",
    };
  } catch (error) {
    console.log(error);
    return {
      message: "An unexpected error occurred",
    };
  }
}

// services/invitationService.ts
export async function validateInvitation(invitationId: string): Promise<boolean> {
  try {
    // Replace with your actual API call to validate invitation
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/invitation/${invitationId}`);
   
    if (!response.ok) {
      return false;
    }

   
    
    // Explicitly return a boolean value
    return true
  } catch (error) {
    console.error('Validation error:', error);
    return false;
  }
}


export async function confirmRsvp(rspvId:number){
  await prisma.rsvp.update({
    where : {id:rspvId},
    data : {confirmationStatus : 'confirmed'}
  })
}

export async function createRsvp({...data}:RsvpData){
  await prisma.rsvp.create({
    data : data
  })
}


export async function updateLink(invitationId:string,designId:string){
  try {
    const response = await prisma.design.findFirst({where:{id:designId}})
  
    await prisma.invitation.update({
      where : {id:invitationId},
      data : {link : `${process.env.NEXT_PUBLIC_CLIENT_URL}/template/${response?.templateName}/${invitationId}`}
    })
    
  } catch (error) {
    console.log(error)
  }
}

export async function createDummy(invitationId: string){
  await prisma.gift.create({
    data: {
      invitationId: invitationId,
      nameAccount: "Budi",
      noAccount: "1234567890",
      imgAccount: "https://placehold.co/600x400",
    },
  });

  await prisma.event.create({
    data: {
      invitationId: invitationId,
      nameEvent: "Akad Nikah",
      location: "Gedung Serbaguna",
      address: "Jl. Contoh No. 1",
      dateEvent: new Date("2023-12-25T10:00:00Z"),
      startTime: new Date("2023-12-25T10:00:00Z"),
      endTime: new Date("2023-12-25T12:00:00Z"),
      linkNavigationMap: "https://maps.example.com/location",
    },
  });

  await prisma.brideGroom.create({
    data: {
      invitationId: invitationId,
      nameGroom: "Budi",
      imageGroom: "https://placehold.co/600x400",
      parentGroom: "Orang Tua Budi",
      nameBride: "Ani",
      imageBride: "https://placehold.co/600x400",
      parentBride: "Orang Tua Ani",
      linkInstagramGroom: "https://instagram.com/budi",
      linkFbGroom: "https://facebook.com/budi",
      linkTwitterGroom: "https://twitter.com/budi",
      linkYtbGroom: "https://youtube.com/budi",
      linkInstagramBride: "https://instagram.com/ani",
      linkFbBride: "https://facebook.com/ani",
      linkTwitterBride: "https://twitter.com/ani",
      linkYtbBride: "https://youtube.com/ani",
    },
  });

  await prisma.event.create({
    data: {
      invitationId: invitationId,
      nameEvent: "Akad Nikah",
      location: "Gedung Serbaguna",
      address: "Jl. Contoh No. 1",
      dateEvent: new Date("2023-12-25T10:00:00Z"),
      startTime: new Date("2023-12-25T10:00:00Z"),
      endTime: new Date("2023-12-25T12:00:00Z"),
      linkNavigationMap: "https://maps.example.com/location",
    },
  });

  await prisma.gift.create({
    data: {
      invitationId: invitationId,
      nameAccount: "Budi",
      noAccount: "1234567890",
      imgAccount: "https://placehold.co/600x400",
    },
  });

  await prisma.loveStory.create({
    data: {
      invitationId: invitationId,
      title: "Pertemuan Pertama",
      story: "Kami bertemu di suatu acara dan jatuh cinta.",
      imageUrl: "https://placehold.co/600x400",
    },
  });

  await prisma.gallery.create({
    data: {
      invitationId: invitationId,
      imageUrl: "https://placehold.co/600x400",
    },
  });


}


export async function checkRsvp(rspvId:number) {
  const data = await prisma.rsvp.findFirst({
    where : {id: rspvId},
  })

  if(data){
    return true
  } else {
    return false
  }
}