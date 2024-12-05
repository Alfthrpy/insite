import Image from "next/image";

export default function Story() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-white bg-opacity-80 px-6 py-10">
      {/* Judul */}
      <h1 className="text-5xl font-bold tracking-wide font-sans text-gray-800 mb-4">Our Story</h1>
      <p className="text-center font-poppins text-[#757575] max-w-2xl mb-12">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro,
        similique non soluta nulla asperiores voluptatem.
      </p>

      {/* Timeline */}
      <div className="relative w-full max-w-4xl">
        {/* Garis Vertikal */}
        <div className="absolute left-1/2 top-0 h-full w-1 bg-[#C1A15A] transform -translate-x-1/2"></div>

        {/* Elemen Timeline */}
        <div className="flex flex-col space-y-12">
          {/* Item 1 */}
          <div className="relative flex items-center">
            {/* Konten Kiri */}
            <div className="w-1/2 text-right pr-6">
              <div className="bg-[#FFF7E8] p-4 rounded-lg shadow-md inline-block border border-[#C1A15A]">
                <h3 className="text-xl font-bold text-[#333333] font-poppins">Pertama Bertemu</h3>
                <p className="text-sm text-[#757575] font-poppins">1 Juni 2000</p>
                <p className="text-[#757575] font-poppins mt-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quos, modi autem? Commodi autem quo quia?
                </p>
              </div>
            </div>

            {/* Gambar Tengah */}
            <div className="w-20 h-28 bg-[#F6F1EB] border-4 border-[#C1A15A] rounded-lg flex-shrink-0 mx-4 overflow-hidden">
              <Image
                src="/template-img/template1/story.png"
                alt="Pertama Bertemu"
                width={80}
                height={112}
                className="object-cover"
              />
            </div>

            {/* Konten Kanan (kosong untuk item ini) */}
            <div className="w-1/2"></div>
          </div>

          {/* Item 2 */}
          <div className="relative flex items-center">
            {/* Konten Kiri (kosong untuk item ini) */}
            <div className="w-1/2"></div>

            {/* Gambar Tengah */}
            <div className="w-20 h-28 bg-[#F6F1EB] border-4 border-[#C1A15A] rounded-lg flex-shrink-0 mx-4 overflow-hidden">
              <Image
                src="/template-img/template1/story.png"
                alt="Mulai Serius"
                width={80}
                height={112}
                className="object-cover"
              />
            </div>

            {/* Konten Kanan */}
            <div className="w-1/2 pl-6">
              <div className="bg-[#FFF7E8] p-4 rounded-lg shadow-md inline-block border border-[#C1A15A]">
                <h3 className="text-xl font-bold text-[#333333] font-poppins">Mulai Serius</h3>
                <p className="text-sm text-[#757575] font-poppins">1 Januari 2005</p>
                <p className="text-[#757575] font-poppins mt-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Architecto enim eaque obcaecati odit itaque explicabo quisquam
                  quos at.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
