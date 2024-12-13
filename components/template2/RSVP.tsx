
'use client'
import { useParams, useSearchParams } from "next/navigation";
import RsvpForm from "../createRsvp";
import { checkRsvp, confirmRsvp } from "@/lib/actions";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const RSVP = () => {
  const params = useSearchParams();
  const params2 = useParams();

  const invitationId = params2?.id as string;

  const rspvIdStr = params.get("id");
  const rspvId = rspvIdStr ? Number(rspvIdStr) : null;

  console.log(rspvId)
  const [statusRsvp, setStatusRsvp] = useState<boolean | null>(false);
    useEffect(() => {
      const fetchRsvpStatus = async () => {
        if (rspvId) {
          const status = await checkRsvp(rspvId as number);
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
        confirmRsvp(rspvId as number)
        toast.success("Berhasil Konfirmasi")
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <section
      id="rsvp"
      className="flex flex-col md:flex-row w-full h-5/6 justify-center items-center gap-8 p-4  bg-white bg-opacity-80 overflow-hidden"
    >
      {/* Gallery Utama */}
      <div className="flex-1 h-full">
        <img
          src="https://i.pinimg.com/736x/74/80/d0/7480d06caa7324813afd21eda5d1a6af.jpg"
          alt="Contoh"
          className="w-full h-full object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Form Container */}
      <div className="flex-1 max-w-lg w-full h-auto p-6 bg-white shadow-lg rounded-md">
        <h1 className="text-2xl font-playfair text-center text-[#5A4636] italic mb-6">
          Konfirmasi Kehadiran
        </h1>

        { statusRsvp ? (
          <div className="space-y-4">
          {/* Tombol Submit */}
          <button
            className="w-full py-3 bg-[#C1A15A] text-white font-bold text-lg uppercase rounded-md hover:bg-[#A5643E] transition" onClick={handleClick}
          >
            Kirim Respon
          </button>
        </div>
        ) : (
          <RsvpForm invitationId={invitationId}/>
        )}
      </div>
    </section>
  );
};

export default RSVP;
