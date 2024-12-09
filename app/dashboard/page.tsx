"use client";
import { InvitationData } from "@/lib/interface";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { Suspense, useEffect, useState } from "react";

export default function Dahsboard() {
  const session = useSession();
  const [invitationData, setInvitationData] = useState<InvitationData>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userId = session?.data?.user.id;

    // Perform fetch only if userId exists
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

      fetchInvitation();
    } else {
      setIsLoading(false);
    }
  }, [session?.data?.user.id]);

  return (
    <div className="container w-full sm:w-4/5 m-4">
      <div className="container p-5 rounded-box bg-white">
        <div className="flex flex-wrap lg:flex-row gap-6 p-3 justify-center xl:justify-between">
          <div className="card rounded-md h-full xl:grow w-96 gap-3">
            <p className="font-bold text-3xl mb-10">
              Selamat Datang di <br /> Dashboard Insite
            </p>
            <p className="font-bold text-xl">Undangan Milikmu</p>
            <Suspense fallback={<div>loading</div>}>
              <div className="border-2 border-purpleHover rounded-md flex h-20 items-center justify-between px-4">
                <div className="flex items-center">
                  <img src="./img/couple.png" alt="wedding" />
                  <div className="flex flex-col items-start gap-1 ml-2">
                    <h1 className="text-xl font-bold text-neutral m-0 leading-none pr-2">
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
            <div className="flex flex-nowrap justify-between gap-3">
              {/* Manage Button with Loading State */}
              <Link
                href={`/dashboard/invitation/${invitationData?.id}`}
                className={`btn no-animation bg-neutral rounded-md flex h-16 items-center justify-start px-4 flex-1 grow ${
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
                  <span className="text-xl font-bold text-base-100 m-0 leading-none">
                    {isLoading ? "Memuat..." : "Kelola"}
                  </span>
                </div>
              </Link>

              <div className="btn no-animation bg-neutral rounded-md flex h-16 items-center justify-start px-4 flex-1 grow">
                <img
                  src="./img/fiturLightMode/send.png"
                  alt="wedding"
                  className="w-8"
                />
                <div className="flex flex-col items-start gap-1 ml-2">
                  <h1 className="text-xl font-bold text-base-100 m-0 leading-none">
                    Bagikan
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="divider xl:divider-horizontal"></div>
          <div className="card lg:flex-none rounded-md mt-7 lg:mt-0">
            <p className="self-center font-bold mb-1">Template</p>
            <div className="carousel carousel-vertical rounded-box h-96 place-items-center">
              <div className="carousel-item h-[500px] w-auto rounded-box">
                <img
                  src="../img/template/prewed1.png"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="carousel-item h-full w-full">
                <img src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp" />
              </div>
              <div className="carousel-item h-full w-full">
                <img src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp" />
              </div>
              <div className="carousel-item h-full w-full">
                <img src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp" />
              </div>
              <div className="carousel-item h-full w-full">
                <img src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp" />
              </div>
              <div className="carousel-item h-full w-full">
                <img src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp" />
              </div>
              <div className="carousel-item h-full w-full">
                <img src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp" />
              </div>
            </div>
            <p className="btn self-center mt-2">Cek Template Tersedia</p>
          </div>
        </div>

        <div className="flex w-full flex-col mt-4 gap-5">
          <div className="btn no-animation bg-purpleHover hover:bg-purpleSecondary rounded-md flex h-20 items-center justify-start px-4 flex-nowrap">
            <img
              src="./img/fiturLightMode/wedding-invitation.png"
              alt="wedding"
            />
            <div className="flex flex-col items-start gap-1 ml-2">
              <h1 className="text-xl font-bold text-base-100 m-0 leading-tight">
                Buat Undangan Baru (Belum Tersedia)
              </h1>
              <h1 className="text-sm text-base-100 m-0 leading-tight">
                Buat Undangan Baru
              </h1>
            </div>
          </div>
          <div className="btn no-animation bg-neutral rounded-md flex h-20 place-items-center justify-start px-4 flex-nowrap">
            <img src="./img/fiturLightMode/qr-code.png" alt="qr" />
            <div className="flex flex-col items-start gap-1 ml-2">
              <h1 className="text-xl font-bold text-base-100 m-0 leading-none">
                Buka Scanner QR Code
              </h1>
              <h1 className="text-sm text-base-100 m-0 leading-none">
                Scan undangan tamu
              </h1>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="container p-5 rounded-box mt-4 bg-white">
        <div className="flex w-full flex-col gap-5">
          <div className="card bg-base-300 rounded-box grid h-20 place-items-center">content</div>
          <div className="card bg-base-300 rounded-box grid h-20 place-items-center">content</div>
        </div>
      </div> */}
    </div>
  );
}
