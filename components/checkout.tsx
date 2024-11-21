"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";

interface CheckoutPageProps {
  data: {
    designId: string;
    name: string;
    category: string;
    price: number;
  };
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ data }) => {
  const { data: session } = useSession(); // Ambil sesi pengguna

  const checkout = async () => {
    if (!session) {
      console.error("User not authenticated");
      return;
    }

    // Step 1: Buat transaksi (cek jika sudah ada transaksi yang sedang diproses)
    const transactionResponse = await fetch("/api/payment-transaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        designId: data.designId,
        amount: data.price,
        userId: session.user.id,
      }),
    });

    const transactionData = await transactionResponse.json();
    console.log(transactionData);
    const paymentId = transactionData.id;

    // Step 2: Panggil Midtrans
    const response = await fetch("/api/midtrans-tokenizer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paymentId: paymentId,
        name: data.name,
        category: data.category,
        price: data.price,
        user_name: session.user.name,
        email: session.user.email,
      }),
    });

    const requestData = await response.json();

    // Step 3: Lakukan pembayaran dengan Midtrans
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).snap.pay(requestData.token, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onSuccess: async (result: any) => {
        let status = result?.transaction_status || null;
        let method = result?.payment_type || null;

        // Loop hingga status dan method memiliki nilai
        while (!status || !method) {
          await new Promise((resolve) => setTimeout(resolve, 100)); // tunggu 100 ms sebelum cek ulang
          status = result?.transaction_status || null;
          method = result?.payment_type || null;
        }

        console.log(status, method);

        try {
          await fetch(`/api/payment-transaction/${paymentId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              paymentStatus: status,
              paymentMethod: method,
            }),
          });
        } catch (error) {
          console.error("Error during onSuccess handling:", error);
        }
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onClose: async () => {
        // Mengatur status menjadi "gagal" jika transaksi dibatalkan
        try {
          await fetch(`/api/payment-transaction/${paymentId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              paymentStatus: "gagal",
              paymentMethod : "error"
            }),
          });
        } catch (error) {
          console.error("Error during onClose handling:", error);
        }
      },
      onError : async () => {
        alert("error")
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any

    });
  };

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

  return (
    <>
      <button onClick={checkout}>Coba Midtrans</button>
    </>
  );
};

export default CheckoutPage;
