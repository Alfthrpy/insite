
"use client"
import React, { useState } from "react";

export default function Undangan() {
   const [isActive, setIsActive] = useState(true); // State untuk toggle status

   const handleToggle = () => {
     setIsActive(!isActive); // Mengubah status toggle
   };

  return (
     <>
        <div className="container w-full sm:w-3/5 m-4 p-5 rounded-box bg-white">
           <div className="flex w-full flex-col mt-4 gap-3">
              <div className="card bg-purpleHover rounded-box grid h-36 px-5">
               <div className="card text-primary-content p-4 mb-4 flex justify-between items-start relative">
                     <div>
                     <h2 className="text-xl font-bold text-base-100">A dan B</h2>
                     </div>
                  
                     <div className="absolute top-2 right-2">
                     <label className="label cursor-pointer flex items-center">
                        <span className="label-text text-white mr-2 font-bold">
                           {isActive ? "Aktif" : "Non-Aktif"}
                        </span>
                        <input
                           type="checkbox"
                           className="toggle toggle-primary"
                           checked={isActive}
                           onChange={handleToggle}
                        />
                     </label>
                     </div>

                     <div className="w-full text-center mt-4">
                     <p className="text-sm text-base-100 font-bold">Link Undangan:</p>
                     <a href="https://wevitation.com/nirwan-seras" className="text-sm text-white underline italic">
                        https://insite.com/A-B
                     </a>
                     </div>
                  </div>
              </div>
              <div className="divider"></div>
              <div className="flex flex-wrap lg:flex-row gap-6 p-3">
                 <div className="btn no-animation bg-purpleHover hover:bg-purpleSecondary rounded-md flex flex-col gap-2 h-36 w-40 flex-grow place-items-center min-w-[150px]">
                    <img src="../img/fiturLightMode/fitur1.png" alt="" className="w-8" />
                    <p className="text-base-100">Edit Undangan</p>
                 </div>
                 <div className="btn no-animation bg-purpleHover hover:bg-purpleSecondary rounded-md flex flex-col gap-2 h-36 w-40 flex-grow place-items-center min-w-[150px]">
                    <img src="../img/fiturLightMode/layout.png" alt="" className="w-8" />
                    <p className="text-base-100">Pilih Template</p>
                 </div>
              </div>
              
              <div className="flex flex-wrap lg:flex-row gap-6 p-3">
                 <div className="btn no-animation bg-purpleHover hover:bg-purpleSecondary rounded-md flex flex-col gap-2 h-36 w-40 flex-grow place-items-center min-w-[150px]">
                    <img src="../img/fiturLightMode/fitur3.png" alt="" className="w-8" />
                    <p className="text-base-100">Galery</p>
                 </div>
                 <div className="btn no-animation bg-purpleHover hover:bg-purpleSecondary rounded-md flex flex-col gap-2 h-36 w-40 flex-grow place-items-center min-w-[150px]">
                    <img src="../img/fiturLightMode/fitur2.png" alt="" className="w-8" />
                    <p className="text-base-100">Tambahkan Musik</p>
                 </div>
              </div>

               <div className="flex flex-wrap lg:flex-row gap-6 p-3">
               <div className="btn no-animation bg-purpleHover hover:bg-purpleSecondary rounded-md flex flex-col gap-2 h-36 w-40 flex-grow place-items-center min-w-[150px]">
               <img src="../img/fiturLightMode/fitur6.png" alt="" className="w-8" />
                  <p className="text-base-100">Kirim Hadiah</p>
                  </div>
               <div className="btn no-animation bg-purpleHover hover:bg-purpleSecondary rounded-md flex flex-col gap-2 h-36 w-40 flex-grow place-items-center min-w-[150px]">
                  <img src="../img/fiturLightMode/rsvp.png" alt="" className="w-8" />
                  <p className="text-base-100">RSVP</p>
               </div>
               </div>

               <div className="flex flex-wrap lg:flex-row gap-6 p-3">
               <div className="btn no-animation bg-purpleHover hover:bg-purpleSecondary rounded-md flex flex-col gap-2 h-36 w-40 flex-grow place-items-center min-w-[150px]">
                  <img src="../img/fiturLightMode/fitur4.png" alt="" className="w-8" />
                  <p className="text-base-100">Kisah Cinta</p>
               </div>
               <div className="btn no-animation bg-purpleHover hover:bg-purpleSecondary rounded-md flex flex-col gap-2 h-36 w-40 flex-grow place-items-center min-w-[150px]">
                  <img src="../img/fiturLightMode/fitur7.png" alt="" className="w-8" />
                  <p className="text-base-100">Buat Siaran Undangan</p>
                 </div>
              </div>
              <div className="flex flex-wrap lg:flex-row gap-6 p-3">
              <div className="btn no-animation bg-neutral rounded-md flex flex-col gap-2 h-36 w-40 flex-grow place-items-center min-w-[150px]">
                  <img src="../img/fiturLightMode/send.png" alt="" className="w-8" />
                  <p className="text-base-100">Kirim</p>
                 </div>
              </div>
           </div>  
        </div>
     </>
  )
}