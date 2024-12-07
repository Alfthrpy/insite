"use server";

import { z } from "zod";
import { BrideGroomSchema, EventSchema } from "./definitions";
import { revalidatePath } from "next/cache";

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
  user_name,
  email,
}: {
  paymentId: string;
  name: string;
  category: string;
  price: number;
  user_name: string;
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
        user_name,
        email,
      }),
    }
  );

  return response.json();
}

export async function updatePaymentStatus(
  paymentId: string,
  status: string,
  method: string
) {
  await fetch(
    `${process.env.NEXTAUTH_URL}/api/payment-transaction/${paymentId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paymentStatus: status,
        paymentMethod: method,
      }),
    }
  );
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