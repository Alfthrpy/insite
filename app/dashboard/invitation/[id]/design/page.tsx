"use client";
import { BackButton } from "@/components/button";
import CheckoutButton from "@/components/checkoutButon";
import { InvitationData, UserData } from "@/lib/interface";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Design {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  templateName: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export default function DesignPage() {
  const [designs, setDesigns] = useState<Design[] | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [invitationData, setInvitationData] = useState<InvitationData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session, status } = useSession();
  const { id: invitationId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch designs
        const designsResponse = await fetch("/api/design");
        if (!designsResponse.ok) {
          throw new Error("Failed to fetch designs");
        }
        const designsData = await designsResponse.json();
        setDesigns(designsData);

        // Fetch user data if session exists
        if (session?.user?.id) {
          const userResponse = await fetch(`/api/user/${session.user.id}`);
          if (!userResponse.ok) {
            throw new Error("Failed to fetch user data");
          }
          const userData = await userResponse.json();
          setUserData(userData);
        }

        // Fetch invitation data
        const invitationResponse = await fetch(
          `/api/invitation/${invitationId}`
        );
        const invitationData = await invitationResponse.json();
        setInvitationData(invitationData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    // Only run the fetch if the session status is not loading
    if (status !== "loading") {
      fetchData();
    }
  }, [session?.user?.id, status, invitationId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <BackButton/>
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
        <h1 className="text-center text-2xl sm:text-3xl font-bold mb-8">
          Design List
        </h1>

        {designs && designs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            {designs.map((design) => (
              <div
                key={design.id}
                className="flex flex-col bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative pt-[100%]">
                  <img
                    src={design.imageUrl}
                    alt={design.name}
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-t-lg"
                  />
                </div>

                <div className="p-4 flex flex-col gap-3 flex-grow">
                  <h2 className="font-semibold text-base text-center mb-2 line-clamp-2 min-h-[3rem]">
                    {design.name}
                  </h2>

                  <p className="text-center font-semibold text-purple text-lg mb-4">
                    Rp {design.price.toLocaleString("id-ID")}
                  </p>

                  <div className="flex flex-col gap-2 mt-auto">
                    <button className="w-full px-4 py-2 bg-purpleHover hover:bg-purple text-white rounded-md transition-colors duration-300 text-sm">
                      See Details
                    </button>
                    {userData && invitationData ? (
                      invitationData.designId !== design.id ? (
                        <CheckoutButton data={design} user={userData} invitationId={invitationId as string} />
                      ) : (
                        <button disabled>Sudah Dipakai</button>
                      )
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg">
            Desain belum tersedia
          </p>
        )}
      </div>
    </div>
  );
}
