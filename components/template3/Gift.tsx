import Image from "next/image";
import { motion } from 'framer-motion';
export default function Gift(){
   return (
      <div id="gift" className="flex w-full relative items-stretch justify-center h-auto bg-pink">
         <motion.div
               className="flex flex-col self-end pb-10 text-center mb-10 min-w-96 w-full max-w-lg mt-10"
               initial={{ opacity: 0, y: 50 }} // Mulai dengan opacity 0 dan geser ke bawah
               whileInView={{ opacity: 1, y: 0 }} // Ketika elemen terlihat, animasi ke opacity 1 dan posisi asli
               viewport={{ once: true, amount: 0.5 }} // Animasi hanya sekali ketika setengah elemen terlihat
               transition={{ duration: 0.6, ease: 'easeOut' }} // Durasi animasi dan easing
            >
               <div className="title mb-5 text-4xl m-3">
               Kado
               </div>
            <div className="flex flex-col justify-center self-center w-auto font-alegreyaSans mt-5 mb-1">
            <div className="self-center font-bold mx-3 mb-10">
                  DANA
                  <div className="text-sm font-thin">Nama Rekening
                     <div className="text-lg">Suprianto</div>
                  </div>
                  <div className="text-sm font-thin">Nomor Rekening
                     <div className="text-lg">1 22 333 4444</div>
                  </div>
               </div>
               <div className="font-thin text-gray-500 text-sm">
                  Transfer pakai QRIS
               </div>
               <Image
                  src="/template-img/template1/QRIS.jpeg"
                  alt="story"
                  className="border-2 border-neutral"
                  width={320}
                  height={271}
               />
               </div>
                  <div className="font-alegreyaSans self-center mt-4 w-96">
                     <div className="text-Center font-bold mb-2">
                        Kirim Kado Ke Alamat
                     </div>
                     <div className="card text-center border-2 border-dashed border-black py-10">
                        jl. ABCD no 2 Bandung
                     </div>
                  </div>
            </motion.div>
      </div>
   )
}