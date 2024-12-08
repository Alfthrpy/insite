'use client';

import { useState } from "react";
import { GalleryData } from "@/lib/interface";

interface GalleryProps {
  GalleryData: GalleryData[];
}

export default function CarouselWithThumbnails({ GalleryData }: GalleryProps) {
  const [activeImage, setActiveImage] = useState<number | null>(null);

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-[#F6F1EB] px-4 py-10">
      {/* Judul */}
      <h1 className="text-5xl text-center font-bold tracking-wide font-sans text-gray-800 mb-8">
        PRECIOUS <span className="italic">Moment</span>
      </h1>

      {/* Subjudul */}
      <p className="text-center text-lg font-poppins text-[#757575] max-w-3xl mb-10">
        “Love is the thread that weaves our hearts together, and precious
        memories are the tapestry of our shared journey.”
      </p>

      {/* Gallery */}
      <div className="flex w-full max-w-6xl justify-between gap-6">
        {GalleryData.map((item, index) => (
          <div
            key={item.id}
            className={`relative h-[400px] rounded-lg overflow-hidden shadow-md border-2 border-[#C1A15A] cursor-pointer transition-all duration-500 ${
              activeImage === index
                ? "flex-[100]" // Gambar aktif membesar
                : "flex-[1]" // Gambar lainnya mengecil
            }`}
            onClick={() =>
              setActiveImage(activeImage === index ? null : index)
            }
          >
            <img
              src={item.imageUrl}
              alt={`Image ${item.id}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
