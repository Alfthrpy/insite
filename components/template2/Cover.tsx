"use client";
import { motion } from 'framer-motion';

interface CoverProps {
  openHandler: () => void;
}

const Cover: React.FC<CoverProps> = ({ openHandler }) => {
  // const blurSlideVariants = {
  //   container: {
  //     hidden: { opacity: 0 },
  //     visible: {
  //       opacity: 1,
  //       transition: { staggerChildren: 0.05 },
  //     },
  //   },
  //   item: {
  //     hidden: { opacity: 0, filter: 'blur(10px)', y: 30 },
  //     visible: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.6 } },
  //   },
  // };

  return (
    <div
      className="flex items-center justify-center h-screen text-neutral bg-cover bg-center"
      style={{
        backgroundImage: "url('https://weddingmarket.com/storage/images/artikelidea/e278499151fd0f3de8909a850783eb2d4fe19d3f.webp')",
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
          Pengantin 1 & Pengantin 2
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
          02.04.2025
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

export default Cover;
