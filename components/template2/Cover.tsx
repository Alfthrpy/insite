"use client";
import { BrideGroomData, EventData, GalleryData } from '@/lib/interface';
import { motion } from 'framer-motion';

interface CoverProps {
  openHandler: () => void;
  BrideGroomData : BrideGroomData;
  EventData : EventData[];
  GalleryData : GalleryData[]
}

export default function Cover({ openHandler,BrideGroomData,EventData,GalleryData }:CoverProps){
  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  return (
    <div
      className="flex items-center justify-center h-screen text-neutral bg-cover bg-center"
      style={{
        backgroundImage: `url(${GalleryData[0].imageUrl})`,
        backgroundColor: '#F6F1EB', // Warna krem sebagai fallback
      }}
    >
      <div className="flex flex-col items-center text-center">
        {/* Wedding Invitation */}
        <motion.div
          className="font-poppins text-4xl text-[#A1887F] mb-4" // Warna soft brown
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Wedding Invitation
        </motion.div>

        {/* Nama Pengantin */}
        <motion.div
          className="font-poppins text-5xl text-[#333333] font-bold" // Warna dark gray
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          {BrideGroomData.nameGroom} & {BrideGroomData.nameBride}
        </motion.div>

        {/* Garis */}
        <motion.div
          className="w-40 border-t-2 border-[#C1A15A] my-4" // Warna gold untuk aksen
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          style={{ transformOrigin: "center" }}
        ></motion.div>

        {/* Tanggal Pernikahan */}
        <motion.div
          className="font-playfair text-[#757575] text-xl" // Warna medium gray
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          {formatDate(EventData[0].dateEvent)}
        </motion.div>

        {/* Tombol */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <button
            onClick={openHandler}
            className="px-8 py-3 text-[#333333] bg-transparent border border-[#C1A15A] rounded-full hover:bg-[#C1A15A] hover:text-white transition"
          >
            Buka Undangan
          </button>
        </motion.div>
      </div>
    </div>
  );
};

