import { motion } from "framer-motion";
import Image from "next/image";

const textVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 1.5, ease: "easeOut" } },
};

export default function Couple() {
  return (
    <div className="flex flex-col items-center justify-center bg-white bg-opacity-80 py-14 h-screen">
      {/* Section Content */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-16">
        {/* Groom */}
        <motion.div
          className="flex flex-col items-center text-center space-y-4"
          variants={textVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <Image
            src="/template-img/template1/groom.png" // Ganti dengan URL gambar pengantin pria
            alt="groom"
            width={150}
            height={150}
            className="rounded-full border-4 border-[#C1A15A]" // Border warna gold
          />
          <div>
            <h1 className="font-poppins text-2xl font-bold text-[#333333]">Nofariza</h1> {/* Warna dark gray */}
            <p className="font-playfair text-base text-[#757575]">
              Putra dari Bpk. Lorem dan Ibu Ipsum
            </p>
          </div>
        </motion.div>

        {/* Bride */}
        <motion.div
          className="flex flex-col items-center text-center space-y-4"
          variants={textVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <Image
            src="/template-img/template1/bride.png" // Ganti dengan URL gambar pengantin wanita
            alt="bride"
            width={150}
            height={150}
            className="rounded-full border-4 border-[#C1A15A]" // Border warna gold
          />
          <div>
            <h1 className="font-poppins text-2xl font-bold text-[#333333]">Nofariza</h1> {/* Warna dark gray */}
            <p className="font-playfair text-base text-[#757575]">
              Putri dari Bpk. Lorem dan Ibu Ipsum
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
