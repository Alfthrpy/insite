'use client'
import { checkRsvp, confirmRsvp } from "@/lib/actions";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import RsvpForm from "../createRsvp";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const RSVP = () => {
  const params = useSearchParams();
  const params2 = useParams();

  const invitationId = params2?.id as string;

  const rspvIdStr = params.get("id");
  const rspvId = rspvIdStr ? Number(rspvIdStr) : NaN; // Atau bisa menggunakan parseInt(rspvIdStr)

  const [statusRsvp, setStatusRsvp] = useState<boolean | null>(null); // State untuk menyimpan status RSVP
    useEffect(() => {
      const fetchRsvpStatus = async () => {
        if (!isNaN(rspvId)) {
          const status = await checkRsvp(rspvId);
          setStatusRsvp(status);
        } else {
          console.error("Invalid rspvId: not a number");
          // Bisa lakukan handling error seperti redirect atau pesan kesalahan
        }
      };
  
      fetchRsvpStatus();
    }, [rspvId]); // Menggunakan rspvId sebagai dependensi

    const handleClick = () => {
      try {
        confirmRsvp(rspvId)
        toast.success("Berhasil Konfirmasi")
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <div
      id="rsvp"
      className="flex w-full relative items-stretch justify-center h-auto"
    >
      <div className="flex flex-col self-end pb-10 text-center min-w-96 max-w-lg my-20 mb-32">
        <div className="font-alex text-4xl self-end text-end mx-4">
          Konfirmasi Kehadiran
        </div>
        <Image
          src="/template-img/template1/gallery3.png"
          alt="img"
          className="border-2 border-neutral ml-4 self-center my-10"
          width={260}
          height={192}
        />
        {!rspvId && statusRsvp ? (
          <RsvpForm invitationId={invitationId } />
        ) : (
          <div className="flex flex-col">
            <button
              className="btn bg-gray-500 self-start w-full text-base-100"
              onClick={handleClick}
            >
              Konfirmasi Kehadiran
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RSVP;
