// app/design/page.tsx
import { Suspense } from "react";
import { getServerSession } from "next-auth";
import CheckoutButton from "@/components/checkoutButon";
import { authOptions } from "@/lib/authOptions";

interface DesignData {
  id: string;
  name: string;
  category: string;
  price: number;
}

export default async function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center space-y-8">
      <Suspense fallback={<div>Loading...</div>}>
        <DesignList />
      </Suspense>
    </div>
  );
}

async function DesignList() {
  const session = await getServerSession(authOptions);
  console.log(session?.user.id)

  try {
    const token = process.env.SECRET_BEARER_TOKEN;
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/design`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const designs = await response.json();

    if (!session) {
      return (
        <div className="text-center">
          <p className="text-red-500">Please login to view and purchase designs</p>
          <ul className="mt-4 space-y-4">
            {designs.map((design: DesignData) => (
              <li
                key={design.id}
                className="border p-4 rounded-lg shadow-sm w-96"
              >
                <h3 className="font-semibold text-lg">{design.name}</h3>
                <p className="text-gray-600">Category: {design.category}</p>
                <p className="text-gray-800 font-medium">
                  Price: ${design.price.toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    return (
      <ul className="space-y-4">
        {designs.map((design: DesignData) => (
          <li
            key={design.id}
            className="border p-4 rounded-lg shadow-sm w-96"
          >
            <h3 className="font-semibold text-lg">{design.name}</h3>
            <p className="text-gray-600">Category: {design.category}</p>
            <p className="text-gray-800 font-medium">
              Price: ${design.price.toFixed(2)}
            </p>
            <div className="mt-4">
              <CheckoutButton
                data={{
                  designId: design.id,
                  name: design.name,
                  category: design.category,
                  price: design.price,
                }}
                user={{
                  id: session.user.id || '',
                  name: session.user.name || "",
                  email: session.user.email || "",
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    );
  } catch (error) {
    console.error("Error fetching design data:", error);
    return (
      <div className="text-red-500">
        Error loading designs. Please try again later.
      </div>
    );
  }
}