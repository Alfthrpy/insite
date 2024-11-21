import Image from "next/image";
import { motion } from 'framer-motion';
export default function Story(){
   return (
      <div id="story" className="flex w-full relative items-stretch justify-center h-auto bg-base-300">
         <motion.div
               className="flex flex-col self-end pb-10 text-center mb-10 min-w-96 w-full max-w-lg mt-10"
               initial={{ opacity: 0, y: 50 }} // Mulai dengan opacity 0 dan geser ke bawah
               whileInView={{ opacity: 1, y: 0 }} // Ketika elemen terlihat, animasi ke opacity 1 dan posisi asli
               viewport={{ once: true, amount: 0.5 }} // Animasi hanya sekali ketika setengah elemen terlihat
               transition={{ duration: 0.6, ease: 'easeOut' }} // Durasi animasi dan easing
            >
               <div className="font-alex text-4xl m-3">
               Our Story
               </div>
               <div className="flex justify-between self-center w-auto font-alegreyaSans mt-5 mb-1">
               <Image
                  src="/template-img/template1/story.png"
                  alt="story"
                  className="border-2 border-neutral ml-4 shrink"
                  width={221}
                  height={271}
               />
               <div className="self-center font-bold mx-3">
                  Februari 2024
               </div>
               </div>
               <div className="indent-paragraph font-alegreyaSans self-center mt-4 w-96">
               Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unnnn dan apa alagi sok yaaa pkoknya mahh fgituu lah
               </div>
               <div className="flex justify-end mt-8 mr-3">
               <div className="font-bold ">
                  More
               </div>
               <svg width="25" height="26" viewBox="0 0 50 50">
                  <path d="M10 25L40 25" stroke="black" strokeWidth="6" />
                  <path d="M25 10L40 25L25 40" stroke="black" strokeWidth="4" fill="none" />
               </svg>
               </div>
            </motion.div>
      </div>
   )
}