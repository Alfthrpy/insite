import Image from "next/image";
import { useSearchParams } from "next/navigation";
const RSVP = () => {
   const params = useSearchParams();
   const validate = params.get('name');
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
            {!validate ? (
                <div className="flex flex-col">
                <label htmlFor="" className="text-start">Masukkan Nama Anda</label>
                <input type="text" placeholder="Nama" className="input input-bordered w-full max-w-md mb-4 rounded-full border-black border-2" />
                <label htmlFor="" className="text-start">Masukan Jumlah Tamu</label>
                <input type="text" placeholder="tamu" className="input input-bordered w-full max-w-md mb-4 rounded-full border-black border-2" />
                <button className="btn bg-gray-500 self-start w-full text-base-100">Konfirmasi Kehadiran</button>
             </div>
            ): (
            <div className="flex flex-col">
               <button className="btn bg-gray-500 self-start w-full text-base-100">Konfirmasi Kehadiran</button>
            </div>
               )
            }
            
         </div>
      </div>
   )
}

export default RSVP