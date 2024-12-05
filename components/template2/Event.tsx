export default function Event() {
   return (
      <div className="flex flex-col items-center w-full bg-[#F6F1EB] py-12">
         {/* Header */}
         <h1 className="text-4xl  mb-8 font-bold tracking-wide font-sans text-gray-800">Wedding Schedule</h1>

         {/* Jadwal */}
         <div className="flex flex-wrap justify-center gap-8 mb-12">
            {/* Akad */}
            <div className=" bg-white bg-opacity-80 w-80 p-6 rounded-lg shadow-md text-center border border-[#C1A15A]">
               <h2 className="font-poppins text-lg font-bold mb-2 text-[#333333]">AKAD NIKAH</h2>
               <p className="text-sm font-poppins text-[#757575]">
                  <span className="font-semibold">🕒</span> 08.00 - 10.00
               </p>
               <p className="text-sm font-poppins text-[#757575]">
                  <span className="font-semibold">📅</span> Minggu, 20 November 2023
               </p>
            </div>
            {/* Resepsi */}
            <div className=" bg-white bg-opacity-80 w-80 p-6 rounded-lg shadow-md text-center border border-[#C1A15A]">
               <h2 className="font-poppins text-lg font-bold mb-2 text-[#333333]">RESEPSI</h2>
               <p className="text-sm font-poppins text-[#757575]">
                  <span className="font-semibold">🕒</span> 11.00 - selesai
               </p>
               <p className="text-sm font-poppins text-[#757575]">
                  <span className="font-semibold">📅</span> Minggu, 20 November 2023
               </p>
            </div>
         </div>

         {/* Lokasi */}
         <div className="text-center w-full px-4 max-w-2xl">
            <h2 className="text-lg font-bold mb-4 border-b-2 border-[#C1A15A] inline-block text-[#333333]">
               Lokasi
            </h2>
            <p className="mb-4 font-poppins text-[#757575]">
               Gedung Kologdam, Kodiklat TNI AD, Jl. Aceh, Merdeka, Kec. Sumur
               Bandung, Kota Bandung
            </p>
            <iframe
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.660349512705!2d107.71518137317915!3d-6.931138267841588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68c302db3434f5%3A0xdf4aacdb8618199c!2sUIN%20Sunan%20Gunung%20Djati%20Bandung!5e0!3m2!1sid!2sid!4v1732004101368!5m2!1sid!2sid"
               className="w-full h-64 border border-[#C1A15A] rounded-lg"
               allowFullScreen
               loading="lazy"
               referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <button className="mt-4 px-6 py-2 bg-[#C1A15A] text-white rounded shadow hover:bg-[#B08F4A] font-poppins">
               Klik untuk membuka peta
            </button>
         </div>
      </div>
   );
}
