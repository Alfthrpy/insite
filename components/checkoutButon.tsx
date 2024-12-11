'use client'

import { createTransaction, getMidtransToken, updatePaymentStatus } from '@/lib/actions';
import { DesignData, UserData } from '@/lib/interface';
import { useEffect } from 'react';

interface CheckoutButtonProps {
  data: DesignData;
  user: UserData;
  invitationId: string;  // ID untuk invitation yang akan di-update
}

export default function CheckoutButton({ data, user, invitationId }: CheckoutButtonProps) {
  useEffect(() => {
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = process.env.NEXT_PUBLIC_CLIENT || "";

    const script = document.createElement("script");
    script.src = snapScript;
    script.setAttribute("data-client-key", clientKey);
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleCheckout = async () => {
    try {
      // Create transaction
      const transaction = await createTransaction({
        designId: data.id,
        amount: data.price,
        userId: user.id,
      });

      // Get Midtrans token
      const midtransData = await getMidtransToken({
        paymentId: transaction.id,
        name: data.name,
        category: data.category,
        price: data.price,
        username: user.name,
        email: user.email,
      });

      // Initialize Midtrans payment
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).snap.pay(midtransData.token, {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSuccess: async (result: any) => {
          let status = result?.transaction_status || null;
          let method = result?.payment_type || null;

          while (!status || !method) {
            await new Promise((resolve) => setTimeout(resolve, 100));
            status = result?.transaction_status || null;
            method = result?.payment_type || null;
          }

          await updatePaymentStatus(transaction.id, status, method,invitationId,data.id);
         
        },
        onClose: async () => {
          await updatePaymentStatus(transaction.id, "gagal", "error",invitationId,data.id);
        },
        onError: () => {
          alert("error");
        },
      });
    } catch (error) {
      console.error("Checkout error:", error);
      alert("An error occurred during checkout");
    }
  };

  return (
    <button onClick={handleCheckout}>
      Beli
    </button>
  );
}
