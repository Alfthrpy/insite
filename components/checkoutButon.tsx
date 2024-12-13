'use client'

import { createTransaction, getMidtransToken, updatePaymentStatus } from '@/lib/actions';
import { DesignData, UserData } from '@/lib/interface';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

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
    script.onload = () => console.log("Midtrans Snap Script Loaded");
    script.onerror = () => console.error("Midtrans Snap Script Failed to Load");

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleCheckout = async () => {
    toast.success('test')
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
          try {
            console.log("onSuccess result:", result);
            
            const status = result?.transaction_status || null;
            const method = result?.payment_type || null;
            
            console.log("Payment Status:", status, "Payment Method:", method);
            
            await updatePaymentStatus(transaction.id, status, method, invitationId, data.id);
            
            // Show success toast before page refresh
  
            // Set delay before page refresh to allow the toast to be shown
            setTimeout(() => {
              toast.success("Pembayaran Berhasil!");
              window.location.reload();
            }, 5000); // Delay for 1.5 seconds (adjust as needed)
            
          } catch (error) {
            console.error("Error during onSuccess:", error);
          }
        },
        onClose: async () => {
          await updatePaymentStatus(transaction.id, "gagal", "error", invitationId, data.id);
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
