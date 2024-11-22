"use server";

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
    console.log(userId)
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
