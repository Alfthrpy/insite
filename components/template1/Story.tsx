import Image from "next/image";

export default function Story(){
   return (
      <div className="flex w-full relative items-stretch justify-center h-auto bg-neutral-content">
         <div className="flex flex-col self-end pb-10 text-center mb-10 min-w-96 w-full max-w-lg mt-10">
            <div className="font-alex text-4xl m-3">
               Our Story
            </div>
            <div className="flex justify-between self-center w-auto font-alegreyaSans mt-5 mb-1">
               <Image
                  src=""
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
                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unnnn dan apa alagi sok yaaa pkoknya mahh fgituu lah
            </div>
            <div className="flex justify-end mt-8 mr-3">
               <div className="font-bold ">
               More
               </div>
               <svg width="25" height="26" viewBox="0 0 50 50">
                  <path d="M10 25L40 25" stroke="black" stroke-width="6" />
                  <path d="M25 10L40 25L25 40" stroke="black" stroke-width="4" fill="none" />
               </svg>
            </div>
         </div>
      </div>
   )
}