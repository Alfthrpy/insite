
"use client";
import { TypewriterEffectSmooth } from "../ui/typewritter-effect";
import { TextEffect } from '../ui/text-effect';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CoverProps {
  openHandler: () => void;
}

const Cover: React.FC<CoverProps> = ({ openHandler }) => {

  const [trigger, setTrigger] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setTrigger((prev) => !prev);
    }, 2000);

    return () => clearInterval(interval);
  }, []);
  const blurSlideVariants = {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.01 },
      },
      exit: {
        transition: { staggerChildren: 0.01, staggerDirection: 1 },
      },
    },
    item: {
      hidden: {
        opacity: 0,
        filter: 'blur(10px) brightness(0%)',
        y: 0,
      },
      visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px) brightness(100%)',
        transition: {
          duration: 0.4,
        },
      },
      exit: {
        opacity: 0,
        y: -30,
        filter: 'blur(10px) brightness(0%)',
        transition: {
          duration: 0.4,
        },
      },
    },
  };

   const words = [
      {
        text: "Tamu",
      },
      {
        text: "Undangan",
      },
    ];

   return (
    
     <div className="flex items-stretch justify-center h-screen text-neutral"
     style={{
      backgroundImage: `url('/template-img/template1/cover1.png')`,
        backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
  }}
     > 
       <div className="flex flex-col self-end pb-10 text-center mb-6 w-96">
         <div className="ml-3 font-alex text-2xl self-start h-16">
          <TextEffect
            className='inline-flex'
            per='char'
            variants={blurSlideVariants}
            trigger={true}
          >
            The Wedding Of
          </TextEffect>
           
         </div>
         <div className="font-alex text-3xl font-semibold">
         <TextEffect
            per='char'
            delay={0.5}
            variants={{
              container: {
                hidden: {
                  opacity: 0,
                },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.05,
                  },
                },
              },
              item: {
                hidden: {
                  opacity: 0,
                  rotateX: 90,
                  y: 10,
                },
                visible: {
                  opacity: 1,
                  rotateX: 0,
                  y: 0,
                  transition: {
                    duration: 0.2,
                  },
                },
              },
            }}
          >
            Pengantin 1 
           </TextEffect>
           <TextEffect per='char' delay={1.5}>
              & 
           </TextEffect>
           <TextEffect
            per='char'
            delay={2}
            preset='blur'
          >
            Pengantin 2
          </TextEffect>
         </div>
         <div className="h-40"></div>
          <div className="logo mb-6">
           {/* <img src="/logo.png" alt="R&A" className="w-24 mx-auto" /> */}
         </div>
         
         <div className="text-md">
         <TextEffect per='char' preset='fade' delay={3}>Yth.</TextEffect>
          </div>
          <div className="font-semibold lg:h-40 text-3xl">
            <TextEffect per='char' preset='fade' delay={3.5}>
                  Tamu Undangan
             </TextEffect>
             <motion.div
                onClick={openHandler}
                className="btn mt-7 btn-ghost border-2 rounded-full border-neutral hover:bg-base-200 items-center text-xl justify-end"
                initial={{ opacity: 0, y: 40 }} // Mulai dengan opacity 0 dan sedikit ke bawah
                animate={{ opacity: 1, y: 0 }}  // Muncul dengan opacity 1 dan posisi normal
                transition={{ delay: 3.5, duration: 0.6, ease: 'easeOut' }}
              >
                Buka Undangan
              </motion.div>
          </div>
       </div>
     </div>
   );
 };
 
export default Cover;
 

