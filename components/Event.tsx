
export default function Event() {
   return (
      <div className="flex w-full relative items-stretch justify-center h-auto bg-secondary-content">
         <div className="flex flex-col self-end pb-10 text-center min-w-96 w-full max-w-lg my-12">
            <div className="">
               <div className="font-alex text-4xl self-end text-end mx-4">
                  Wedding Schedule
               </div>
               <div className="flex flex-col bg-base-200 w-auto h-auto p-7 text-lg mx-4 rounded-lg">
                  <div className="font-alegreyaSans self-start text-left">
                     <h1 className="font-bold ">Akad :</h1>
                     <p>Senin, 24 Januari</p>
                     <p>Pukul 09.00 - 10.00 WIB</p>
                  </div>
                  <div className="font-alegreyaSans text-right self-end mt-5">
                     <h1 className="font-bold ">Resepsi :</h1>
                     <p>Senin, 24 Januari</p>
                     <p>Pukul 11.00 - Selesai</p>
                  </div>
               </div>
               <div className="font-alegreyaSans flex flex-col my-7">
                  <div className="self-center border-b-2 border-black px-2 font-bold text-lg">
                  Lokasi
                  </div>
                  <div className="w-full my-4">
                        <p className="mb-2">Tempat acara, jalan apa no brp</p>
                        <iframe
                           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.660349512705!2d107.71518137317915!3d-6.931138267841588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68c302db3434f5%3A0xdf4aacdb8618199c!2sUIN%20Sunan%20Gunung%20Djati%20Bandung!5e0!3m2!1sid!2sid!4v1732004101368!5m2!1sid!2sid"
                           className="w-full h-72"
                           allowFullScreen
                           loading="lazy"
                           referrerPolicy="no-referrer-when-downgrade"
                           ></iframe>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}