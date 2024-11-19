import { motion } from "framer-motion";
import Image from 'next/image';

const groomVariants = {
   initial: { opacity: 0, y: 50 }, // Muncul dari bawah dengan opacity 0
   animate: {
     opacity: 1,
     y: 0,
     transition: { duration: 1.5, ease: "easeOut" } // Durasi animasi 1.5 detik
   },
 };
 
const brideVariants = {
   initial: { opacity: 0, y: -50 }, // Muncul dari atas dengan opacity 0
   animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.5, ease: "easeOut" } // Durasi animasi 1.5 detik
   }
}

const textVariants = {
   initial: { opacity: 0 },
   animate: {
     opacity: 1,
     transition: { duration: 1.5, ease: "easeOut" }
   },
 };

export default function Couple() {
   return (
      <div className="flex w-full relative items-stretch justify-center h-auto bg-secondary-content">
             <div className="flex flex-col min-w-96 w-full max-w-lg my-14">
               {/* Groom Section */}
               <motion.div
               className="self-start p-2 mb-10"
               variants={groomVariants}
               initial="initial"
               whileInView="animate"
               viewport={{ once: true, amount: 0.3 }} // Animasi berjalan saat 30% elemen terlihat
               >
               <div className="font-alex text-4xl ml-2">The Groom</div>
               <Image
                  src=""
                  alt="groom"
                  width={216}
                  height={280}
                  className="border-2 border-neutral ml-5 rounded-md"
               />
               <motion.div
                        className="font-alegreyaSans p-4 "
                        variants={textVariants}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                     >
                        <h1 className="font-semibold italic text-xl mb-2">Nama Pengantin</h1>
                        <h3 className="text-sm font-thin">Putra dari :</h3>
                        <h4 className="font-thin italic mb-3">Nama ibu & bapak</h4>
                        <div className="flex ">
                           <Image
                              src="/img/instagram.png"
                              className="object-contain rounded-top"
                              alt="ig"
                              width={18}
                              height={20}
                           />
                           <h1 className="ml-2">@username</h1>
                        </div>
                        <div className="flex">
                           <Image
                              src="/img/xtwitter.png"
                              className="object-contain rounded-top"
                              alt="ig"
                              width={18}
                              height={20}
                           />
                           <h1 className="ml-2">@username</h1>
                        </div>
                  </motion.div>
               </motion.div>

               {/* Bride Section */}
               <motion.div
               className="self-end p-2 mb-24"
               variants={brideVariants}
               initial="initial"
               whileInView="animate"
               viewport={{ once: true, amount: 0.3 }} // Animasi berjalan saat 30% elemen terlihat
               >
               <div className="font-alex text-4xl text-end mr-3">The Bride</div>
               <Image
                  src=""
                  alt="bride"
                  width={216}
                  height={280}
                  className="border-2 border-neutral mr-5 rounded-md"
               />
                  <motion.div
                     className="font-alegreyaSans text-end p-4"
                     variants={textVariants}
                     initial="initial"
                     whileInView="animate"
                     viewport={{ once: true }}
                  >
                  <h1 className="font-semibold italic text-xl mb-2">Nama Pengantin</h1>
                  <h3 className="text-sm font-thin">Putri dari :</h3>
                  <h4 className="font-thin italic mb-3">Nama ibu & bapak</h4>
                  <div className="flex justify-end">
                     <Image
                        src="/img/instagram.png"
                        className="object-contain rounded-top"
                        alt="ig"
                        width={18}
                        height={20}
                     />
                     <h1 className="ml-2">@username</h1>
                  </div>
                  <div className="flex justify-end">
                     <Image
                        src="/img/xtwitter.png"
                        className="object-contain rounded-top"
                        alt="ig"
                        width={18}
                        height={20}
                     />
                     <h1 className="ml-2">@username</h1>
                  </div>
                  </motion.div>
               </motion.div>
            </div>
      </div>
   )
}