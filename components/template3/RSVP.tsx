import Image from "next/image";

export default function RSVP(){

   return (
      <div id="rsvp" className="flex w-full relative items-stretch justify-center h-auto bg-pink">
         <div className="flex flex-col self-end pb-10 text-center min-w-96 max-w-lg my-20 mb-32">
            <div className="title mb-5 text-4xl text-center mx-4">
               Konfirmasi Kehadiran
            </div>
            <Image
                  src="/template-img/template1/gallery3.png"
                  alt="img"
                  className="border-2 border-neutral ml-4 self-center my-10"
                  width={260}
                  height={192}
            />
            <div className="flex flex-col">
               <input type="text" placeholder="Nama" className="input input-bordered w-full max-w-xs mb-4 rounded-full border-black border-2 bg-neutral-100"/>
               <button className="btn bg-neutral-100 self-start w-28">Kirim</button>
            </div>
            
         </div>
      </div>
   )
}