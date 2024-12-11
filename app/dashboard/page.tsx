"use client";
import { DesignData, InvitationData } from "@/lib/interface";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { Suspense, useEffect, useState } from "react";

export default function Dahsboard() {
  const session = useSession();
  const [invitationData, setInvitationData] = useState<InvitationData>();
  const [isLoading, setIsLoading] = useState(true);
  const [templateData, setTemplateData] = useState<DesignData[]>([]);

  const userId = session?.data?.user.id;
  useEffect(() => {
    if (userId) {
      const fetchInvitation = async () => {
        try {
          setIsLoading(true);
          const response = await fetch(`/api/invitation?userId=${userId}`);
          if (!response.ok) {
            throw new Error("Failed to fetch invitation data");
          }
          const data = await response.json();
          setInvitationData(data);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };
      const fetchDesign = async () => {
        try {
          setIsLoading(true);
          const response = await fetch("api/design");
          if (!response.ok) {
            throw new Error("Error fetching design");
          }
          const data = await response.json();
          setTemplateData(data);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchDesign();
      fetchInvitation();
    } else {
      setIsLoading(false);
    }
  }, [session?.data?.user.id]);

  return (
    <div className="container w-full px-4 sm:w-4/5 lg:w-full m-4">
      <div className="container p-5 rounded-box bg-white">
        <div className="flex flex-col lg:flex-row gap-6 p-3 justify-center xl:justify-between">
          {/* Card utama */}
          <div className="card rounded-md h-full xl:grow w-full sm:w-96 gap-3">
            <p className="font-bold text-2xl sm:text-3xl mb-6 sm:mb-10 text-center lg:text-left">
              Selamat Datang di <br /> Dashboard Insite
            </p>
            <p className="font-bold text-lg sm:text-xl text-center lg:text-left">
              Undangan Milikmu
            </p>
            <Suspense fallback={<div>loading...</div>}>
              <div className="border-2 border-purpleHover rounded-md flex h-20 items-center justify-between px-4">
                <div className="flex items-center">
                  <img src="./img/couple.png" alt="wedding" />
                  <div className="flex flex-col items-start gap-1 ml-2">
                    <h1 className="text-base sm:text-xl font-bold text-neutral m-0 leading-none pr-2">
                      {invitationData?.name || "Loading..."}
                    </h1>
                    <h1 className="text-sm text-neutral m-0 leading-none">
                      {invitationData?.link || "-"}
                    </h1>
                  </div>
                </div>
                <div className="btn bg-purpleHover hover:bg-purpleSecondary ml-auto items-center justify-start">
                  <img
                    src="./img/fiturLightMode/web.png"
                    alt="wedding"
                    className="w-6"
                  />
                  <div className="flex flex-col items-start gap-1">
                    <h1 className="text-md text-base-100 m-0 leading-none">
                      Lihat web
                    </h1>
                  </div>
                </div>
              </div>
            </Suspense>
            {/* Tombol Bagikan dan Kelola */}
            <div className="flex flex-wrap justify-center lg:justify-between gap-3 mt-4">
              <Link
                href={`/dashboard/invitation/${invitationData?.id}`}
                className={`btn no-animation bg-neutral rounded-md flex h-16 items-center justify-start px-4 flex-1 ${
                  isLoading ? "cursor-not-allowed opacity-50" : ""
                }`}
                onClick={(e) => isLoading && e.preventDefault()}
              >
                {isLoading ? (
                  <span className="loading loading-spinner loading-sm mr-2"></span>
                ) : (
                  <img
                    src="./img/fiturLightMode/settings.png"
                    alt="wedding"
                    className="w-8"
                  />
                )}
                <div className="flex flex-col items-start gap-1 ml-2">
                  <span className="text-sm sm:text-xl font-bold text-base-100 m-0 leading-none">
                    {isLoading ? "Memuat..." : "Kelola"}
                  </span>
                </div>
              </Link>
  
              <div className="btn no-animation bg-neutral rounded-md flex h-16 items-center justify-start px-4 flex-1">
                <img
                  src="./img/fiturLightMode/send.png"
                  alt="wedding"
                  className="w-8"
                />
                <div className="flex flex-col items-start gap-1 ml-2">
                  <h1 className="text-sm sm:text-xl font-bold text-base-100 m-0 leading-none">
                    Bagikan
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="divider xl:divider-horizontal hidden lg:block"></div>
          {/* Template Section */}
          <div className="card lg:flex-none rounded-md mt-7 lg:mt-0 w-full sm:w-96">
            <p className="self-center font-bold mb-1 text-center lg:text-left">
              Template
            </p>
            <div className="carousel carousel-vertical rounded-box h-[50vh] sm:h-96 place-items-center">
              {/* Map melalui templateData */}
              {templateData.map((src, index) => (
                <div key={index} className="carousel-item h-full w-full">
                  <img
                    src={src.imageUrl}
                    className="w-full h-full object-cover"
                    alt={`Template ${index + 1}`}
                  />
                </div>
              ))}
            </div>
            <p className="btn self-center mt-2">Cek Template Tersedia</p>
          </div>
        </div>
      </div>
    </div>
  );
  
}
