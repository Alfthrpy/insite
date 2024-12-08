

export default function RSVP() {
  return (
    <section
      id="rsvp"
      className="flex flex-col md:flex-row w-full h-5/6 justify-center items-center gap-8 p-4  bg-white bg-opacity-80 overflow-hidden"
    >
      {/* Gallery Utama */}
      <div className="flex-1 h-full">
        <img
          src="https://i.pinimg.com/736x/74/80/d0/7480d06caa7324813afd21eda5d1a6af.jpg"
          alt="Contoh"
          className="w-full h-full object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Form Container */}
      <div className="flex-1 max-w-lg w-full h-auto p-6 bg-white shadow-lg rounded-md">
        <h1 className="text-2xl font-playfair text-center text-[#5A4636] italic mb-6">
          Konfirmasi Kehadiran
        </h1>
        <form className="space-y-4">
          {/* Input Nama */}
          <div>
            <label htmlFor="name" className="block text-[#5A4636] text-base mb-2 font-poppins">
              Nama Lengkap
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full p-2 border-b-2 border-[#C1A15A] bg-transparent text-[#5A4636] outline-none focus:border-b-4 transition"
              placeholder="Masukkan Nama Anda"
            />
          </div>

          {/* Input Jumlah Orang */}
          <div>
            <label htmlFor="jumlah" className="block text-[#5A4636] text-base mb-2 font-poppins">
              Jumlah Orang
            </label>
            <input
              type="text"
              id="jumlah"
              name="jumlah"
              className="w-full p-2 border-b-2 border-[#C1A15A] bg-transparent text-[#5A4636] outline-none focus:border-b-4 transition"
              placeholder="Masukkan Jumlah Orang"
            />
          </div>

          {/* Tombol Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-[#C1A15A] text-white font-bold text-lg uppercase rounded-md hover:bg-[#A5643E] transition"
          >
            Kirim Respon
          </button>
        </form>
      </div>
    </section>
  );
}