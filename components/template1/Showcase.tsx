
"use client";
import { TextEffect } from '../ui/text-effect';

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
 


export default function Showcase() { 

   return (
      <div
         id="showcase"
         className="flex w-full justify-center h-screen text-neutral items-center bg-sky bg-cover md:bg-auto bg-center"
         style={{
         backgroundImage: `url('/template-img/template1/showcase.png')`,
         backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
         
       }}> 
         <div className="flex flex-col pb-10 text-center mt-10 w-96 mb-28">
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
            <div className="font-alex text-3xl font-semibold mt-12">
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
               <TextEffect per='char' delay={1}>
                  & 
               </TextEffect>
               <TextEffect
               per='char'
               delay={1.4}
               preset='blur'
               >
               Pengantin 2
               </TextEffect>
            </div>
            <div className="h-24"></div>
               <div className="logo">
               {/* <img src="/logo.png" alt="R&A" className="w-24 mx-auto" /> */}
            </div>

            <div className="font-alegreyaSans">
               <TextEffect per='word' preset='fade' delay={2}>
               Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unnnn
               </TextEffect>
               <h1 className="font-bold">
                  <TextEffect per='char' preset='blur' delay={2.5}>
                     21 Februari 2025
                  </TextEffect>        
               </h1>
            </div>
         
      
         </div>
      </div>
   )

}