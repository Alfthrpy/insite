
export default function Undangan() {
  
  return (
     <>
        <div className="container w-full sm:w-3/5 m-4 p-5 rounded-box bg-white">
        <div className="flex w-full flex-col mt-4 gap-3">
            <div className="card bg-base-300 rounded-box grid h-36 place-items-center">content</div>
              <div className="divider"></div>
              <div className="flex flex-wrap lg:flex-row gap-6 p-3">
               <div className="btn no-animation bg-purpleHover hover:bg-purpleSecondary rounded-md flex flex-col gap-2 h-36 w-40 flex-grow place-items-center min-w-[150px]">
                  <img src="../img/fiturLightMode/fitur1.png" alt="" className="w-8" />
                  <p className="text-base-100">Edit Undangan</p>
               </div>
               <div className="btn no-animation bg-purpleHover hover:bg-purpleSecondary rounded-md flex flex-col gap-2 h-36 w-40 flex-grow place-items-center min-w-[150px]">
                  <img src="../img/fiturLightMode/fitur2.png" alt="" className="w-8" />
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

         </div>
           
        </div>
     </>
  )
}