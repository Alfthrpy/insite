'use client';
import { useState } from 'react';

const ITEMS = [
  { id: 1, image: 'https://i.pinimg.com/550x/b4/33/65/b43365d4394cdcc9ec216769ccdb7106.jpg' },
  { id: 2, image: 'https://i.pinimg.com/550x/b4/33/65/b43365d4394cdcc9ec216769ccdb7106.jpg' },
  { id: 3, image: 'https://i.pinimg.com/550x/b4/33/65/b43365d4394cdcc9ec216769ccdb7106.jpg' },
  { id: 4, image: 'https://i.pinimg.com/550x/b4/33/65/b43365d4394cdcc9ec216769ccdb7106.jpg' },
  
];

export default function CarouselWithThumbnails() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-[#F6F1EB] px-4 py-10">
      {/* Judul */}
      <h1 className="text-5xl  text-center font-bold tracking-wide font-sans text-gray-800 mb-8">
        PRECIOUS <span className="italic">Moment</span>
      </h1>

      {/* Subjudul */}
      <p className="text-center text-lg font-poppins text-[#757575] max-w-3xl mb-10">
        “Love is the thread that weaves our hearts together, and precious
        memories are the tapestry of our shared journey.”
      </p>

      {/* Gallery */}
      <div className="flex w-full max-w-6xl justify-between gap-6">
        {ITEMS.map((item) => (
          <div
            key={item.id}
            className="flex-1 h-[400px] rounded-lg overflow-hidden shadow-md border-2 border-[#C1A15A]"
          >
            <img
              src={item.image}
              alt={`Image ${item.id}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
