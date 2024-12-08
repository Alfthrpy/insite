import Image from "next/image";
import { motion } from 'framer-motion';
import { useEffect, useState } from "react";

interface GiftData {
   id: string;
   nameAccount: string;
   noAccount: string;
   imgAccount: string;
 }
export default function Gift({invitationId} : {invitationId : string}) {
  const [gifts, setGifts] = useState<GiftData[]>([]); // State untuk menyimpan data dari API

  useEffect(() => {
    // Fungsi untuk fetch data dari API
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/gift?invitationId=${invitationId}`); // Ganti 'your-invitation-id' dengan ID dinamis jika diperlukan
        const data = await response.json();
        setGifts(data); // Simpan data ke state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array supaya fetch hanya dilakukan sekali saat komponen di-mount
  console.log(gifts)
  return (
    <div id="gift" className="flex w-full relative items-stretch justify-center h-auto bg-pink">
      <motion.div
        className="flex flex-col self-end pb-10 text-center mb-10 min-w-96 w-full max-w-lg mt-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="title mb-5 text-4xl m-3">Kado</div>

        {gifts.length > 0 ? (
          gifts.map((gift) => (
            <div
              key={gift.id}
              className="flex flex-col justify-center self-center w-auto font-alegreyaSans mt-5 mb-1"
            >
              <div className="self-center font-bold mx-3 mb-10">
                {gift.nameAccount}
                <div className="text-sm font-thin">Nama Rekening
                  <div className="text-lg">{gift.nameAccount}</div>
                </div>
                <div className="text-sm font-thin">Nomor Rekening
                  <div className="text-lg">{gift.noAccount}</div>
                </div>
              </div>

              <div className="font-thin text-gray-500 text-sm">Transfer pakai QRIS</div>
              <Image
                src={gift.imgAccount} // Menggunakan URL dari API
                alt={gift.nameAccount}
                className="border-2 border-neutral"
                width={320}
                height={271}
              />
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      

      </motion.div>
    </div>
  );
}
