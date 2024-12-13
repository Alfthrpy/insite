"use client";
import { BrideGroomData, EventData, GalleryData, QuoteData } from "@/lib/interface";
import { TextEffect } from "../ui/text-effect";

interface ShowcaseProps {
  BrideGroomData : BrideGroomData;
  EventData : EventData[];
  GalleryData : GalleryData[]
  QuoteData? : QuoteData
}

export default function Showcase({BrideGroomData, EventData,GalleryData,QuoteData}: ShowcaseProps) {

  if(!QuoteData){
    return <div>No quote available</div>
  }

  const formatLongDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long", // Nama hari penuh (contoh: "Wednesday")
      day: "numeric",  // Tanggal (contoh: "2")
      month: "long",   // Nama bulan penuh (contoh: "April")
      year: "numeric", // Tahun (contoh: "2025")
    }).format(date);
  };
  return (
    <div className="h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Bagian Kiri */}
      <div
        className="relative bg-cover bg-center h-screen p-10 flex flex-col justify-center"
        style={{
          backgroundImage: `url(${GalleryData[0].imageUrl})`,
        }}
      >
        <div className="absolute inset-0 bg-[#f6f1eb] bg-opacity-50">

          
        </div>
        {/* Nama Pasangan */}
        <div className="text-left z-0">
          <h1 className="text-6xl font-bold tracking-wide font-sans text-gray-800">
            {BrideGroomData.nameGroom}
          </h1>
          <p className="text-2xl italic text-gray-600">and</p>
          <h1 className="text-6xl font-bold tracking-wide font-sans text-gray-800">
            {BrideGroomData.nameBride}
          </h1>
        </div>

        {/* Kutipan */}
        <div className="mt-8 text-gray-600 text-lg font-serif z-0">
          <TextEffect per="word" preset="fade">
            {QuoteData.content}
          </TextEffect>
          
        </div>

        <div className="absolute bottom-10 right-10 bg-white bg-opacity-80 rounded-lg p-4 text-center lg:hidden">
          <h2 className="text-1xl font-bold text-gray-800">Save the date</h2>
          <p className="text-sm text-gray-600">{formatLongDate(EventData[0].dateEvent)}</p>
        </div>
      </div>

      {/* Bagian Kanan */}
      <div className="hidden lg:block">
        {/* Gambar */}
        <div
        className="relative bg-cover bg-center h-screen p-10 flex flex-col justify-center"
        style={{
          backgroundImage: `url(${GalleryData[0].imageUrl})`,
        }}
      ></div>



        {/* Save the Date */}
        <div className="absolute bottom-10 right-10 bg-white bg-opacity-80 rounded-lg p-4 text-center">
          <h2 className="text-1xl font-bold text-gray-800">Save the date</h2>
          <p className="text-sm text-gray-600">{formatLongDate(EventData[0].dateEvent)}</p>
        </div>
      </div>
    </div>
  );
}