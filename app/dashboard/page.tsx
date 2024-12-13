"use client";
import { DesignData, InvitationData } from "@/lib/interface";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const session = useSession();
  const [invitationData, setInvitationData] = useState<InvitationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [templateData, setTemplateData] = useState<DesignData[]>([]);
  const router = useRouter()
  const userId = session?.data?.user?.id;

  console.log(userId)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      if (userId) {
        // Fetch Invitation Data
        try {
          const invitationRes = await fetch(`/api/invitation?userId=${userId}`);
          if (!invitationRes.ok) {
            throw new Error("Failed to fetch invitation data");
          }
          const invitationData = await invitationRes.json();
          setInvitationData(invitationData);
        } catch (error) {
          console.error("Error fetching invitation data:", error);
        }

        // Fetch Template Data
        try {
          const templateRes = await fetch("/api/design");
          if (!templateRes.ok) {
            throw new Error("Failed to fetch template data");
          }
          const templateData = await templateRes.json();
          setTemplateData(templateData);
        } catch (error) {
          console.error("Error fetching template data:", error);
        }
      }
      setIsLoading(false);
    };

    fetchData();
  }, [userId]); // Trigger effect when userId changes

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="p-5 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4">Selamat Datang di Dashboard Insite</h1>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 text-center sm:text-left">Undangan Milikmu</h2>
          <div className="border-2 border-gray-300 rounded-lg p-4 flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center">
              <img src="./img/couple.png" alt="wedding" className="w-10 h-10" />
              <div className="ml-3">
                <h3 className="font-bold text-sm sm:text-lg">{invitationData?.name || "Loading..."}</h3>
                <p className="text-sm">{invitationData?.link || "-"}</p>
              </div>
            </div>
            <button className="btn btn-neutral" onClick={()=>router.push(invitationData?.link as string)}>
              <img src="./img/fiturLightMode/web.png" alt="View" className="inline-block w-4 mr-2" />
              Lihat Web
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 justify-center sm:justify-between">
          <Link
            href={`/dashboard/invitation/${invitationData?.id}`}
            className={`btn bg-gray-800 text-white px-4 py-2 rounded-md w-full sm:w-auto ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <>
                <img src="./img/fiturLightMode/settings.png" alt="Settings" className="inline-block w-4 mr-2" />
                Kelola
              </>
            )}
          </Link>
          <button className="btn bg-gray-800 text-white px-4 py-2 rounded-md w-full sm:w-auto">
            <img src="./img/fiturLightMode/send.png" alt="Share" className="inline-block w-4 mr-2" />
            Bagikan
          </button>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-3 text-center sm:text-left">Template</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {templateData.map((template, index) => (
              <div key={index} className="relative w-full h-40 overflow-hidden rounded-lg shadow-md">
                <img
                  src={template.imageUrl}
                  alt={`Template ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <button className="mt-4 btn btn-neutral px-4 py-2 rounded-md w-full sm:w-auto mx-auto block">
            Cek Template Tersedia
          </button>
        </div>
      </div>
    </div>
  );
}
