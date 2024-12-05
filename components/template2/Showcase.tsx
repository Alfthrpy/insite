"use client";
import { TextEffect } from "../ui/text-effect";

export default function Showcase() {
  return (
    <div className="h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Bagian Kiri */}
      <div
        className="relative bg-cover bg-center h-screen p-10 flex flex-col justify-center"
        style={{
          backgroundImage: `url('https://weddingmarket.com/storage/images/artikelidea/e278499151fd0f3de8909a850783eb2d4fe19d3f.webp')`,
        }}
      >
        <div className="absolute inset-0 bg-[#f6f1eb] bg-opacity-50">

          
        </div>
        {/* Nama Pasangan */}
        <div className="text-left z-0">
          <h1 className="text-6xl font-bold tracking-wide font-sans text-gray-800">
            JAEWOUNG
          </h1>
          <p className="text-2xl italic text-gray-600">and</p>
          <h1 className="text-6xl font-bold tracking-wide font-sans text-gray-800">
            CINDY
          </h1>
        </div>

        {/* Kutipan */}
        <div className="mt-8 text-gray-600 text-lg font-serif z-0">
          <TextEffect per="word" preset="fade">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus doloremque, debitis illum incidunt laborum asperiores ad id magni officia veniam vero at recusandae totam nesciunt ratione tempore obcaecati culpa eos?
          </TextEffect>
          
        </div>

        <div className="absolute bottom-10 right-10 bg-white bg-opacity-80 rounded-lg p-4 text-center lg:hidden">
          <h2 className="text-1xl font-bold text-gray-800">Save the date</h2>
          <p className="text-sm text-gray-600">Wednesday, 2 April 2025</p>
        </div>
      </div>

      {/* Bagian Kanan */}
      <div className="hidden lg:block">
        {/* Gambar */}
        <div className="h-screen overflow-hidden relative">
         <img 
            src="https://weddingmarket.com/storage/images/artikelidea/e278499151fd0f3de8909a850783eb2d4fe19d3f.webp" 
            alt="Example Image" 
            className="w-auto h-auto object-cover"
         />
         </div>



        {/* Save the Date */}
        <div className="absolute bottom-10 right-10 bg-white bg-opacity-80 rounded-lg p-4 text-center">
          <h2 className="text-1xl font-bold text-gray-800">Save the date</h2>
          <p className="text-sm text-gray-600">Wednesday, 2 April 2025</p>
        </div>
      </div>
    </div>
  );
}
