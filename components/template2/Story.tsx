import { LoveStoryData } from "@/lib/interface";
import Image from "next/image";

interface StoryProps {
  LoveStoryData: LoveStoryData[]; // Array data cerita cinta
}

export default function Story({ LoveStoryData }: StoryProps) {
  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-white bg-opacity-80 px-6 py-10">
      {/* Judul */}
      <h1 className="text-5xl font-bold tracking-wide font-sans text-gray-800 mb-4">
        Our Story
      </h1>
      <p className="text-center font-poppins text-[#757575] max-w-2xl mb-12">
        Cerita perjalanan cinta kami yang penuh makna dan kenangan indah.
      </p>

      {/* Timeline */}
      <div className="relative w-full max-w-4xl">
        {/* Garis Vertikal */}
        <div className="absolute left-1/2 top-0 h-full w-1 bg-[#C1A15A] transform -translate-x-1/2"></div>

        {/* Elemen Timeline */}
        <div className="flex flex-col space-y-12">
          {LoveStoryData.map((story, index) => (
            <div
              key={story.id}
              className="relative flex items-center"
            >
              {/* Penempatan Konten Bergantian */}
              {index % 2 === 0 ? (
                <>
                  {/* Konten Kiri */}
                  <div className="w-1/2 text-right pr-6">
                    <div className="bg-[#FFF7E8] p-4 rounded-lg shadow-md inline-block border border-[#C1A15A]">
                      <h3 className="text-xl font-bold text-[#333333] font-poppins">
                        {story.title}
                      </h3>
                      <p className="text-sm text-[#757575] font-poppins">
                        {story.fullStory}
                      </p>
                      <p className="text-[#757575] font-poppins mt-2">
                        {story.story}
                      </p>
                    </div>
                  </div>

                  {/* Gambar Tengah */}
                  <div className="w-20 h-28 bg-[#F6F1EB] border-4 border-[#C1A15A] rounded-lg flex-shrink-0 mx-4 overflow-hidden">
                    <Image
                      src={story.imageUrl || "/template-img/default-story.png"}
                      alt={story.title}
                      width={80}
                      height={112}
                      className="object-cover"
                    />
                  </div>

                  {/* Konten Kanan (kosong) */}
                  <div className="w-1/2"></div>
                </>
              ) : (
                <>
                  {/* Konten Kiri (kosong) */}
                  <div className="w-1/2"></div>

                  {/* Gambar Tengah */}
                  <div className="w-20 h-28 bg-[#F6F1EB] border-4 border-[#C1A15A] rounded-lg flex-shrink-0 mx-4 overflow-hidden">
                    <Image
                      src={story.imageUrl || "/template-img/default-story.png"}
                      alt={story.title}
                      width={80}
                      height={112}
                      className="object-cover"
                    />
                  </div>

                  {/* Konten Kanan */}
                  <div className="w-1/2 pl-6">
                    <div className="bg-[#FFF7E8] p-4 rounded-lg shadow-md inline-block border border-[#C1A15A]">
                      <h3 className="text-xl font-bold text-[#333333] font-poppins">
                        {story.title}
                      </h3>
                      <p className="text-sm text-[#757575] font-poppins">
                        {story.fullStory}
                      </p>
                      <p className="text-[#757575] font-poppins mt-2">
                        {story.story}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
